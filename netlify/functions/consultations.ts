import type { Handler, HandlerEvent } from "@netlify/functions";
import { insertConsultationSchema } from "../../shared/schema";
import { z } from "zod";

const sendSMS = async (phone: string, message: string): Promise<boolean> => {
  const ALIGO_API_KEY = process.env.ALIGO_API_KEY;
  const ALIGO_USER_ID = process.env.ALIGO_USER_ID;
  const ALIGO_SENDER = process.env.ALIGO_SENDER;
  const OWNER_PHONE = process.env.OWNER_PHONE;

  if (!ALIGO_API_KEY || !ALIGO_USER_ID || !ALIGO_SENDER || !OWNER_PHONE) {
    throw new Error("Missing required environment variables: ALIGO_API_KEY, ALIGO_USER_ID, ALIGO_SENDER, or OWNER_PHONE");
  }

  try {
    const formData = new URLSearchParams({
      key: ALIGO_API_KEY,
      userid: ALIGO_USER_ID,
      sender: ALIGO_SENDER,
      receiver: OWNER_PHONE.replace(/-/g, ""),
      msg: message,
      testmode_yn: process.env.NODE_ENV === "production" ? "N" : "Y",
    });

    const response = await fetch("https://apis.aligo.in/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    
    if (result.result_code === "1") {
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
${validatedData.message ? `메시지: ${validatedData.message}` : ""}`;

    let smsSent = false;
    try {
      smsSent = await sendSMS(validatedData.phone, smsMessage);
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
