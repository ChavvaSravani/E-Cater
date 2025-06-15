import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

// Sample booking data
const bookingsData = [
  {
    id: "B001",
    vendorName: "Royal Catering Co.",
    eventDate: "2023-06-15",
    eventTime: "Evening",
    location: "123 Event Hall, New York",
    status: "confirmed",
    guests: 45,
    totalAmount: 2499.99
  },
  {
    id: "B002",
    vendorName: "Gourmet Delights",
    eventDate: "2023-07-22",
    eventTime: "Afternoon",
    location: "Plaza Gardens, New York",
    status: "pending",
    guests: 30,
    totalAmount: 1499.99
  },
  {
    id: "B003",
    vendorName: "Tasty Bites Catering",
    eventDate: "2023-05-30",
    eventTime: "Morning",
    location: "City Conference Center",
    status: "completed",
    guests: 100,
    totalAmount: 4999.99
  }
];

// Status badge color mapping
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800"
};

const Bookings = () => {
  const [bookings] = useState(bookingsData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button className="bg-catering-orange hover:bg-catering-orange/90" onClick={() => window.location.href = '/vendors'}>
          Create New Booking
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Manage and view all your catering bookings in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.vendorName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.eventDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {booking.eventTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate max-w-[150px]">{booking.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>${booking.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusColors[booking.status]}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/bookings/${booking.id}`}>View Details</a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
