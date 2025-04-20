
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Wallet, 
  CreditCardIcon, 
  CheckCircle, 
  Loader2 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PaymentMethod {
  id: string;
  type: "card" | "wallet";
  name: string;
  details: string;
  icon: React.ReactNode;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "card1",
    type: "card",
    name: "Credit Card",
    details: "**** **** **** 4242",
    icon: <CreditCardIcon className="h-5 w-5 text-dishit-orange" />
  },
  {
    id: "wallet1",
    type: "wallet",
    name: "Digital Wallet",
    details: "wallet@example.com",
    icon: <Wallet className="h-5 w-5 text-dishit-orange" />
  }
];

const PaymentSection: React.FC = () => {
  const { toast } = useToast();
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0]?.id || "");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully",
        duration: 5000,
      });
      
      // Reset form
      setCardInfo({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: ""
      });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Payments</h2>
      
      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="payment">Make Payment</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>
                Pay for your order or add credits to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="amount" 
                        placeholder="0.00" 
                        className="pl-8" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all ${
                            selectedMethod === method.id 
                              ? "border-dishit-orange bg-dishit-orange/5" 
                              : "hover:border-dishit-orange/50"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.details}</p>
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle className="h-5 w-5 text-dishit-orange" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input id="description" placeholder="What's this payment for?" />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-dishit-orange hover:bg-dishit-orange/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Payment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods or add new ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className="flex items-center justify-between border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.details}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-dishit-green hover:bg-dishit-green/90"
                onClick={() => {
                  toast({
                    title: "Add Payment Method",
                    description: "This feature is coming soon!"
                  });
                }}
              >
                Add New Payment Method
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSection;
