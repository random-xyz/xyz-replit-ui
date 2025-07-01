import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

const suggestedQuestions = [
  {
    title: "Analyze wallet risk score",
    description: "Get comprehensive risk assessment"
  },
  {
    title: "Track transaction patterns",
    description: "Identify suspicious activities"
  },
  {
    title: "Network relationship mapping",
    description: "Visualize wallet connections"
  },
  {
    title: "Compliance screening",
    description: "Check against OFAC sanctions"
  },
  {
    title: "Investigate the transactions from a file, and analyze for its anomalous behavior",
    description: "Upload and analyze transaction data"
  },
  {
    title: "Show me interconnected wallets for address 0x742d35Cc6Cc5e8a",
    description: "Map wallet network relationships"
  }
];

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    // In a real app, this would send the message to the backend
    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-2xl font-semibold text-slate-900">Start Your Analysis</CardTitle>
        <p className="text-slate-600">Ask questions about blockchain transactions, wallet activities, or network patterns</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter wallet address, transaction hash, or ask a question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !message.trim()}
            className="bg-[var(--argus-blue)] hover:bg-blue-700"
          >
            <Send size={16} className="mr-2" />
            {isLoading ? "Analyzing..." : "Start Analysis"}
          </Button>
        </form>
        
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Trending Questions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question.title)}
                className="chat-suggestion"
              >
                <div className="font-medium text-slate-900 text-sm">{question.title}</div>
                <div className="text-xs text-slate-600 mt-1">{question.description}</div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
