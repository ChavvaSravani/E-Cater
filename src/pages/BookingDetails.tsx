import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Calendar, Clock, MapPin, Users, DollarSign, Utensils, Check, X, Download, Phone, Mail, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample booking data (would come from API in a real app)
const bookingData = {
  id: "B001",
  vendorName: "Royal Catering Co.",
  vendorId: "V123",
  eventDate: "2023-06-15",
  eventTime: "6:00 PM - 10:00 PM",
  location: "123 Event Hall, New York, NY 10001",
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  },
  status: "confirmed",
  guests: 45,
  totalAmount: 2499.99,
  createdAt: "2023-05-01",
  items: [
    { name: "Grilled Salmon", price: 24.99, quantity: 20 },
    { name: "Beef Tenderloin", price: 34.99, quantity: 15 },
    { name: "Vegetable Risotto", price: 18.99, quantity: 10 },
    { name: "Signature Cocktails", price: 12.99, quantity: 45 }
  ],
  package: null,
  specialRequests: "Please ensure all dishes are served hot. We have 5 guests with gluten allergies.",
  contactPerson: "John Smith",
  contactEmail: "john.smith@example.com",
  contactPhone: "+1 (555) 123-4567",
  vendor: {
    name: "Royal Catering Co.",
    contactPerson: "Emily Johnson",
    phone: "+1 (555) 987-6543",
    email: "info@royalcatering.com"
  }
};

// Status badge color mapping
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800"
};

const BookingDetails = () => {
  const { id } = useParams();
  // In a real app, you would fetch the booking data based on the id
  const booking = bookingData;
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Fall back to booking location if user location cannot be obtained
          setUserLocation(booking.coordinates);
        }
      );
    } else {
      // Fall back to booking location if geolocation is not supported
      setUserLocation(booking.coordinates);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link to="/bookings" className="flex items-center text-catering-orange hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Bookings
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold mr-3">Booking #{booking.id}</h1>
            <Badge 
              variant="outline" 
              className={statusColors[booking.status]}
            >
              {booking.status}
            </Badge>
          </div>
          <p className="text-gray-500">Created on {booking.createdAt}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600">
            <X className="mr-2 h-4 w-4" />
            Cancel Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main booking details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{booking.eventDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{booking.eventTime}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{booking.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">{booking.guests} people</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order items */}
            <div>
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-2">
                {booking.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t">
                <span className="font-bold">Total</span>
                <span className="font-bold">${booking.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            {/* Special requests */}
            <div>
              <h3 className="font-semibold mb-2">Special Requests</h3>
              <p className="text-gray-700">{booking.specialRequests}</p>
            </div>

            {/* Location Map */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-catering-orange" />
                Event Location
              </h3>
              <div className="rounded-md overflow-hidden border" style={{ height: 300 }}>
                <iframe
                  title="Event Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${booking.coordinates.lng-0.01}%2C${booking.coordinates.lat-0.01}%2C${booking.coordinates.lng+0.01}%2C${booking.coordinates.lat+0.01}&layer=mapnik&marker=${booking.coordinates.lat}%2C${booking.coordinates.lng}`}
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <a 
                  href={`https://www.openstreetmap.org/?mlat=${booking.coordinates.lat}&mlon=${booking.coordinates.lng}#map=16/${booking.coordinates.lat}/${booking.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-catering-orange flex items-center hover:underline"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Get Directions
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar with contact info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-bold text-lg">{booking.vendor.name}</p>
                <p className="text-gray-500">Contact: {booking.vendor.contactPerson}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{booking.vendor.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{booking.vendor.email}</span>
                </div>
              </div>
              <a href={`mailto:${booking.vendor.email}`} style={{ width: '100%' }}>
                <Button className="w-full bg-catering-orange hover:bg-catering-orange/90">
                  Message Vendor
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-bold">{booking.contactPerson}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{booking.contactPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{booking.contactEmail}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Contact Info
              </Button>
            </CardContent>
          </Card>

          {/* Your Current Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-catering-orange" />
                Your Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userLocation ? (
                <div>
                  <div className="rounded-md overflow-hidden border" style={{ height: 200 }}>
                    <iframe
                      title="Your Current Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng-0.01}%2C${userLocation.lat-0.01}%2C${userLocation.lng+0.01}%2C${userLocation.lat+0.01}&layer=mapnik&marker=${userLocation.lat}%2C${userLocation.lng}`}
                      style={{ border: 0 }}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">This is your current location</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Loading your location...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
