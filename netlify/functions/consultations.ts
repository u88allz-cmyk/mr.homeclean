import type { Handler, HandlerEvent } from "@netlify/functions";
import { insertConsultationSchema } from "../../shared/schema";
import { z } from "zod";
import crypto from "crypto";

const generateSignature = (apiSecret: string, dateTime: string, salt: string): string => {
  const data = dateTime + salt;
  return crypto
    .createHmac("sha256", apiSecret)
    .update(data)
    .digest("hex");
};

const createAuthHeader = (apiKey: string, apiSecret: string): string => {
  const dateTime = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = generateSignature(apiSecret, dateTime, salt);
  
  return `HMAC-SHA256 apiKey=${apiKey}, date=${dateTime}, salt=${salt}, signature=${signature}`;
};

const sendSMS = async (message: string): Promise<boolean> => {
  const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY;
  const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET;
  const SOLAPI_SENDER = process.env.SOLAPI_SENDER;
  const OWNER_PHONE = process.env.OWNER_PHONE;

  if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET || !SOLAPI_SENDER || !OWNER_PHONE) {
    throw new Error("Missing required environment variables: SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER, or OWNER_PHONE");
  }

  try {
    const authHeader = createAuthHeader(SOLAPI_API_KEY, SOLAPI_API_SECRET);
    
    const messageData = {
      message: {
        to: OWNER_PHONE.replace(/-/g, ""),
        from: SOLAPI_SENDER.replace(/-/g, ""),
        text: message,
        subject: "",
      },
    };

    const response = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    const result = await response.json();
    
    if (response.ok && result.groupId) {
      console.log("SMS sent successfully:", result);
      return true;
    } else {
      console.error("SMS send failed:", result);
      return false;
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
};

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const requestData = JSON.parse(event.body || "{}");
    
    const validatedData = insertConsultationSchema.parse(requestData);

    const smsMessage = `[미스터홈클린 상담 신청]
이름: ${validatedData.name}
연락처: ${validatedData.phone}
서비스: ${validatedData.serviceType}
${validatedData.message ? `문의내용: ${validatedData.message}` : ""}`;

    let smsSent = false;
    try {
      smsSent = await sendSMS(smsMessage);
    } catch (smsError) {
      console.error("SMS sending failed:", smsError);
    }

    const consultation = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      smsSent,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(consultation),
    };
  } catch (error) {
    console.error("Error processing consultation:", error);
    
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: "Validation failed", 
          details: error.errors 
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
    };
  }
};
