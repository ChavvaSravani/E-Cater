import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Form schema for order tracking
const trackingFormSchema = z.object({
  orderId: z.string().min(3, {
    message: "Order ID must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Mock order status for demonstration
const mockOrderStatuses = {
  "ORD123456": {
    status: "in-transit", 
    customer: "Rahul Sharma",
    email: "test@example.com",
    orderDate: "2023-11-15T10:30:00",
    items: ["Paneer Tikka (15 pcs)", "Butter Chicken (2kg)", "Vegetable Biryani (30 servings)"],
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
      address: "Bannerghatta Road, Near JP Nagar"
    },
    estimatedDelivery: "2023-11-15T14:30:00",
    trackingHistory: [
      { status: "order-placed", timestamp: "2023-11-15T10:30:00", location: "Vendor Facility" },
      { status: "preparing", timestamp: "2023-11-15T11:15:00", location: "Vendor Kitchen" },
      { status: "in-transit", timestamp: "2023-11-15T13:00:00", location: "En Route to Destination" }
    ]
  },
  "ORD789012": {
    status: "delivered", 
    customer: "Ananya Patel",
    email: "test@example.com",
    orderDate: "2023-11-14T09:45:00",
    items: ["Veg Starter Combo (25 persons)", "Main Course Buffet (25 persons)"],
    currentLocation: {
      lat: 12.9352,
      lng: 77.6245,
      address: "Koramangala, 5th Block"
    },
    estimatedDelivery: "2023-11-14T12:45:00",
    trackingHistory: [
      { status: "order-placed", timestamp: "2023-11-14T09:45:00", location: "Vendor Facility" },
      { status: "preparing", timestamp: "2023-11-14T10:15:00", location: "Vendor Kitchen" },
      { status: "in-transit", timestamp: "2023-11-14T11:30:00", location: "En Route to Destination" },
      { status: "delivered", timestamp: "2023-11-14T12:40:00", location: "Destination" }
    ]
  }
};

const OrderTracking = () => {
  const { toast } = useToast();
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof trackingFormSchema>>({
    resolver: zodResolver(trackingFormSchema),
    defaultValues: {
      orderId: "",
      email: ""
    }
  });

  const onSubmit = (values: z.infer<typeof trackingFormSchema>) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Check if the order exists in our mock data
      const orderData = mockOrderStatuses[values.orderId as keyof typeof mockOrderStatuses];
      
      if (orderData && orderData.email === values.email) {
        setTrackingResult(orderData);
        toast({
          title: "Order Found",
          description: "Displaying tracking information for your order."
        });
      } else {
        toast({
          title: "Order Not Found",
          description: "We couldn't find an order with the provided ID and email. Please check and try again.",
          variant: "destructive"
        });
        setTrackingResult(null);
      }
      
      setLoading(false);
    }, 1500);
  };

  // Function to format dates nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  // Get the progress percentage based on the order status
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "order-placed": return 25;
      case "preparing": return 50;
      case "in-transit": return 75;
      case "delivered": return 100;
      default: return 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>
      
      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
          <CardDescription>
            Enter your order ID and email to track your catering order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your order ID (e.g., ORD123456)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your order ID was sent to you in the confirmation email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Searching..." : "Track Order"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {trackingResult && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Order #{trackingResult.orderId || "ORD123456"}</CardTitle>
                <CardDescription className="mt-1">
                  Placed on {formatDate(trackingResult.orderDate)}
                </CardDescription>
              </div>
              <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                trackingResult.status === "delivered" 
                  ? "bg-green-100 text-green-800" 
                  : trackingResult.status === "in-transit"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {trackingResult.status === "order-placed" && "Order Placed"}
                {trackingResult.status === "preparing" && "Preparing"}
                {trackingResult.status === "in-transit" && "In Transit"}
                {trackingResult.status === "delivered" && "Delivered"}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Progress Tracker */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm">
                <span>Order Placed</span>
                <span>Preparing</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
              <Progress value={getProgressPercentage(trackingResult.status)} className="h-2" />
              
              <div className="flex justify-between mt-2">
                <div className="flex flex-col items-center">
                  <CheckCircle className={`h-6 w-6 ${
                    getProgressPercentage(trackingResult.status) >= 25 ? "text-green-500" : "text-gray-300"
                  }`} />
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className={`h-6 w-6 ${
                    getProgressPercentage(trackingResult.status) >= 50 ? "text-green-500" : "text-gray-300"
                  }`} />
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className={`h-6 w-6 ${
                    getProgressPercentage(trackingResult.status) >= 75 ? "text-green-500" : "text-gray-300"
                  }`} />
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className={`h-6 w-6 ${
                    getProgressPercentage(trackingResult.status) >= 100 ? "text-green-500" : "text-gray-300"
                  }`} />
                </div>
              </div>
            </div>
            
            {/* Current Status and Location */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">Current Status</h3>
              
              <div className="flex items-start space-x-3">
                {trackingResult.status === "in-transit" ? (
                  <Truck className="h-5 w-5 text-catering-orange mt-0.5" />
                ) : trackingResult.status === "delivered" ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <Package className="h-5 w-5 text-catering-orange mt-0.5" />
                )}
                
                <div>
                  <p className="font-medium">
                    {trackingResult.status === "order-placed" && "Your order has been received"}
                    {trackingResult.status === "preparing" && "Your order is being prepared"}
                    {trackingResult.status === "in-transit" && "Your order is on the way"}
                    {trackingResult.status === "delivered" && "Your order has been delivered"}
                  </p>
                  
                  {trackingResult.status === "in-transit" && (
                    <>
                      <p className="text-sm text-gray-600 mt-1">
                        <MapPin className="inline h-4 w-4 mr-1 text-gray-500" />
                        Current Location: {trackingResult.currentLocation.address}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <Clock className="inline h-4 w-4 mr-1 text-gray-500" />
                        Estimated Delivery: {formatDate(trackingResult.estimatedDelivery)}
                      </p>
                      
                      {/* Live Map (Placeholder) */}
                      <div className="mt-4 bg-gray-200 rounded-md h-48 flex items-center justify-center">
                        <p className="text-sm text-gray-600">
                          Live Map View - Coordinates: {trackingResult.currentLocation.lat}, {trackingResult.currentLocation.lng}
                        </p>
                      </div>
                    </>
                  )}
                  
                  {trackingResult.status === "delivered" && (
                    <p className="text-sm text-gray-600 mt-1">
                      <Clock className="inline h-4 w-4 mr-1 text-gray-500" />
                      Delivered on: {formatDate(trackingResult.trackingHistory.find((h: any) => h.status === "delivered").timestamp)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Order Items</h3>
              <ul className="space-y-2">
                {trackingResult.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-center text-sm">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tracking History */}
            <div>
              <h3 className="text-lg font-medium mb-3">Tracking History</h3>
              <div className="space-y-4">
                {trackingResult.trackingHistory.map((event: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 relative">
                      <div className={`h-4 w-4 rounded-full ${index === 0 ? 'bg-catering-orange' : 'bg-gray-300'}`}></div>
                      {index !== trackingResult.trackingHistory.length - 1 && (
                        <div className="absolute top-4 bottom-0 left-2 -ml-px w-0.5 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="pb-5">
                      <p className="text-sm font-medium">
                        {event.status === "order-placed" && "Order Placed"}
                        {event.status === "preparing" && "Preparing"}
                        {event.status === "in-transit" && "In Transit"}
                        {event.status === "delivered" && "Delivered"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(event.timestamp)} • {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              Need help with your order? Contact our customer support at +91-9876543210 or support@platepalooza.com
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default OrderTracking; 