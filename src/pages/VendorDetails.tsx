
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  Star,
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample vendor data
const vendorDetails = {
  id: 1,
  name: "Royal Catering Co.",
  images: [
    "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571805341302-f857308690e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  ],
  cuisine: "Multi-cuisine",
  rating: 4.8,
  reviewCount: 247,
  deliveryTime: "3-5 days",
  minOrder: 20,
  price: "₹₹",
  location: "New York",
  address: "123 Catering Avenue, New York, NY 10001",
  distance: 3.2,
  description: "Premium catering services for weddings, corporate events, and special occasions. We specialize in creating memorable dining experiences with a focus on quality ingredients and impeccable presentation.",
  tags: ["Wedding", "Corporate", "Buffet", "Fine Dining", "Custom Menus"],
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@royalcatering.com",
    website: "www.royalcatering.com",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
  },
  menus: [
    {
      id: "appetizers",
      name: "Appetizers",
      items: [
        {
          id: "a1",
          name: "Bruschetta",
          description: "Toasted bread topped with fresh tomatoes, basil, and mozzarella",
          price: 299,
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian"],
        },
        {
          id: "a2",
          name: "Stuffed Mushrooms",
          description: "Mushrooms filled with spinach and cream cheese",
          price: 399,
          image: "https://images.unsplash.com/photo-1627308595281-e1be5fbae00e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian", "Gluten-Free"],
        },
        {
          id: "a3",
          name: "Shrimp Cocktail",
          description: "Chilled shrimp served with cocktail sauce",
          price: 599,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Gluten-Free", "Pescatarian"],
        },
      ],
    },
    {
      id: "mains",
      name: "Main Courses",
      items: [
        {
          id: "m1",
          name: "Grilled Salmon",
          description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
          price: 1199,
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Gluten-Free", "Pescatarian"],
        },
        {
          id: "m2",
          name: "Beef Tenderloin",
          description: "Slow-roasted beef tenderloin with red wine reduction",
          price: 1599,
          image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: [],
        },
        {
          id: "m3",
          name: "Vegetable Risotto",
          description: "Creamy arborio rice with seasonal vegetables and parmesan",
          price: 899,
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian"],
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "d1",
          name: "Chocolate Mousse",
          description: "Rich and creamy chocolate mousse topped with whipped cream",
          price: 449,
          image: "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian"],
        },
        {
          id: "d2",
          name: "Fruit Tart",
          description: "Fresh seasonal fruits on a sweet pastry crust",
          price: 399,
          image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian"],
        },
        {
          id: "d3",
          name: "Tiramisu",
          description: "Classic Italian dessert with layers of coffee-soaked ladyfingers",
          price: 499,
          image: "https://images.unsplash.com/photo-1571877190293-702708f7bab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegetarian"],
        },
      ],
    },
    {
      id: "drinks",
      name: "Beverages",
      items: [
        {
          id: "dr1",
          name: "Signature Cocktails",
          description: "Custom cocktails tailored to your event theme",
          price: 599,
          image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: [],
        },
        {
          id: "dr2",
          name: "Wine Selection",
          description: "Curated selection of red and white wines",
          price: 1499,
          image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegan"],
        },
        {
          id: "dr3",
          name: "Mocktail Bar",
          description: "Non-alcoholic craft beverages with fresh ingredients",
          price: 399,
          image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          dietary: ["Vegan", "Non-Alcoholic"],
        },
      ],
    },
  ],
  packages: [
    {
      id: "p1",
      name: "Essential Package",
      description: "Basic catering service with main course options and standard service",
      pricePerPerson: 1999,
      minGuests: 20,
      includes: [
        "Choice of 1 main course",
        "2 side dishes",
        "Basic table setup",
        "Service staff (1 per 20 guests)",
        "Standard dinnerware and utensils",
      ],
    },
    {
      id: "p2",
      name: "Premium Package",
      description: "Enhanced catering service with appetizers, main courses, and premium service options",
      pricePerPerson: 2999,
      minGuests: 30,
      includes: [
        "2 appetizer options",
        "Choice of 2 main courses",
        "3 side dishes",
        "Dessert selection",
        "Premium table setup with linens",
        "Service staff (1 per 15 guests)",
        "High-quality dinnerware and utensils",
      ],
    },
    {
      id: "p3",
      name: "Luxury Package",
      description: "All-inclusive luxury catering experience with full menu options and white-glove service",
      pricePerPerson: 3999,
      minGuests: 40,
      includes: [
        "3 appetizer options",
        "Choice of 3 main courses",
        "4 side dishes",
        "Dessert station",
        "Beverage service with signature cocktails",
        "Premium table setup with custom decor",
        "White-glove service staff (1 per 10 guests)",
        "Fine china, crystal glassware, and silver utensils",
        "Chef's custom menu consultation",
      ],
    },
  ],
  faqs: [
    {
      question: "How far in advance should I book catering services?",
      answer: "We recommend booking at least 4-6 weeks in advance for small to medium events, and 2-3 months for large events or during peak season (May-September)."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Yes, we can accommodate most dietary restrictions including vegetarian, vegan, gluten-free, and allergen-specific menus. Please inform us of any requirements during the consultation."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 14+ days before the event receive a full refund minus the deposit. Cancellations 7-13 days before receive a 50% refund. Cancellations less than 7 days before are not eligible for refund."
    },
    {
      question: "Do you provide staff for the event?",
      answer: "Yes, we provide professional service staff including servers, chefs, and bartenders as needed for your event. Staffing costs are typically calculated based on guest count and service level."
    },
    {
      question: "Can I customize the menu beyond your packages?",
      answer: "Absolutely! Our packages are starting points, and we're happy to customize the menu to your preferences. We offer a complimentary consultation to design your perfect menu."
    },
  ],
};

const VendorDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [mainImage, setMainImage] = useState(vendorDetails.images[0]);
  const [selectedTab, setSelectedTab] = useState("menu");
  const [guestCount, setGuestCount] = useState(20);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: { count: number; item: any };
  }>({});
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);

  // Handle item selection
  const handleItemSelect = (item: any, increment: boolean) => {
    setSelectedItems((prev) => {
      const existing = prev[item.id] || { count: 0, item };
      
      // If decrementing and count is 1, remove the item
      if (!increment && existing.count === 1) {
        const newItems = { ...prev };
        delete newItems[item.id];
        return newItems;
      }
      
      return {
        ...prev,
        [item.id]: {
          item,
          count: increment ? existing.count + 1 : existing.count - 1,
        },
      };
    });
  };

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    if (selectedPackage === packageId) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(packageId);
      // Clear individual item selections when selecting a package
      setSelectedItems({});
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    if (selectedPackage) {
      const selectedPkg = vendorDetails.packages.find(p => p.id === selectedPackage);
      return selectedPkg ? selectedPkg.pricePerPerson * guestCount : 0;
    }
    
    return Object.values(selectedItems).reduce(
      (total, { count, item }) => total + count * item.price,
      0
    );
  };

  // Initialize Razorpay
  const initializeRazorpay = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select an event date to proceed with booking",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Please select a time",
        description: "You need to select an event time to proceed with booking",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedPackage === null && Object.keys(selectedItems).length === 0) {
      toast({
        title: "No items selected",
        description: "Please select a package or individual items before booking",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd make an API call to create a Razorpay order
    const options = {
      key: "rzp_test_YourTestKey", // Enter your test key here
      amount: calculateTotal() * 100, // Amount in paisa
      currency: "INR",
      name: "Catering Service",
      description: `Booking for ${vendorDetails.name}`,
      image: "https://example.com/your_logo.png",
      handler: function(response: any) {
        // Handle success
        console.log("Payment ID: " + response.razorpay_payment_id);
        toast({
          title: "Payment Successful!",
          description: "Your booking has been confirmed.",
        });
        
        // In a real app, you'd make an API call to your backend to verify payment
        // and create the booking record
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Customer Address"
      },
      theme: {
        color: "#F37254"
      }
    };
    
    // Create and open Razorpay checkout
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // Handle booking
  const handleBooking = () => {
    // For demo purposes, let's show a message about Razorpay integration
    setShowPayment(true);
  };

  // Selected items count
  const selectedItemsCount = Object.values(selectedItems).reduce(
    (total, { count }) => total + count,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link to="/vendors" className="flex items-center text-catering-orange hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Vendors
        </Link>
      </div>
      
      {/* Vendor Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={mainImage} 
              alt={vendorDetails.name} 
              className="w-full aspect-video object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {vendorDetails.images.map((img, idx) => (
              <div 
                key={idx}
                className={`rounded-md overflow-hidden cursor-pointer ${
                  mainImage === img ? "ring-2 ring-catering-orange" : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full aspect-square object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Vendor Info */}
        <div className="md:w-1/2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{vendorDetails.name}</h1>
              <p className="text-gray-600 mt-1">{vendorDetails.cuisine}</p>
            </div>
            <div className="flex items-center bg-catering-light-yellow px-3 py-1 rounded-md">
              <Star className="h-5 w-5 mr-1 fill-catering-orange text-catering-orange" />
              <span className="font-bold text-catering-orange">{vendorDetails.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({vendorDetails.reviewCount})</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
              <span className="text-gray-700">{vendorDetails.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{vendorDetails.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{vendorDetails.contact.email}</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{vendorDetails.contact.website}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{vendorDetails.contact.hours}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-700">{vendorDetails.description}</p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {vendorDetails.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content with Tabs */}
      <Tabs defaultValue="menu" className="mt-10" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        {/* Menu Tab */}
        <TabsContent value="menu" className="space-y-8">
          {vendorDetails.menus.map((menu) => (
            <div key={menu.id}>
              <h2 className="text-2xl font-bold mb-4">{menu.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menu.items.map((item) => (
                  <div key={item.id} className="food-card overflow-visible">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="font-semibold text-catering-orange">₹{item.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 mb-3">{item.description}</p>
                      
                      {/* Dietary tags */}
                      {item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.dietary.map((diet, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full"
                            >
                              {diet}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-2">
                        {selectedItems[item.id] ? (
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleItemSelect(item, false)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-gray-900">
                              {selectedItems[item.id].count}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleItemSelect(item, true)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="text-sm"
                            onClick={() => handleItemSelect(item, true)}
                          >
                            Add to Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        {/* Packages Tab */}
        <TabsContent value="packages" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendorDetails.packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`food-card border-2 transition-all ${
                  selectedPackage === pkg.id 
                    ? "border-catering-orange" 
                    : "border-transparent"
                }`}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-2xl font-bold text-catering-orange">
                      ₹{pkg.pricePerPerson}
                    </span>
                    <span className="text-gray-600"> / person</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Min. Guests:</span> {pkg.minGuests}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="font-medium">Includes:</p>
                    <ul className="space-y-2">
                      {pkg.includes.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-catering-orange mr-2 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    className={`w-full ${
                      selectedPackage === pkg.id 
                        ? "bg-catering-orange hover:bg-catering-orange/90" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Accordion type="single" collapsible className="w-full">
            {vendorDetails.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
      
      {/* Razorpay Script */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Razorpay Test Payment</h3>
            <p className="mb-4">
              In a production environment, clicking "Proceed to Payment" would open the Razorpay payment gateway. For this demo, we'll simulate the payment flow.
            </p>
            <p className="mb-4 font-semibold">
              Total Amount: ₹{calculateTotal()}
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPayment(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-catering-orange hover:bg-catering-orange/90"
                onClick={() => {
                  setShowPayment(false);
                  // Here you would typically make an API call to create a Razorpay order
                  // and then open the Razorpay checkout
                  toast({
                    title: "Payment Successful!",
                    description: "Your booking has been confirmed.",
                  });
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-30">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
            <div className="flex items-center mr-6">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        "Select date"
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={(date) => {
                        // Disable dates before today
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex items-center mr-6 mt-4 sm:mt-0">
              <Clock className="h-5 w-5 mr-2 text-gray-500" />
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center mt-4 sm:mt-0">
              <Users className="h-5 w-5 mr-2 text-gray-500" />
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGuestCount(Math.max(10, guestCount - 10))}
                  disabled={guestCount <= 10}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center font-medium">
                  {guestCount} guests
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGuestCount(guestCount + 10)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-gray-600 text-sm">
                {selectedPackage 
                  ? "Package Selected" 
                  : selectedItemsCount > 0 
                    ? `${selectedItemsCount} items` 
                    : "No items selected"}
              </div>
              <div className="font-bold text-lg">
                ₹{calculateTotal()}
              </div>
            </div>
            
            <SignedIn>
              <Button 
                className="bg-catering-orange hover:bg-catering-orange/90"
                onClick={handleBooking}
              >
                Book Now
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="bg-catering-orange hover:bg-catering-orange/90">
                  Sign in to Book
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
