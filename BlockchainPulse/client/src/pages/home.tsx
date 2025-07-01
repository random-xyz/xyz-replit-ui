import { ArrowRightLeft, AlertTriangle, Wallet, Network } from "lucide-react";
import KpiCard from "@/components/dashboard/kpi-card";
import TransactionVolumeChart from "@/components/charts/transaction-volume-chart";
import AnomalyChart from "@/components/charts/anomaly-chart";
import NetworkGraph from "@/components/charts/network-graph";
import AnomalousTransactions from "@/components/dashboard/anomalous-transactions";

export default function HomePage() {
  return (
    <div className="content-section">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Real-time blockchain intelligence and monitoring insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total Transactions"
          value="2.4M"
          change="+12.5% from last week"
          changeType="positive"
          icon={ArrowRightLeft}
          iconColor="bg-[var(--argus-blue)]/10 text-[var(--argus-blue)]"
        />
        
        <KpiCard
          title="Risk Alerts"
          value="847"
          change="+3.2% from last week"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-red-50 text-red-600"
        />
        
        <KpiCard
          title="Wallets Screened"
          value="156K"
          change="+8.1% from last week"
          changeType="positive"
          icon={Wallet}
          iconColor="bg-[var(--argus-green)]/10 text-[var(--argus-green)]"
        />
        
        <KpiCard
          title="Networks Monitored"
          value="12"
          change="Active blockchains"
          changeType="neutral"
          icon={Network}
          iconColor="bg-[var(--argus-indigo)]/10 text-[var(--argus-indigo)]"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TransactionVolumeChart />
        <NetworkGraph />
      </div>

      {/* Anomalous Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnomalyChart />
        <AnomalousTransactions />
      </div>
    </div>
  );
}
