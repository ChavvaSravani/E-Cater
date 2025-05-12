
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Star, Clock, ArrowRight, CalendarClock, Users, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample data for vendors
const featuredVendors = [
  {
    id: 1,
    name: "Royal Catering Co.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Multi-cuisine",
    rating: 4.8,
    deliveryTime: "3-5 days",
    minOrder: 20,
    price: "$$",
  },
  {
    id: 2,
    name: "Green Leaf Catering",
    image: "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Vegetarian, Vegan",
    rating: 4.7,
    deliveryTime: "2-4 days",
    minOrder: 15,
    price: "$$",
  },
  {
    id: 3,
    name: "Spice Affair",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Indian, Asian",
    rating: 4.9,
    deliveryTime: "3-6 days",
    minOrder: 25,
    price: "$$$",
  },
  {
    id: 4,
    name: "Elite Events Catering",
    image: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Continental, Mediterranean",
    rating: 4.6,
    deliveryTime: "4-7 days",
    minOrder: 30,
    price: "$$$",
  },
];

// Sample cuisine categories
const cuisineCategories = [
  {
    name: "Italian",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 24
  },
  {
    name: "Indian",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 18
  },
  {
    name: "Chinese",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 15
  },
  {
    name: "Mediterranean",
    image: "https://images.unsplash.com/photo-1599655345010-e9e5f5a10330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 12
  },
  {
    name: "Mexican",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 10
  },
  {
    name: "Japanese",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    count: 9
  },
];

// How it works steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Explore vendors and menus that match your event needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Customize Menu",
    description: "Choose dishes and customize according to your preferences.",
    icon: CheckCheck,
  },
  {
    id: 3,
    title: "Schedule Event",
    description: "Set the date, time, and location for your event.",
    icon: CalendarClock,
  },
  {
    id: 4,
    title: "Enjoy Your Event",
    description: "Relax while professionals take care of your catering needs.",
    icon: Users,
  },
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Event Planner",
    comment: "CateringBook made organizing our corporate event so much easier. The vendors were professional and the food was outstanding!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding Coordinator",
    comment: "I've used CateringBook for multiple weddings and the service is always impeccable. Highly recommend for any special occasion.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Birthday Party Host",
    comment: "Found an amazing caterer for my daughter's birthday. The booking process was smooth and the food was a hit with all the guests!",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded, user } = useUser();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-catering-orange/90 to-catering-yellow/90 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aec78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Catering Services for Your Special Events
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Book top-rated caterers for weddings, corporate events, parties, and more. Customize menus and schedule with ease.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto bg-white rounded-lg p-1 flex items-center shadow-lg">
              <Input
                type="text"
                placeholder="Search for caterers, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="bg-catering-orange hover:bg-catering-orange/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                Wedding
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                Corporate
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                Birthday
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                Anniversary
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Vendors Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Caterers</h2>
              <p className="text-gray-600 mt-1">Top-rated catering services for your events</p>
            </div>
            <Link to="/vendors" className="text-catering-orange font-medium flex items-center hover:underline hidden md:flex">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVendors.map((vendor) => (
              <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="vendor-card group">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                    <div className="flex items-center bg-catering-light-yellow px-2 py-1 rounded text-xs font-medium text-catering-orange">
                      <Star className="h-3 w-3 mr-1 fill-catering-orange" /> {vendor.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{vendor.cuisine}</p>
                  <div className="flex items-center mt-3 text-xs text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                    <div>
                      <span>Min: {vendor.minOrder} people</span>
                    </div>
                    <div>
                      <span>{vendor.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/vendors" className="text-catering-orange font-medium flex items-center justify-center hover:underline">
              View All Vendors <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Cuisines Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore by Cuisine</h2>
            <p className="text-gray-600 mt-2">Discover caterers specialized in your favorite cuisines</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisineCategories.map((cuisine, index) => (
              <Link 
                to={`/vendors?cuisine=${cuisine.name.toLowerCase()}`} 
                key={index} 
                className="relative rounded-lg overflow-hidden group h-36 sm:h-44"
              >
                <img 
                  src={cuisine.image} 
                  alt={cuisine.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-lg">{cuisine.name}</h3>
                  <p className="text-xs text-white/80">{cuisine.count} caterers</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-catering-light-yellow/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2">Book your catering service in just a few simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="mx-auto w-16 h-16 bg-catering-orange/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-catering-orange" />
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {step.id < howItWorksSteps.length && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <SignedOut>
              <SignInButton>
                <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white px-8 py-6 text-lg">
                  Get Started Now
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/vendors">
                <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white px-8 py-6 text-lg">
                  Browse Caterers
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="text-gray-600 mt-2">Read reviews from people who've used our catering services</p>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2">
                  <Card className="border-none shadow-md h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex mb-3">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">"{testimonial.comment}"</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-catering-orange to-catering-yellow text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Host an Unforgettable Event?</h2>
            <p className="text-lg mb-8">
              Book premium catering services today and elevate your next gathering with exceptional food and service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignInButton>
                  <Button className="bg-white text-catering-orange hover:bg-white/90 px-8">
                    Sign Up & Book Now
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link to="/vendors">
                  <Button className="bg-white text-catering-orange hover:bg-white/90 px-8">
                    Book Now
                  </Button>
                </Link>
              </SignedIn>
              <Link to="/vendors">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8">
                  Browse Caterers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Catering Made Simple with Our Platform
              </h2>
              <p className="text-gray-600 mb-6">
                Our platform makes it easy to find, book, and manage catering services for any event. From corporate lunches to wedding receptions, we've got you covered.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-catering-light-yellow p-2 rounded-full mr-4">
                    <CheckCheck className="h-5 w-5 text-catering-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verified Quality Vendors</h3>
                    <p className="text-gray-600 text-sm">All caterers undergo thorough vetting to ensure high service standards.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-catering-light-yellow p-2 rounded-full mr-4">
                    <CheckCheck className="h-5 w-5 text-catering-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Customizable Menus</h3>
                    <p className="text-gray-600 text-sm">Personalize menus based on preferences, dietary requirements, and event theme.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-catering-light-yellow p-2 rounded-full mr-4">
                    <CheckCheck className="h-5 w-5 text-catering-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-time Booking Management</h3>
                    <p className="text-gray-600 text-sm">Track your bookings, communicate with vendors, and manage payments all in one place.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-catering-light-yellow p-2 rounded-full mr-4">
                    <CheckCheck className="h-5 w-5 text-catering-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure Online Payments</h3>
                    <p className="text-gray-600 text-sm">Pay through our secure payment gateway with multiple payment options.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="border-catering-orange text-catering-orange hover:bg-catering-orange/10">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                  alt="Catering service"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-catering-light-yellow rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-catering-orange/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vendor CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Are You a Catering Service Provider?</h2>
            <p className="text-gray-600 mb-8">
              Join our platform to reach more customers, manage bookings efficiently, and grow your business.
            </p>
            <Link to="/vendor/join">
              <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white px-8">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
