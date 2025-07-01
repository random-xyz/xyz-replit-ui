import ChatInterface from "@/components/chat/chat-interface";
import TransactionVolumeChart from "@/components/charts/transaction-volume-chart";
import AnomalyChart from "@/components/charts/anomaly-chart";
import NetworkGraph from "@/components/charts/network-graph";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="content-section max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Argus Intelligence</h1>
        <p className="text-xl text-slate-600 mb-8">
          Analyze transactions, screen wallets, identify anomalies, across multiple public networks
        </p>
        
        <ChatInterface />
      </div>

      {/* Sample Analysis Responses */}
      <div className="mt-16 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sample Analysis Results</h2>
          <p className="text-slate-600">See what Argus Intelligence can reveal from your blockchain queries</p>
        </div>

        {/* Sample Response 1: Wallet Risk Analysis */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Query: "Analyze wallet risk for 0x742d35Cc..."</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Risk assessment completed in 1.2 seconds</p>
              </div>
              <Badge variant="secondary" className="bg-red-50 text-red-700">High Risk</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2">Risk Score: 87/100</h4>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">OFAC Match:</span>
                    <span className="text-red-600 font-semibold">Flagged</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Transaction Volume:</span>
                    <span className="text-slate-900">$2.4M (7 days)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Connected Wallets:</span>
                    <span className="text-slate-900">23 addresses</span>
                  </div>
                </div>
              </div>
              <div className="h-48 scale-75 origin-top-left">
                <NetworkGraph />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Response 2: Transaction Pattern Analysis */}
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="text-lg">Query: "Show anomalous transaction patterns for the last 30 days"</CardTitle>
            <p className="text-sm text-slate-600">Pattern analysis across 12 blockchain networks</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 scale-90 origin-top-left">
                <AnomalyChart />
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Detected Anomalies</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-red-900">Large Volume Spike</p>
                      <p className="text-xs text-red-700">0x893f...d2a1</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-amber-900">Rapid Succession</p>
                      <p className="text-xs text-amber-700">0x123a...7f2b</p>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Cross-chain Activity</p>
                      <p className="text-xs text-yellow-700">0x456b...9c1d</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Low</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Response 3: Network Analysis */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg">Query: "Map interconnected wallets and show transaction flows"</CardTitle>
            <p className="text-sm text-slate-600">Network topology analysis completed</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NetworkGraph />
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Network Insights</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="font-medium text-slate-900">Central Hub Detected</p>
                    <p className="text-slate-600 text-xs mt-1">One wallet controls 67% of transaction flow</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Clustering Pattern</p>
                    <p className="text-blue-700 text-xs mt-1">5 distinct wallet clusters identified</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Bridge Connections</p>
                    <p className="text-purple-700 text-xs mt-1">Cross-chain activity detected on 3 networks</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Response 4: Transaction Volume Trends */}
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader>
            <CardTitle className="text-lg">Query: "Show transaction volume trends and identify patterns"</CardTitle>
            <p className="text-sm text-slate-600">Volume analysis across major cryptocurrencies</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 scale-90 origin-top-left">
                <TransactionVolumeChart />
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Trend Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-900">Growth Rate</p>
                      <p className="text-xs text-green-700">+45% over 6 months</p>
                    </div>
                    <span className="text-green-600 font-bold">↗</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Peak Activity</p>
                      <p className="text-xs text-blue-700">July: 175K transactions</p>
                    </div>
                    <span className="text-blue-600 font-bold">🔥</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Avg Daily Volume</p>
                      <p className="text-xs text-slate-600">$12.4M across all networks</p>
                    </div>
                    <span className="text-slate-600 font-bold">📊</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
