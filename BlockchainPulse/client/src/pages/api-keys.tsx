import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Plus } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ApiKey {
  id: number;
  name: string;
  key: string;
  isActive: boolean;
  createdAt: string;
  lastUsed: string | null;
}

export default function ApiKeysPage() {
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: apiKeys, isLoading } = useQuery<ApiKey[]>({
    queryKey: ["/api/keys"],
  });

  const createKeyMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      if (!response.ok) throw new Error("Failed to create API key");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      setNewKeyName("");
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "API key created successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create API key",
        variant: "destructive"
      });
    }
  });

  const deleteKeyMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/keys/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete API key");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/keys"] });
      toast({
        title: "Success",
        description: "API key deleted successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete API key",
        variant: "destructive"
      });
    }
  });

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied",
      description: "API key copied to clipboard"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatLastUsed = (dateString: string | null) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  if (isLoading) {
    return (
      <div className="content-section">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">API Key Management</h1>
          <p className="text-slate-600">Manage your API keys for programmatic access to Argus Intelligence</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">API Key Management</h1>
        <p className="text-slate-600">Manage your API keys for programmatic access to Argus Intelligence</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your API Keys</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[var(--argus-blue)] hover:bg-blue-700">
                  <Plus size={16} className="mr-2" />
                  Generate New Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="Enter a name for your API key"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => createKeyMutation.mutate(newKeyName)}
                      disabled={!newKeyName.trim() || createKeyMutation.isPending}
                      className="bg-[var(--argus-blue)] hover:bg-blue-700"
                    >
                      {createKeyMutation.isPending ? "Creating..." : "Create Key"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {apiKeys?.map((apiKey) => (
              <div key={apiKey.id} className="api-key-item">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{apiKey.name}</div>
                    <div className="text-sm text-slate-600 font-mono">{apiKey.key}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Created: {formatDate(apiKey.createdAt)} • Last used: {formatLastUsed(apiKey.lastUsed)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={apiKey.isActive ? "default" : "secondary"}>
                    {apiKey.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyKey(apiKey.key)}
                  >
                    <Copy size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteKeyMutation.mutate(apiKey.id)}
                    disabled={deleteKeyMutation.isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">API Usage Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep your API keys secure and never expose them in client-side code</li>
              <li>• Production keys have higher rate limits than development keys</li>
              <li>• Monitor your usage in the Analytics dashboard</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
