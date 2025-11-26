import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

const sendSMS = async (message: string): Promise<{ success: boolean; result?: any; error?: string }> => {
  const ALIGO_API_KEY = process.env.ALIGO_API_KEY;
  const ALIGO_USER_ID = process.env.ALIGO_USER_ID;
  const ALIGO_SENDER = process.env.ALIGO_SENDER;
  const OWNER_PHONE = process.env.OWNER_PHONE;

  if (!ALIGO_API_KEY || !ALIGO_USER_ID || !ALIGO_SENDER || !OWNER_PHONE) {
    return { 
      success: false, 
      error: `Missing env vars: ${!ALIGO_API_KEY ? 'ALIGO_API_KEY ' : ''}${!ALIGO_USER_ID ? 'ALIGO_USER_ID ' : ''}${!ALIGO_SENDER ? 'ALIGO_SENDER ' : ''}${!OWNER_PHONE ? 'OWNER_PHONE' : ''}`.trim()
    };
  }

  try {
    const formData = new URLSearchParams({
      key: ALIGO_API_KEY,
      userid: ALIGO_USER_ID,
      sender: ALIGO_SENDER,
      receiver: OWNER_PHONE.replace(/-/g, ""),
      msg: message,
      testmode_yn: "Y",
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
      console.log("SMS sent successfully (test mode):", result);
      return { success: true, result };
    } else {
      console.error("SMS send failed:", result);
      return { success: false, result, error: result.message };
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Consultation endpoints with SMS notification
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      
      const smsMessage = `[미스터홈클린 상담 신청]
이름: ${validatedData.name}
연락처: ${validatedData.phone}
서비스: ${validatedData.serviceType}
${validatedData.message ? `메시지: ${validatedData.message}` : ""}`;

      const smsResult = await sendSMS(smsMessage);
      console.log("SMS Result:", smsResult);

      const consultation = await storage.createConsultation(validatedData);
      
      res.json({ 
        ...consultation, 
        smsSent: smsResult.success,
        smsResult: smsResult
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        console.error("Consultation error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/consultations", async (_req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const consultation = await storage.getConsultation(req.params.id);
      if (!consultation) {
        res.status(404).json({ error: "Consultation not found" });
        return;
      }
      res.json(consultation);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
