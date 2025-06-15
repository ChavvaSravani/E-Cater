import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Package, Truck, CheckCircle, Clock, Phone, Mail, CalendarClock, User, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    items: [
      { name: "Paneer Tikka", quantity: 15, price: 12.99 },
      { name: "Butter Chicken", quantity: 2, unit: "kg", price: 24.99 },
      { name: "Vegetable Biryani", quantity: 30, unit: "servings", price: 8.99 }
    ],
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
    ],
    totalAmount: 539.55,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    vendor: {
      name: "Spice Garden Catering",
      phone: "+91 98765 43210",
      email: "info@spicegarden.com"
    },
    contactPerson: "Rahul Sharma",
    contactPhone: "+91 99988 77666",
    contactEmail: "test@example.com",
    deliveryAddress: "Apartment 404, Golden Heights, Bannerghatta Road, Bangalore 560029",
    eventType: "Corporate Lunch",
    specialInstructions: "Please ensure all food is vegetarian. Ring the doorbell upon arrival."
  },
  "ORD789012": {
    status: "delivered", 
    customer: "Ananya Patel",
    email: "test@example.com",
    orderDate: "2023-11-14T09:45:00",
    items: [
      { name: "Veg Starter Combo", quantity: 25, unit: "persons", price: 10.99 },
      { name: "Main Course Buffet", quantity: 25, unit: "persons", price: 18.99 }
    ],
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
    ],
    totalAmount: 749.5,
    paymentStatus: "paid",
    paymentMethod: "Online Banking",
    vendor: {
      name: "Tasty Treats Catering",
      phone: "+91 98765 12345",
      email: "support@tastytreats.com"
    },
    contactPerson: "Ananya Patel",
    contactPhone: "+91 99900 12345",
    contactEmail: "test@example.com",
    deliveryAddress: "Villa 7, Green Meadows, Koramangala 5th Block, Bangalore 560034",
    eventType: "Birthday Party",
    specialInstructions: "Include extra napkins and disposable cutlery for 25 people."
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

  // Calculate total amount
  const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
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
        <div className="space-y-6">
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
                        {/* Live Map (OpenStreetMap) */}
                        <div className="mt-4 rounded-md overflow-hidden" style={{ height: 192 }}>
                          <iframe
                            title="Order Live Location"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${trackingResult.currentLocation.lng-0.01}%2C${trackingResult.currentLocation.lat-0.01}%2C${trackingResult.currentLocation.lng+0.01}%2C${trackingResult.currentLocation.lat+0.01}&layer=mapnik&marker=${trackingResult.currentLocation.lat}%2C${trackingResult.currentLocation.lng}`}
                            style={{ border: 0 }}
                            allowFullScreen
                          ></iframe>
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
              
              {/* Order Details Section */}
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-medium mb-4">Order Details</h3>
                
                {/* Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CalendarClock className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Event Type</p>
                      <p className="font-medium">{trackingResult.eventType}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{trackingResult.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Delivery Address</p>
                      <p className="font-medium">{trackingResult.deliveryAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{trackingResult.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trackingResult.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                            {item.unit ? ` ${item.unit}` : ''}
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">${trackingResult.totalAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <Separator />
                
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Vendor Information</h3>
                    <div className="space-y-2">
                      <p className="font-medium">{trackingResult.vendor.name}</p>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{trackingResult.vendor.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{trackingResult.vendor.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Special Instructions</h3>
                    <p className="text-gray-700">{trackingResult.specialInstructions || "No special instructions provided."}</p>
                  </div>
                </div>
              </div>
              
              {/* Tracking History */}
              <div className="mt-8">
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
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderTracking; 