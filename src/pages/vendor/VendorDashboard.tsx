
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  ShoppingBag,
  ClipboardList,
  Activity,
  Package,
  Settings,
  Mail,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 2400 },
  { name: 'Feb', revenue: 1398 },
  { name: 'Mar', revenue: 9800 },
  { name: 'Apr', revenue: 3908 },
  { name: 'May', revenue: 4800 },
  { name: 'Jun', revenue: 3800 },
  { name: 'Jul', revenue: 5000 },
  { name: 'Aug', revenue: 7800 },
  { name: 'Sep', revenue: 6500 },
  { name: 'Oct', revenue: 4900 },
  { name: 'Nov', revenue: 7300 },
  { name: 'Dec', revenue: 11100 },
];

const recentBookings = [
  {
    id: 1,
    customer: "Emily Johnson",
    event: "Wedding",
    date: "2023-10-15",
    guests: 100,
    location: "Grand Plaza Hotel",
    status: "Confirmed",
    total: 6500,
  },
  {
    id: 2,
    customer: "Michael Chen",
    event: "Corporate Lunch",
    date: "2023-10-10",
    guests: 45,
    location: "Tech Offices",
    status: "Pending",
    total: 2250,
  },
  {
    id: 3,
    customer: "Sarah Williams",
    event: "Birthday Party",
    date: "2023-10-25",
    guests: 30,
    location: "Private Residence",
    status: "Confirmed",
    total: 1800,
  },
  {
    id: 4,
    customer: "David Miller",
    event: "Graduation",
    date: "2023-11-05",
    guests: 50,
    location: "University Hall",
    status: "Pending",
    total: 3000,
  },
  {
    id: 5,
    customer: "Jessica Lee",
    event: "Anniversary",
    date: "2023-11-12",
    guests: 20,
    location: "Seaside Restaurant",
    status: "Confirmed",
    total: 1500,
  }
];

const popularItems = [
  {
    name: "Beef Tenderloin",
    orders: 187,
    revenue: 6545,
    growth: 12.5,
  },
  {
    name: "Vegetable Risotto",
    orders: 164,
    revenue: 3116,
    growth: 8.3,
  },
  {
    name: "Chocolate Mousse",
    orders: 142,
    revenue: 1419,
    growth: 5.7,
  },
  {
    name: "Signature Cocktails",
    orders: 138,
    revenue: 1793,
    growth: 14.2,
  },
  {
    name: "Shrimp Cocktail",
    orders: 125,
    revenue: 1623,
    growth: -2.1,
  }
];

// Format date string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const VendorDashboard = () => {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Get vendor stats based on selected period
  const getStats = () => {
    if (selectedPeriod === "weekly") {
      return {
        revenue: 5800,
        bookings: 8,
        avgOrderValue: 725,
        growthRate: 8.2
      };
    } else if (selectedPeriod === "monthly") {
      return {
        revenue: 23500,
        bookings: 32,
        avgOrderValue: 734,
        growthRate: 12.5
      };
    } else {
      return {
        revenue: 267000,
        bookings: 384,
        avgOrderValue: 695,
        growthRate: 24.8
      };
    }
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your catering business, track orders, and analyze performance.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Link to="/vendor/settings">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-8">
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+{stats.growthRate}%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookings}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+5.3%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgOrderValue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+2.7%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">4.8</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 || (i === 4 && 0.8 >= 0.5)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From 248 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Your earnings over the past year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders and Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Bookings</CardTitle>
                <Link to="/vendor/orders" className="text-catering-orange hover:underline flex items-center text-sm font-medium">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentBookings.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100">
                    <div>
                      <div className="font-medium">{booking.customer}</div>
                      <div className="text-sm text-gray-500">{booking.event}</div>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(booking.date)}</span>
                        <span className="mx-1">•</span>
                        <Users className="h-3 w-3 mr-1" />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </div>
                      <div className="font-bold mt-1">${booking.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Popular Menu Items</CardTitle>
              <CardDescription>
                Your most ordered dishes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {popularItems.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium text-catering-orange">${item.revenue}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>{item.orders} orders</span>
                      <div className={`flex items-center ${
                        item.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span>
                          {item.growth >= 0 ? '+' : ''}{item.growth}%
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(100, (item.orders / popularItems[0].orders) * 100)} 
                      className="h-1.5" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Link to="/vendor/orders">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <ClipboardList className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Manage Orders</span>
          </Button>
        </Link>
        <Link to="/vendor/menus">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Package className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Edit Menu</span>
          </Button>
        </Link>
        <Link to="/vendor/availability">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Calendar className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Availability</span>
          </Button>
        </Link>
        <Link to="/vendor/staff">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Users className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Staff</span>
          </Button>
        </Link>
        <Link to="/vendor/analytics">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Activity className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Analytics</span>
          </Button>
        </Link>
        <Link to="/vendor/payments">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <DollarSign className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Payments</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;
