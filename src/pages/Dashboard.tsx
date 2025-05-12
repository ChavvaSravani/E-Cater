
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Activity, 
  CreditCard, 
  Users, 
  ChevronRight, 
  Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample data for upcoming bookings
const upcomingBookings = [
  {
    id: 1,
    vendorName: "Royal Catering Co.",
    vendorImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    eventDate: "2023-10-15",
    eventTime: "18:00",
    eventType: "Wedding",
    location: "Grand Plaza Hotel, New York",
    guests: 75,
    status: "Confirmed",
    price: 4500,
  },
  {
    id: 2,
    vendorName: "Green Leaf Catering",
    vendorImage: "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    eventDate: "2023-09-28",
    eventTime: "12:30",
    eventType: "Corporate Lunch",
    location: "Tech Offices, Boston",
    guests: 40,
    status: "Pending",
    price: 1800,
  },
];

// Sample data for recent bookings
const pastBookings = [
  {
    id: 3,
    vendorName: "Spice Affair",
    vendorImage: "https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    eventDate: "2023-08-10",
    eventTime: "19:00",
    eventType: "Birthday Party",
    location: "Home, Chicago",
    guests: 25,
    status: "Completed",
    price: 1250,
    rating: 5,
  },
  {
    id: 4,
    vendorName: "Elite Events Catering",
    vendorImage: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    eventDate: "2023-07-22",
    eventTime: "20:00",
    eventType: "Graduation Party",
    location: "Central Park, New York",
    guests: 50,
    status: "Completed",
    price: 2750,
    rating: 4,
  },
];

// Sample statistics
const stats = {
  totalSpent: 10300,
  totalEvents: 8,
  upcomingEvents: 2,
  avgRating: 4.8,
};

const Dashboard = () => {
  const { user } = useUser();
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.firstName || "User"}!</h1>
        <p className="text-gray-600 mt-1">
          Manage your catering bookings and explore new services for your events.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all bookings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.upcomingEvents} upcoming
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{stats.avgRating}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(stats.avgRating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">From your reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Loyalty Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <div className="mt-2">
              <Progress value={35} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              150 points until next reward
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Bookings */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
          <Link to="/bookings" className="text-catering-orange hover:underline flex items-center text-sm font-medium">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {upcomingBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Calendar className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium mb-2">No upcoming bookings</p>
              <p className="text-gray-400 text-sm text-center mb-4">
                You don't have any upcoming catering bookings yet.
              </p>
              <Link to="/vendors">
                <Button className="bg-catering-orange hover:bg-catering-orange/90">
                  Book a Caterer
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={booking.vendorImage} 
                      alt={booking.vendorName}
                      className="w-full h-full object-cover aspect-square sm:aspect-auto" 
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{booking.vendorName}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{booking.eventType}</p>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatDate(booking.eventDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{booking.eventTime}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="font-bold">${booking.price.toLocaleString()}</p>
                      </div>
                      <Link to={`/bookings/${booking.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Past Bookings */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Past Bookings</h2>
          <Link to="/bookings" className="text-catering-orange hover:underline flex items-center text-sm font-medium">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <img 
                    src={booking.vendorImage} 
                    alt={booking.vendorName}
                    className="w-full h-full object-cover aspect-square sm:aspect-auto" 
                  />
                </div>
                <div className="p-4 sm:p-6 flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{booking.vendorName}</h3>
                      <div className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                        {booking.status}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{booking.eventType}</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{formatDate(booking.eventDate)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{booking.guests} guests</span>
                    </div>
                    
                    {booking.rating && (
                      <div className="flex items-center text-sm">
                        <div className="flex mr-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < booking.rating 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>Your rating</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Total</p>
                      <p className="font-bold">${booking.price.toLocaleString()}</p>
                    </div>
                    <Link to={`/bookings/${booking.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Explore Section */}
      <div className="mt-12">
        <Card>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">Find Your Next Caterer</CardTitle>
                <CardDescription>
                  Explore our curated selection of premium catering services for your upcoming events.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-gray-600">
                  From intimate gatherings to large-scale corporate events, discover catering options that match your needs and preferences.
                </p>
              </CardContent>
              <CardFooter className="px-0">
                <Link to="/vendors">
                  <Button className="bg-catering-orange hover:bg-catering-orange/90">
                    Browse Caterers
                  </Button>
                </Link>
              </CardFooter>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Catering services"
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
