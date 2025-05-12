
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Search, Users, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample order data
const allOrders = [
  {
    id: "O1234",
    customerName: "John Smith",
    date: "2023-06-15",
    time: "6:00 PM - 10:00 PM",
    location: "123 Event Hall, New York, NY 10001",
    status: "pending",
    guests: 45,
    totalAmount: 2499.99,
    items: [
      { name: "Grilled Salmon", quantity: 20 },
      { name: "Beef Tenderloin", quantity: 15 },
      { name: "Vegetable Risotto", quantity: 10 },
    ],
    specialRequests: "Please ensure all dishes are served hot.",
    createdAt: "2023-05-01T12:34:56Z",
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "john.smith@example.com"
  },
  {
    id: "O1235",
    customerName: "Emily Johnson",
    date: "2023-07-22",
    time: "12:00 PM - 4:00 PM",
    location: "Plaza Gardens, New York, NY 10002",
    status: "confirmed",
    guests: 30,
    totalAmount: 1499.99,
    items: [
      { name: "Bruschetta", quantity: 60 },
      { name: "Chicken Marsala", quantity: 30 },
    ],
    specialRequests: "We have 3 guests with nut allergies.",
    createdAt: "2023-06-10T15:22:11Z",
    contactPhone: "+1 (555) 234-5678",
    contactEmail: "emily.johnson@example.com"
  },
  {
    id: "O1236",
    customerName: "Michael Chen",
    date: "2023-05-30",
    time: "11:00 AM - 2:00 PM",
    location: "City Conference Center, New York, NY 10003",
    status: "completed",
    guests: 100,
    totalAmount: 4999.99,
    items: [
      { name: "Assorted Sandwiches", quantity: 100 },
      { name: "Fruit Platter", quantity: 10 },
      { name: "Dessert Selection", quantity: 100 }
    ],
    specialRequests: "Corporate branding on all table settings.",
    createdAt: "2023-04-15T09:12:43Z",
    contactPhone: "+1 (555) 345-6789",
    contactEmail: "michael.chen@example.com"
  },
  {
    id: "O1237",
    customerName: "Sarah Williams",
    date: "2023-08-05",
    time: "7:00 PM - 11:00 PM",
    location: "Seaside Venue, New York, NY 10004",
    status: "cancelled",
    guests: 75,
    totalAmount: 3750.00,
    items: [
      { name: "Seafood Paella", quantity: 75 },
      { name: "Caesar Salad", quantity: 75 },
      { name: "Tiramisu", quantity: 75 }
    ],
    specialRequests: "Mediterranean theme for all dishes and presentation.",
    createdAt: "2023-06-20T14:30:22Z",
    contactPhone: "+1 (555) 456-7890",
    contactEmail: "sarah.williams@example.com"
  }
];

// Status styling mapping
const statusStyles = {
  pending: {
    badge: "bg-yellow-100 text-yellow-800",
    icon: null
  },
  confirmed: {
    badge: "bg-green-100 text-green-800",
    icon: <Check className="h-4 w-4 mr-1" />
  },
  completed: {
    badge: "bg-blue-100 text-blue-800",
    icon: <Check className="h-4 w-4 mr-1" />
  },
  cancelled: {
    badge: "bg-red-100 text-red-800",
    icon: <X className="h-4 w-4 mr-1" />
  },
  rejected: {
    badge: "bg-gray-100 text-gray-800",
    icon: <X className="h-4 w-4 mr-1" />
  }
};

const VendorOrders = () => {
  const [orders, setOrders] = useState(allOrders);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { toast } = useToast();
  
  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "all" || order.status === activeTab;
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} has been ${newStatus}.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row justify-between items-start border p-4 rounded-md">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <Badge 
                        variant="outline" 
                        className={statusStyles[order.status].badge}
                      >
                        <div className="flex items-center">
                          {statusStyles[order.status].icon && statusStyles[order.status].icon}
                          {order.status}
                        </div>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(order.createdAt).toLocaleDateString()} by {order.customerName}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        {order.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        {order.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        {order.guests} guests
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-start">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500 mt-0.5" />
                      <span className="text-sm">{order.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                    
                    {order.status === "pending" && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(order.id, "confirmed")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleStatusChange(order.id, "rejected")}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    
                    {order.status === "confirmed" && (
                      <Button 
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "completed")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Mark Completed
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
              <DialogDescription>
                {format(new Date(selectedOrder.createdAt), "PPP 'at' p")}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <Badge 
                  variant="outline" 
                  className={statusStyles[selectedOrder.status].badge}
                >
                  <div className="flex items-center">
                    {statusStyles[selectedOrder.status].icon && statusStyles[selectedOrder.status].icon}
                    {selectedOrder.status}
                  </div>
                </Badge>
                <span className="font-bold">${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Customer Information</h4>
                  <p className="text-sm">{selectedOrder.customerName}</p>
                  <p className="text-sm">{selectedOrder.contactPhone}</p>
                  <p className="text-sm">{selectedOrder.contactEmail}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Event Details</h4>
                  <p className="text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    {selectedOrder.date}
                  </p>
                  <p className="text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {selectedOrder.time}
                  </p>
                  <p className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    {selectedOrder.guests} guests
                  </p>
                  <p className="text-sm flex items-start">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500 mt-0.5" />
                    {selectedOrder.location}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Order Items</h4>
                <ul className="space-y-1">
                  {selectedOrder.items.map((item, idx) => (
                    <li key={idx} className="text-sm flex justify-between">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedOrder.specialRequests && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Special Requests</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedOrder.specialRequests}</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedOrder.status === "pending" && (
                <div className="flex space-x-2 w-full justify-end">
                  <Button 
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, "rejected");
                      setSelectedOrder(null);
                    }}
                  >
                    Decline
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, "confirmed");
                      setSelectedOrder(null);
                    }}
                  >
                    Accept Order
                  </Button>
                </div>
              )}
              
              {selectedOrder.status === "confirmed" && (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, "completed");
                    setSelectedOrder(null);
                  }}
                >
                  Mark as Completed
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VendorOrders;
