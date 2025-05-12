
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Store,
  ShoppingCart,
  TrendingUp,
  Percent,
  AlertCircle,
  CreditCard,
  Search,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const revenueData = [
  { name: 'Jan', revenue: 12400 },
  { name: 'Feb', revenue: 14398 },
  { name: 'Mar', revenue: 19800 },
  { name: 'Apr', revenue: 23908 },
  { name: 'May', revenue: 18800 },
  { name: 'Jun', revenue: 23800 },
  { name: 'Jul', revenue: 25000 },
  { name: 'Aug', revenue: 27800 },
  { name: 'Sep', revenue: 32500 },
  { name: 'Oct', revenue: 34900 },
  { name: 'Nov', revenue: 37300 },
  { name: 'Dec', revenue: 41100 },
];

const userGrowthData = [
  { name: 'Jan', customers: 210, vendors: 18 },
  { name: 'Feb', customers: 280, vendors: 23 },
  { name: 'Mar', customers: 350, vendors: 28 },
  { name: 'Apr', customers: 420, vendors: 36 },
  { name: 'May', customers: 490, vendors: 42 },
  { name: 'Jun', customers: 580, vendors: 48 },
];

const bookingData = [
  { name: 'Wedding', value: 35 },
  { name: 'Corporate', value: 30 },
  { name: 'Birthday', value: 20 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#F97316', '#FCD34D', '#60A5FA', '#A78BFA'];

// Sample latest bookings data
const latestBookings = [
  {
    id: "B-7839",
    customer: "Emma Thompson",
    vendor: "Royal Catering Co.",
    date: "2023-09-15",
    amount: 4800,
    status: "Completed"
  },
  {
    id: "B-7838",
    customer: "James Wilson",
    vendor: "Green Leaf Catering",
    date: "2023-09-14",
    amount: 2350,
    status: "Pending"
  },
  {
    id: "B-7837",
    customer: "Sophia Martinez",
    vendor: "Spice Affair",
    date: "2023-09-14",
    amount: 1790,
    status: "Completed"
  },
  {
    id: "B-7836",
    customer: "Noah Johnson",
    vendor: "Elite Events Catering",
    date: "2023-09-13",
    amount: 5600,
    status: "Pending"
  },
  {
    id: "B-7835",
    customer: "Olivia Davis",
    vendor: "Urban Plates Catering",
    date: "2023-09-12",
    amount: 3250,
    status: "Completed"
  }
];

// Sample vendor insights data
const vendorInsights = [
  {
    name: "Royal Catering Co.",
    bookings: 48,
    revenue: 235000,
    rating: 4.8,
    growth: 12
  },
  {
    name: "Green Leaf Catering",
    bookings: 42,
    revenue: 178500,
    rating: 4.7,
    growth: 8
  },
  {
    name: "Spice Affair",
    bookings: 36,
    revenue: 152000,
    rating: 4.9,
    growth: 15
  },
];

// Format date string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  
  // Get stats based on selected period
  const getStats = () => {
    if (selectedPeriod === "weekly") {
      return {
        revenue: 28500,
        bookings: 42,
        customers: 68,
        vendors: 5
      };
    } else if (selectedPeriod === "monthly") {
      return {
        revenue: 124700,
        bookings: 183,
        customers: 295,
        vendors: 21
      };
    } else {
      return {
        revenue: 1480000,
        bookings: 2184,
        customers: 3540,
        vendors: 254
      };
    }
  };
  
  const stats = getStats();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor platform metrics, manage users, and optimize your catering marketplace.
        </p>
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
              <span className="text-xs text-green-500 font-medium">+14.2%</span>
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
              <span className="text-xs text-green-500 font-medium">+8.7%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+12.8%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vendors}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+5.4%</span>
              <span className="text-xs text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Platform earnings over the past year
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
        
        {/* User Growth Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              New customer and vendor registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userGrowthData}
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
                  <Tooltip />
                  <Bar dataKey="customers" name="Customers" fill="#F97316" />
                  <Bar dataKey="vendors" name="Vendors" fill="#FCD34D" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Bookings By Category */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Bookings by Event Type</CardTitle>
            <CardDescription>
              Distribution of event categories
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {bookingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Latest Bookings */}
        <Card className="h-full lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Latest Bookings</CardTitle>
              <Link to="/admin/bookings" className="text-catering-orange hover:underline flex items-center text-sm font-medium">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-medium text-gray-500 pb-2">ID</th>
                    <th className="text-left font-medium text-gray-500 pb-2">Customer</th>
                    <th className="text-left font-medium text-gray-500 pb-2">Vendor</th>
                    <th className="text-left font-medium text-gray-500 pb-2">Amount</th>
                    <th className="text-right font-medium text-gray-500 pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100">
                      <td className="py-3">{booking.id}</td>
                      <td className="py-3">{booking.customer}</td>
                      <td className="py-3">{booking.vendor}</td>
                      <td className="py-3">${booking.amount}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'Completed' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Performing Vendors */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Top Performing Vendors</CardTitle>
            <Link to="/admin/vendors" className="text-catering-orange hover:underline flex items-center text-sm font-medium">
              View All Vendors <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 pb-3">Vendor Name</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Bookings</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Revenue</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Rating</th>
                  <th className="text-left font-medium text-gray-500 pb-3">Growth</th>
                </tr>
              </thead>
              <tbody>
                {vendorInsights.map((vendor, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3">
                      <div className="font-medium">{vendor.name}</div>
                    </td>
                    <td className="py-3">{vendor.bookings}</td>
                    <td className="py-3">${vendor.revenue.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{vendor.rating}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-400">
                          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className={`flex items-center ${
                        vendor.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>{vendor.growth}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Link to="/admin/users">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Users className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Manage Users</span>
          </Button>
        </Link>
        <Link to="/admin/vendors">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Store className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Manage Vendors</span>
          </Button>
        </Link>
        <Link to="/admin/bookings">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <ShoppingCart className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Bookings</span>
          </Button>
        </Link>
        <Link to="/admin/payments">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <CreditCard className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Payments</span>
          </Button>
        </Link>
        <Link to="/admin/promotions">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <Percent className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Promotions</span>
          </Button>
        </Link>
        <Link to="/admin/reports">
          <Button variant="outline" className="w-full h-full justify-start py-6">
            <AlertCircle className="mr-2 h-5 w-5 text-catering-orange" />
            <span>Reports</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
