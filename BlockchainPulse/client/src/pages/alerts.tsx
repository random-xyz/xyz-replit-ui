import ThreatSubscriptions from "@/components/alerts/threat-subscriptions";

export default function AlertsPage() {
  return (
    <div className="content-section">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Alert Subscriptions</h1>
        <p className="text-slate-600">Configure your threat detection and notification preferences</p>
      </div>

      <ThreatSubscriptions />
    </div>
  );
}
