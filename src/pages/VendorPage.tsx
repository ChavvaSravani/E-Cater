import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  ArrowUpDown,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Sample data
const vendors = [
  {
    id: 1,
    name: "Royal Catering Co.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Multi-cuisine",
    rating: 4.8,
    deliveryTime: "3-5 days",
    minOrder: 20,
    price: "₹₹",
    location: "Mumbai",
    distance: 3.2,
    description: "Premium catering services for weddings, corporate events, and special occasions.",
    tags: ["Wedding", "Corporate", "Buffet", "Fine Dining"],
    featured: true,
  },
  {
    id: 2,
    name: "Green Leaf Catering",
    image: "https://images.unsplash.com/photo-1605522469906-3fe226b356bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Vegetarian, Vegan",
    rating: 4.7,
    deliveryTime: "2-4 days",
    minOrder: 15,
    price: "₹₹",
    location: "Delhi",
    distance: 5.1,
    description: "Sustainable plant-based catering with organic ingredients and eco-friendly practices.",
    tags: ["Vegetarian", "Vegan", "Organic", "Health"],
    featured: true,
  },
  {
    id: 3,
    name: "Spice Affair",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Indian, Asian",
    rating: 4.9,
    deliveryTime: "3-6 days",
    minOrder: 25,
    price: "₹₹₹",
    location: "Bangalore",
    distance: 2.8,
    description: "Authentic Indian and Asian cuisine with a modern twist. Spice levels customizable.",
    tags: ["Indian", "Asian", "Spicy", "Fusion"],
    featured: true,
  },
  {
    id: 4,
    name: "Elite Events Catering",
    image: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Continental, Mediterranean",
    rating: 4.6,
    deliveryTime: "4-7 days",
    minOrder: 30,
    price: "₹₹₹",
    location: "Chennai",
    distance: 4.3,
    description: "Luxury catering for high-end events, celebrity weddings, and exclusive parties.",
    tags: ["Luxury", "Mediterranean", "Continental", "Fine Dining"],
    featured: false,
  },
  {
    id: 5,
    name: "Urban Plates Catering",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "American, Fusion",
    rating: 4.5,
    deliveryTime: "2-3 days",
    minOrder: 10,
    price: "₹₹",
    location: "Kolkata",
    distance: 1.9,
    description: "Modern American cuisine with international influences. Perfect for casual events.",
    tags: ["American", "Fusion", "Casual", "Trendy"],
    featured: false,
  },
  {
    id: 6,
    name: "Sweet Success Desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Desserts, Pastries",
    rating: 4.9,
    deliveryTime: "1-2 days",
    minOrder: 15,
    price: "₹₹",
    location: "Hyderabad",
    distance: 3.5,
    description: "Specialized dessert catering for events. Custom cakes, pastries, and sweet treats.",
    tags: ["Desserts", "Pastries", "Cakes", "Sweet"],
    featured: false,
  },
  {
    id: 7,
    name: "Coastal Seafood Catering",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Seafood, Mediterranean",
    rating: 4.7,
    deliveryTime: "2-4 days",
    minOrder: 20,
    price: "₹₹₹",
    location: "Pune",
    distance: 6.2,
    description: "Fresh seafood catering with Mediterranean influence. Sustainable fishing practices.",
    tags: ["Seafood", "Mediterranean", "Sustainable", "Fresh"],
    featured: false,
  },
  {
    id: 8,
    name: "Fiesta Mexican Catering",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    cuisine: "Mexican, Latin",
    rating: 4.6,
    deliveryTime: "2-3 days",
    minOrder: 15,
    price: "₹₹",
    location: "Jaipur",
    distance: 4.8,
    description: "Authentic Mexican catering with options from street food to gourmet cuisine.",
    tags: ["Mexican", "Latin", "Spicy", "Festive"],
    featured: false,
  },
];

// Filter options
const cuisineOptions = [
  "All Cuisines",
  "American",
  "Asian",
  "Continental",
  "Desserts",
  "Indian",
  "Italian",
  "Latin",
  "Mediterranean",
  "Mexican",
  "Seafood",
  "Vegetarian",
  "Vegan",
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "low-carb", label: "Low-Carb" },
];

const occasionOptions = [
  { id: "wedding", label: "Wedding" },
  { id: "corporate", label: "Corporate" },
  { id: "birthday", label: "Birthday Party" },
  { id: "anniversary", label: "Anniversary" },
  { id: "graduation", label: "Graduation" },
  { id: "reunion", label: "Reunion" },
];

const VendorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [selectedSort, setSelectedSort] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minGuests, setMinGuests] = useState(10);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter and sort vendors
  useEffect(() => {
    let results = [...vendors];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        vendor => 
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply cuisine filter
    if (selectedCuisine !== "All Cuisines") {
      results = results.filter(
        vendor => vendor.cuisine.includes(selectedCuisine)
      );
    }
    
    // Apply minimum guests filter
    if (minGuests > 10) {
      results = results.filter(vendor => vendor.minOrder <= minGuests);
    }
    
    // Apply sorting
    switch (selectedSort) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        results.sort((a, b) => a.price.length - b.price.length);
        break;
      case "price-high":
        results.sort((a, b) => b.price.length - a.price.length);
        break;
      case "recommended":
        // Put featured vendors first, then sort by rating
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
      default:
        break;
    }
    
    setFilteredVendors(results);
  }, [searchQuery, selectedCuisine, selectedSort, minGuests]);

  // Filter component
  const FilterComponent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Cuisines</h3>
        <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineOptions.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Dietary Requirements</h3>
        <div className="space-y-2">
          {dietaryOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox id={option.id} />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Occasion</h3>
        <div className="space-y-2">
          {occasionOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox id={option.id} />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex justify-between text-sm">
          <span>₹</span>
          <span>₹₹</span>
          <span>₹₹₹</span>
          <span>₹₹₹₹</span>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Minimum Party Size</h3>
        <Select
          value={minGuests.toString()}
          onValueChange={(value) => setMinGuests(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Minimum guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10+ guests</SelectItem>
            <SelectItem value="15">15+ guests</SelectItem>
            <SelectItem value="20">20+ guests</SelectItem>
            <SelectItem value="30">30+ guests</SelectItem>
            <SelectItem value="50">50+ guests</SelectItem>
            <SelectItem value="100">100+ guests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isMobile && (
        <div className="pt-4">
          <Button 
            className="w-full bg-catering-orange hover:bg-catering-orange/90"
            onClick={() => setFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Catering Vendors</h1>
          <p className="text-gray-600 mt-1">
            {filteredVendors.length} vendors available for your event
          </p>
        </div>
        <Link to="/vendor/register" className="hidden md:block">
          <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white">
            Become a Vendor
          </Button>
        </Link>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by name, cuisine, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        
        {isMobile && (
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm overflow-y-auto">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              <FilterComponent />
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar (Desktop) */}
        {!isMobile && (
          <div className="w-64 flex-shrink-0">
            <div className="rounded-lg border p-4">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              <FilterComponent />
            </div>
          </div>
        )}
        
        {/* Vendor List */}
        <div className="flex-grow">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No vendors match your search</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("All Cuisines");
                setSelectedSort("recommended");
                setPriceRange([0, 100]);
                setMinGuests(10);
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="vendor-card group">
                  <div className="relative">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    
                    {vendor.featured && (
                      <div className="absolute top-3 left-3 bg-catering-orange text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Featured
                      </div>
                    )}
                    
                    {/* Price indicator */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full">
                      {vendor.price}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                      <div className="flex items-center bg-catering-light-yellow px-2 py-1 rounded text-xs font-medium text-catering-orange">
                        <Star className="h-3 w-3 mr-1 fill-catering-orange" /> {vendor.rating}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{vendor.cuisine}</p>
                    
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{vendor.location} ({vendor.distance.toFixed(1)} km)</span>
                    </div>
                    
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Prep time: {vendor.deliveryTime}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {vendor.tags.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {vendor.tags.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          +{vendor.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 md:hidden text-center">
        <Link to="/vendor/register">
          <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white">
            Become a Vendor
          </Button>
        </Link>
        <p className="mt-4 text-gray-600">
          Contact us: <a href="tel:+917032650276" className="font-medium">+91 70326 50276</a>
        </p>
      </div>
    </div>
  );
};

export default VendorPage;
