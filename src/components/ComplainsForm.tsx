
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Send, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ComplaintsForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
    email: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Complaint Submitted",
        description: "We've received your complaint and will respond soon.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        subject: "",
        category: "",
        description: "",
        email: ""
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-dishit-orange" />
            Submit a Complaint
          </CardTitle>
          <CardDescription>
            Let us know if you're experiencing any issues or have concerns about content on Dish It.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">Inappropriate Content</SelectItem>
                      <SelectItem value="user">User Behavior</SelectItem>
                      <SelectItem value="bug">Technical Issue</SelectItem>
                      <SelectItem value="payment">Payment Problem</SelectItem>
                      <SelectItem value="account">Account Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide as much detail as possible about your complaint..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="We'll contact you at this email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded text-dishit-orange" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I understand that false complaints may result in account restrictions
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-dishit-orange hover:bg-dishit-orange/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Complaint
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-gray-500">
            All complaints are reviewed by our moderation team within 24-48 hours.
            For urgent matters, please contact our support team directly.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplaintsForm;
