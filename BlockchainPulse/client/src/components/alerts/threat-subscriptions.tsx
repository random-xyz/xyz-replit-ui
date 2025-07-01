import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AlertSubscription {
  id: number;
  threatType: string;
  isEnabled: boolean;
  priority: string;
}

const threatTypes = [
  {
    name: "OFAC Sanctioned",
    description: "Addresses on OFAC sanctions list",
    priority: "High Priority"
  },
  {
    name: "Ransomware",
    description: "Known ransomware-associated addresses", 
    priority: "High Priority"
  },
  {
    name: "Phishing",
    description: "Addresses linked to phishing campaigns",
    priority: "Medium Priority"
  },
  {
    name: "Nation State Threats",
    description: "State-sponsored criminal activities",
    priority: "High Priority"
  },
  {
    name: "Unknowns",
    description: "Unidentified suspicious patterns",
    priority: "Low Priority"
  },
  {
    name: "Large Volume Transfers",
    description: "Unusually large transactions",
    priority: "Medium Priority"
  }
];

export default function ThreatSubscriptions() {
  const { toast } = useToast();
  const [localSubscriptions, setLocalSubscriptions] = useState<Record<string, boolean>>({});

  const { data: subscriptions, isLoading } = useQuery<AlertSubscription[]>({
    queryKey: ["/api/alert-subscriptions"],
    onSuccess: (data) => {
      const subscriptionMap = data.reduce((acc, sub) => {
        acc[sub.threatType] = sub.isEnabled;
        return acc;
      }, {} as Record<string, boolean>);
      setLocalSubscriptions(subscriptionMap);
    }
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: async (data: { threatType: string; isEnabled: boolean; priority: string }) => {
      const response = await fetch("/api/alert-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update subscription");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alert-subscriptions"] });
      toast({
        title: "Success",
        description: "Alert preferences updated successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update alert preferences",
        variant: "destructive"
      });
    }
  });

  const handleCheckboxChange = (threatType: string, checked: boolean) => {
    setLocalSubscriptions(prev => ({
      ...prev,
      [threatType]: checked
    }));
  };

  const handleSelectAll = () => {
    const allEnabled = threatTypes.reduce((acc, threat) => {
      acc[threat.name] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setLocalSubscriptions(allEnabled);
  };

  const handleDeselectAll = () => {
    const allDisabled = threatTypes.reduce((acc, threat) => {
      acc[threat.name] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setLocalSubscriptions(allDisabled);
  };

  const handleSave = () => {
    Object.entries(localSubscriptions).forEach(([threatType, isEnabled]) => {
      const threat = threatTypes.find(t => t.name === threatType);
      if (threat) {
        updateSubscriptionMutation.mutate({
          threatType,
          isEnabled,
          priority: threat.priority.includes("High") ? "high" : threat.priority.includes("Medium") ? "medium" : "low"
        });
      }
    });
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes("High")) return "text-red-600";
    if (priority.includes("Medium")) return "text-amber-600";
    return "text-slate-600";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Threat Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Threat Subscriptions</CardTitle>
          <div className="flex space-x-2">
            <Button 
              onClick={handleSelectAll}
              className="bg-[var(--argus-blue)] hover:bg-blue-700"
              size="sm"
            >
              Select All
            </Button>
            <Button 
              onClick={handleDeselectAll}
              variant="secondary"
              size="sm"
            >
              Deselect All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {threatTypes.map((threat) => (
            <label key={threat.name} className="threat-subscription-card">
              <Checkbox
                checked={localSubscriptions[threat.name] || false}
                onCheckedChange={(checked) => handleCheckboxChange(threat.name, checked as boolean)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-slate-900">{threat.name}</div>
                <div className="text-sm text-slate-600 mt-1">{threat.description}</div>
                <div className={`text-xs mt-2 ${getPriorityColor(threat.priority)}`}>
                  {threat.priority}
                </div>
              </div>
            </label>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <Button 
            onClick={handleSave}
            disabled={updateSubscriptionMutation.isPending}
            className="bg-[var(--argus-green)] hover:bg-green-700"
          >
            {updateSubscriptionMutation.isPending ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
