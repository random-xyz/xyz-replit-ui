import { 
  users, 
  apiKeys, 
  alertSubscriptions, 
  transactionAlerts, 
  blockchainMetrics,
  type User, 
  type InsertUser, 
  type ApiKey, 
  type InsertApiKey,
  type AlertSubscription,
  type InsertAlertSubscription,
  type TransactionAlert,
  type BlockchainMetrics
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getApiKeys(userId: number): Promise<ApiKey[]>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;
  deleteApiKey(id: number, userId: number): Promise<boolean>;
  
  getAlertSubscriptions(userId: number): Promise<AlertSubscription[]>;
  upsertAlertSubscription(subscription: InsertAlertSubscription): Promise<AlertSubscription>;
  
  getTransactionAlerts(limit?: number): Promise<TransactionAlert[]>;
  
  getBlockchainMetrics(days?: number): Promise<BlockchainMetrics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private apiKeys: Map<number, ApiKey>;
  private alertSubscriptions: Map<number, AlertSubscription>;
  private transactionAlerts: Map<number, TransactionAlert>;
  private blockchainMetrics: Map<number, BlockchainMetrics>;
  
  private currentUserId: number;
  private currentApiKeyId: number;
  private currentAlertSubId: number;
  private currentAlertId: number;
  private currentMetricsId: number;

  constructor() {
    this.users = new Map();
    this.apiKeys = new Map();
    this.alertSubscriptions = new Map();
    this.transactionAlerts = new Map();
    this.blockchainMetrics = new Map();
    
    this.currentUserId = 1;
    this.currentApiKeyId = 1;
    this.currentAlertSubId = 1;
    this.currentAlertId = 1;
    this.currentMetricsId = 1;

    // Initialize with demo user and data
    this.initializeDemo();
  }

  private initializeDemo() {
    // Create demo user
    const demoUser: User = {
      id: 1,
      username: "demo",
      password: "demo123"
    };
    this.users.set(1, demoUser);

    // Create demo API keys
    this.apiKeys.set(1, {
      id: 1,
      userId: 1,
      name: "Production Key",
      key: "ak_prod_xxxxxxxxxxxxxxxxxxxxxxxx",
      isActive: true,
      createdAt: new Date("2023-12-15"),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    });

    this.apiKeys.set(2, {
      id: 2,
      userId: 1,
      name: "Development Key", 
      key: "ak_dev_xxxxxxxxxxxxxxxxxxxxxxxx",
      isActive: true,
      createdAt: new Date("2023-12-10"),
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    });

    // Create demo alert subscriptions
    const threatTypes = ["OFAC Sanctioned", "Ransomware", "Phishing", "Nation State Threats", "Unknowns", "Large Volume Transfers"];
    const enabledThreats = ["OFAC Sanctioned", "Ransomware", "Phishing", "Large Volume Transfers"];
    
    threatTypes.forEach((threatType, index) => {
      this.alertSubscriptions.set(index + 1, {
        id: index + 1,
        userId: 1,
        threatType,
        isEnabled: enabledThreats.includes(threatType),
        priority: threatType === "OFAC Sanctioned" || threatType === "Ransomware" || threatType === "Nation State Threats" ? "high" : 
                 threatType === "Phishing" || threatType === "Large Volume Transfers" ? "medium" : "low"
      });
    });

    // Create demo transaction alerts
    this.transactionAlerts.set(1, {
      id: 1,
      walletAddress: "0x742d...5e8a",
      transactionHash: "0x123...abc",
      riskScore: 95,
      threatType: "Large volume transfer",
      description: "Large volume transfer",
      createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
      isResolved: false
    });

    this.transactionAlerts.set(2, {
      id: 2,
      walletAddress: "0x123a...7f2b",
      transactionHash: "0x456...def",
      riskScore: 72,
      threatType: "Unusual pattern detected",
      description: "Unusual pattern detected",
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
      isResolved: false
    });

    this.transactionAlerts.set(3, {
      id: 3,
      walletAddress: "0x987c...3d4e",
      transactionHash: "0x789...ghi",
      riskScore: 68,
      threatType: "Rapid succession transfers",
      description: "Rapid succession transfers",
      createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 min ago
      isResolved: false
    });

    this.transactionAlerts.set(4, {
      id: 4,
      walletAddress: "0x456b...9c1d",
      transactionHash: "0xabc...123",
      riskScore: 55,
      threatType: "Cross-chain activity",
      description: "Cross-chain activity",
      createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 min ago
      isResolved: false
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getApiKeys(userId: number): Promise<ApiKey[]> {
    return Array.from(this.apiKeys.values()).filter(key => key.userId === userId);
  }

  async createApiKey(insertApiKey: InsertApiKey): Promise<ApiKey> {
    const id = this.currentApiKeyId++;
    const apiKey: ApiKey = {
      ...insertApiKey,
      id,
      isActive: true,
      createdAt: new Date(),
      lastUsed: null
    };
    this.apiKeys.set(id, apiKey);
    return apiKey;
  }

  async deleteApiKey(id: number, userId: number): Promise<boolean> {
    const apiKey = this.apiKeys.get(id);
    if (apiKey && apiKey.userId === userId) {
      this.apiKeys.delete(id);
      return true;
    }
    return false;
  }

  async getAlertSubscriptions(userId: number): Promise<AlertSubscription[]> {
    return Array.from(this.alertSubscriptions.values()).filter(sub => sub.userId === userId);
  }

  async upsertAlertSubscription(subscription: InsertAlertSubscription): Promise<AlertSubscription> {
    const existing = Array.from(this.alertSubscriptions.values()).find(
      sub => sub.userId === subscription.userId && sub.threatType === subscription.threatType
    );

    if (existing) {
      const updated: AlertSubscription = { 
        ...existing, 
        ...subscription,
        isEnabled: subscription.isEnabled ?? existing.isEnabled,
        priority: subscription.priority ?? existing.priority
      };
      this.alertSubscriptions.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentAlertSubId++;
      const newSub: AlertSubscription = { 
        id,
        userId: subscription.userId,
        threatType: subscription.threatType,
        isEnabled: subscription.isEnabled ?? true,
        priority: subscription.priority ?? "medium"
      };
      this.alertSubscriptions.set(id, newSub);
      return newSub;
    }
  }

  async getTransactionAlerts(limit: number = 10): Promise<TransactionAlert[]> {
    return Array.from(this.transactionAlerts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getBlockchainMetrics(days: number = 7): Promise<BlockchainMetrics[]> {
    // Generate mock metrics for the last 7 days
    const metrics: BlockchainMetrics[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      metrics.push({
        id: this.currentMetricsId++,
        date,
        totalTransactions: Math.floor(Math.random() * 50000) + 100000,
        riskAlerts: Math.floor(Math.random() * 100) + 50,
        walletsScreened: Math.floor(Math.random() * 10000) + 10000,
        networksMonitored: 12,
        metrics: {
          volumeByNetwork: {
            ethereum: Math.floor(Math.random() * 30000) + 40000,
            bitcoin: Math.floor(Math.random() * 20000) + 25000,
            polygon: Math.floor(Math.random() * 15000) + 20000
          }
        }
      });
    }
    
    return metrics;
  }
}

export const storage = new MemStorage();
