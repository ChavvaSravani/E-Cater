
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Star, MapPin, Phone, Mail, Globe, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample vendor data
const sampleVendors = [
  {
    id: "v1",
    name: "Royal Catering Co.",
    cuisine: "Multi-cuisine",
    rating: 4.8,
    reviewCount: 247,
    status: "approved",
    featured: true,
    location: "New York, NY",
    createdAt: "2023-02-15",
    contact: {
      name: "Emily Johnson",
      phone: "+1 (555) 123-4567",
      email: "info@royalcatering.com",
      website: "www.royalcatering.com",
    },
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v2",
    name: "Gourmet Delights",
    cuisine: "French, Italian",
    rating: 4.5,
    reviewCount: 183,
    status: "approved",
    featured: false,
    location: "Chicago, IL",
    createdAt: "2023-03-10",
    contact: {
      name: "Thomas Williams",
      phone: "+1 (555) 234-5678",
      email: "info@gourmetdelights.com",
      website: "www.gourmetdelights.com",
    },
    image: "https://images.unsplash.com/photo-1571805341302-f857308690e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v3",
    name: "Tasty Bites Catering",
    cuisine: "Asian Fusion",
    rating: 4.2,
    reviewCount: 116,
    status: "pending",
    featured: false,
    location: "San Francisco, CA",
    createdAt: "2023-04-22",
    contact: {
      name: "Michelle Chen",
      phone: "+1 (555) 345-6789",
      email: "info@tastybites.com",
      website: "www.tastybites.com",
    },
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v4",
    name: "Celebration Catering",
    cuisine: "American, BBQ",
    rating: 4.6,
    reviewCount: 205,
    status: "approved",
    featured: true,
    location: "Dallas, TX",
    createdAt: "2023-01-05",
    contact: {
      name: "Robert Smith",
      phone: "+1 (555) 456-7890",
      email: "info@celebrationcatering.com",
      website: "www.celebrationcatering.com",
    },
    image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "v5",
    name: "Fresh & Healthy Catering",
    cuisine: "Vegetarian, Vegan",
    rating: 4.3,
    reviewCount: 97,
    status: "suspended",
    featured: false,
    location: "Seattle, WA",
    createdAt: "2023-05-18",
    contact: {
      name: "Lisa Green",
      phone: "+1 (555) 567-8901",
      email: "info@freshhealthy.com",
      website: "www.freshhealthy.com",
    },
    image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const AdminVendors = () => {
  const [vendors, setVendors] = useState(sampleVendors);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();
  
  // Filter vendors based on search query and filter status
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Update vendor status
  const updateVendorStatus = (vendorId, newStatus) => {
    const updatedVendors = vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    );
    
    setVendors(updatedVendors);
    
    toast({
      title: "Vendor Status Updated",
      description: `Vendor status has been changed to ${newStatus}.`
    });
  };
  
  // Toggle vendor featured status
  const toggleFeatured = (vendorId) => {
    const updatedVendors = vendors.map(vendor => 
      vendor.id === vendorId ? { ...vendor, featured: !vendor.featured } : vendor
    );
    
    setVendors(updatedVendors);
    
    const vendor = vendors.find(v => v.id === vendorId);
    const newStatus = !vendor.featured;
    
    toast({
      title: newStatus ? "Vendor Featured" : "Vendor Unfeatured",
      description: newStatus 
        ? "Vendor will now appear in featured listings." 
        : "Vendor has been removed from featured listings."
    });
  };

  // Get appropriate badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Management</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search vendors..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Filter: {filterStatus === "all" ? "All Vendors" : 
                        filterStatus === "approved" ? "Approved" : 
                        filterStatus === "pending" ? "Pending" : "Suspended"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Vendors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("suspended")}>
                <X className="h-4 w-4 mr-2 text-red-600" />
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md overflow-hidden mr-2">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-gray-500">{vendor.cuisine}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{vendor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({vendor.reviewCount})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      {vendor.location}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                  <TableCell>
                    {vendor.featured ? 
                      <Badge className="bg-catering-orange text-white">Featured</Badge> : 
                      <span className="text-gray-500">-</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedVendor(vendor)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {vendor.status !== "approved" && (
                          <DropdownMenuItem onClick={() => updateVendorStatus(vendor.id, "approved")}>
                            Approve Vendor
                          </DropdownMenuItem>
                        )}
                        {vendor.status !== "suspended" && (
                          <DropdownMenuItem 
                            className="text-red-500"
                            onClick={() => updateVendorStatus(vendor.id, "suspended")}
                          >
                            Suspend Vendor
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleFeatured(vendor.id)}>
                          {vendor.featured ? "Remove from Featured" : "Add to Featured"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Vendor Details Dialog */}
      {selectedVendor && (
        <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Vendor Details</DialogTitle>
              <DialogDescription>
                View and manage information for {selectedVendor.name}.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="details">Vendor Details</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div>
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <img 
                      src={selectedVendor.image} 
                      alt={selectedVendor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                    <p>{selectedVendor.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Cuisine</p>
                    <p>{selectedVendor.cuisine}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{selectedVendor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({selectedVendor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p>{selectedVendor.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p>{getStatusBadge(selectedVendor.status)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Featured</p>
                    <p>{selectedVendor.featured ? "Yes" : "No"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Joined Date</p>
                    <p>{selectedVendor.createdAt}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Contact Person</p>
                    <p>{selectedVendor.contact.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-500" />
                      <p>{selectedVendor.contact.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-500" />
                      <p>{selectedVendor.contact.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Website</p>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1 text-gray-500" />
                      <p>{selectedVendor.contact.website}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between mt-4">
              {selectedVendor.status !== "approved" && (
                <Button 
                  onClick={() => {
                    updateVendorStatus(selectedVendor.id, "approved");
                    setSelectedVendor(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Vendor
                </Button>
              )}
              
              <Button 
                variant="outline"
                onClick={() => {
                  toggleFeatured(selectedVendor.id);
                  setSelectedVendor(null);
                }}
              >
                {selectedVendor.featured ? "Remove from Featured" : "Add to Featured"}
              </Button>
              
              {selectedVendor.status !== "suspended" && (
                <Button 
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => {
                    updateVendorStatus(selectedVendor.id, "suspended");
                    setSelectedVendor(null);
                  }}
                >
                  Suspend Vendor
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminVendors;
