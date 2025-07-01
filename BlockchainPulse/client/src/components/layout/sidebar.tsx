import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BarChart, 
  PieChart, 
  Activity,
  ArrowRightLeft,
  Wallet,
  Network,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Bell,
  Settings,
  History,
  Bot,
  Sliders,
  Gauge,
  Users,
  Cog,
  Key,
  Code,
  Book,
  Plug,
  User,
  CreditCard,
  Building
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    items: [
      { name: "Landing", href: "/", icon: Home },
      { name: "Home", href: "/home", icon: BarChart },
      { name: "Overview", href: "/overview", icon: PieChart },
      { name: "Analytics", href: "/analytics", icon: Activity },
    ],
  },
  {
    name: "Monitoring",
    items: [
      { name: "Transaction Analysis", href: "/transaction-analysis", icon: ArrowRightLeft },
      { name: "Wallet Screening", href: "/wallet-screening", icon: Wallet },
      { name: "Network Analytics", href: "/network-analytics", icon: Network },
    ],
  },
  {
    name: "Intelligence",
    items: [
      { name: "Threat Detection", href: "/threat-detection", icon: AlertTriangle },
      { name: "Risk Assessment", href: "/risk-assessment", icon: ShieldCheck },
      { name: "Compliance", href: "/compliance", icon: ClipboardCheck },
    ],
  },
  {
    name: "Alerts & Notifications",
    items: [
      { name: "Alert Subscriptions", href: "/alerts", icon: Bell },
      { name: "Notification Settings", href: "/notification-settings", icon: Settings },
      { name: "Alert History", href: "/alert-history", icon: History },
    ],
  },
  {
    name: "Agentic AI",
    items: [
      { name: "AI Agents", href: "/ai-agents", icon: Bot },
      { name: "Configuration", href: "/ai-config", icon: Sliders },
      { name: "Performance", href: "/ai-performance", icon: Gauge },
    ],
  },
  {
    name: "Administration",
    items: [
      { name: "User Management", href: "/user-management", icon: Users },
      { name: "Settings", href: "/settings", icon: Cog },
      { name: "Permissions", href: "/permissions", icon: Key },
    ],
  },
  {
    name: "Developer",
    items: [
      { name: "API Keys", href: "/api-keys", icon: Code },
      { name: "Documentation", href: "/documentation", icon: Book },
      { name: "Integration Guides", href: "/integration", icon: Plug },
    ],
  },
  {
    name: "Account",
    items: [
      { name: "Profile", href: "/profile", icon: User },
      { name: "Billing", href: "/billing", icon: CreditCard },
      { name: "Enterprise Setup", href: "/enterprise", icon: Building },
    ],
  },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <nav className="w-64 bg-white border-r border-slate-200 fixed left-0 top-20 bottom-0 overflow-y-auto">
      <div className="p-4">
        {navigation.map((section) => (
          <div key={section.name} className="mb-6">
            <h3 className="nav-section-title">{section.name}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a className={cn("nav-item", isActive && "active")}>
                        <Icon size={16} />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
