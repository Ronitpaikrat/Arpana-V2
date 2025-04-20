
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Search, CreditCard, FileText, AlertTriangle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Profile",
      description: "Manage your personal profile and view your stats",
      icon: <User className="h-6 w-6 text-dishit-orange" />,
      path: "/profile",
      color: "bg-orange-50"
    },
    {
      title: "Campigns",
      description: "Browse contribute to ongoing fund raising campigns",
      icon: <Search className="h-6 w-6 text-dishit-yellow" />,
      path: "/posts",
      color: "bg-yellow-50"
    },
    {
      title: "Payment",
      description: "Manage your payment methods and transactions",
      icon: <CreditCard className="h-6 w-6 text-dishit-green" />,
      path: "/payment",
      color: "bg-green-50"
    },
    {
      title: "LeaderBoard",
      description: "See the top donors",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      path: "/Leaderboard",
      color: "bg-blue-50"
    },
    {
      title: "Complaints",
      description: "Report issues or submit feedback",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      path: "/complaints",
      color: "bg-red-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-dishit-orange">Arpan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Arpan is a transparent donation platform empowering you to support genuine causes and bring hope to communities in need.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button 
              className="bg-dishit-orange hover:bg-dishit-orange/90"
              size="lg"
              onClick={() => navigate("/payment")}
            >
              Donate
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate("/posts")}
            >
              Explore Campigns
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <CardContent className="p-0">
                <div className={`${feature.color} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-md shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to share your culinary journey?</h2>
          <p className="text-gray-600 mb-6">
            Join our community of food lovers and showcase your favorite dishes!
          </p>
          <Button 
            className="bg-dishit-green hover:bg-dishit-green/90"
            size="lg"
            onClick={() => navigate("/profile")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
