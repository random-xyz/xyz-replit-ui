import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAlertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Keys endpoints
  app.get("/api/keys", async (req, res) => {
    try {
      // In a real app, get userId from session/auth
      const userId = 1; // Demo user
      const keys = await storage.getApiKeys(userId);
      res.json(keys);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch API keys" });
    }
  });

  app.post("/api/keys", async (req, res) => {
    try {
      const userId = 1; // Demo user
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      // Generate a random API key
      const key = `ak_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      
      const newKey = await storage.createApiKey({
        userId,
        name,
        key
      });
      
      res.json(newKey);
    } catch (error) {
      res.status(500).json({ message: "Failed to create API key" });
    }
  });

  app.delete("/api/keys/:id", async (req, res) => {
    try {
      const userId = 1; // Demo user
      const keyId = parseInt(req.params.id);
      
      const success = await storage.deleteApiKey(keyId, userId);
      
      if (success) {
        res.json({ message: "API key deleted successfully" });
      } else {
        res.status(404).json({ message: "API key not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete API key" });
    }
  });

  // Alert subscriptions endpoints
  app.get("/api/alert-subscriptions", async (req, res) => {
    try {
      const userId = 1; // Demo user
      const subscriptions = await storage.getAlertSubscriptions(userId);
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alert subscriptions" });
    }
  });

  app.post("/api/alert-subscriptions", async (req, res) => {
    try {
      const userId = 1; // Demo user
      const subscriptionData = { ...req.body, userId };
      
      const validatedData = insertAlertSubscriptionSchema.parse(subscriptionData);
      const subscription = await storage.upsertAlertSubscription(validatedData);
      
      res.json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update alert subscription" });
      }
    }
  });

  // Transaction alerts endpoints
  app.get("/api/transaction-alerts", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const alerts = await storage.getTransactionAlerts(limit);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transaction alerts" });
    }
  });

  // Blockchain metrics endpoints
  app.get("/api/metrics", async (req, res) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 7;
      const metrics = await storage.getBlockchainMetrics(days);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blockchain metrics" });
    }
  });

  // Chat analysis endpoint (mock)
  app.post("/api/chat/analyze", async (req, res) => {
    try {
      const { message } = req.body;
      
      // Mock response based on message content
      let response = {
        message: "I understand you're looking for blockchain analysis. Here's what I found:",
        charts: [] as any[],
        tables: [] as any[],
        insights: [] as string[]
      };

      if (message.toLowerCase().includes("wallet") || message.toLowerCase().includes("address")) {
        response.insights.push("Analyzed wallet activity patterns");
        response.charts.push({
          type: "risk_score",
          data: { score: 72, category: "Medium Risk" }
        });
      }

      if (message.toLowerCase().includes("transaction")) {
        response.insights.push("Transaction flow analysis completed");
        response.tables.push({
          type: "transactions",
          data: [
            { hash: "0x123...abc", amount: "1.5 ETH", risk: "Low" },
            { hash: "0x456...def", amount: "10.2 ETH", risk: "Medium" }
          ]
        });
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to process analysis request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
