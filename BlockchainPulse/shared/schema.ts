import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  key: text("key").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastUsed: timestamp("last_used"),
});

export const alertSubscriptions = pgTable("alert_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  threatType: text("threat_type").notNull(),
  isEnabled: boolean("is_enabled").notNull().default(true),
  priority: text("priority").notNull().default("medium"),
});

export const transactionAlerts = pgTable("transaction_alerts", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  transactionHash: text("transaction_hash"),
  riskScore: integer("risk_score").notNull(),
  threatType: text("threat_type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isResolved: boolean("is_resolved").notNull().default(false),
});

export const blockchainMetrics = pgTable("blockchain_metrics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  totalTransactions: integer("total_transactions").notNull(),
  riskAlerts: integer("risk_alerts").notNull(),
  walletsScreened: integer("wallets_screened").notNull(),
  networksMonitored: integer("networks_monitored").notNull(),
  metrics: jsonb("metrics"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertApiKeySchema = createInsertSchema(apiKeys).pick({
  userId: true,
  name: true,
  key: true,
});

export const insertAlertSubscriptionSchema = createInsertSchema(alertSubscriptions).pick({
  userId: true,
  threatType: true,
  isEnabled: true,
  priority: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type AlertSubscription = typeof alertSubscriptions.$inferSelect;
export type InsertAlertSubscription = z.infer<typeof insertAlertSubscriptionSchema>;
export type TransactionAlert = typeof transactionAlerts.$inferSelect;
export type BlockchainMetrics = typeof blockchainMetrics.$inferSelect;
