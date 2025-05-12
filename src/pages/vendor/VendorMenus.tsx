
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash, Plus, DollarSign, Tag, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample menu categories and items
const initialMenus = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      {
        id: "a1",
        name: "Bruschetta",
        description: "Toasted bread topped with fresh tomatoes, basil, and mozzarella",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
        dietary: ["Vegetarian"]
      },
      {
        id: "a2",
        name: "Stuffed Mushrooms",
        description: "Mushrooms filled with spinach and cream cheese",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1627308595281-e1be5fbae00e",
        dietary: ["Vegetarian", "Gluten-Free"]
      }
    ]
  },
  {
    id: "mains",
    name: "Main Courses",
    items: [
      {
        id: "m1",
        name: "Grilled Salmon",
        description: "Atlantic salmon with lemon butter sauce and seasonal vegetables",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
        dietary: ["Gluten-Free", "Pescatarian"]
      },
      {
        id: "m2",
        name: "Beef Tenderloin",
        description: "Slow-roasted beef tenderloin with red wine reduction",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976",
        dietary: []
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      {
        id: "d1",
        name: "Chocolate Mousse",
        description: "Rich and creamy chocolate mousse topped with whipped cream",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6",
        dietary: ["Vegetarian"]
      }
    ]
  }
];

// Sample packages
const initialPackages = [
  {
    id: "p1",
    name: "Essential Package",
    description: "Basic catering service with main course options and standard service",
    pricePerPerson: 39.99,
    minGuests: 20,
    includes: [
      "Choice of 1 main course",
      "2 side dishes",
      "Basic table setup",
      "Service staff (1 per 20 guests)",
      "Standard dinnerware and utensils"
    ]
  },
  {
    id: "p2",
    name: "Premium Package",
    description: "Enhanced catering service with appetizers, main courses, and premium service options",
    pricePerPerson: 59.99,
    minGuests: 30,
    includes: [
      "2 appetizer options",
      "Choice of 2 main courses",
      "3 side dishes",
      "Dessert selection",
      "Premium table setup with linens",
      "Service staff (1 per 15 guests)",
      "High-quality dinnerware and utensils"
    ]
  }
];

const VendorMenus = () => {
  const [menus, setMenus] = useState(initialMenus);
  const [packages, setPackages] = useState(initialPackages);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("menu");
  
  // Function to handle item deletion
  const handleDeleteItem = (categoryId: string, itemId: string) => {
    const updatedMenus = menus.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        };
      }
      return category;
    });
    
    setMenus(updatedMenus);
    toast({
      title: "Item Deleted",
      description: "Menu item has been deleted successfully."
    });
  };
  
  // Function to handle package deletion
  const handleDeletePackage = (packageId: string) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
    toast({
      title: "Package Deleted",
      description: "Package has been deleted successfully."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Menus</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Menu Categories</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-catering-orange hover:bg-catering-orange/90">
                  <Plus className="mr-2 h-4 w-4" /> Add New Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Menu Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input id="name" placeholder="e.g., Appetizers, Main Course" />
                  </div>
                  <Button className="w-full bg-catering-orange hover:bg-catering-orange/90">
                    Save Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {menus.map((category) => (
            <Card key={category.id} className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{category.name}</CardTitle>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add Menu Item to {category.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="itemName">Item Name</Label>
                          <Input id="itemName" placeholder="e.g., Grilled Salmon" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="itemDescription">Description</Label>
                          <Input id="itemDescription" placeholder="Brief description of the item" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="itemPrice">Price ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                              <Input id="itemPrice" type="number" step="0.01" min="0" className="pl-8" placeholder="0.00" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="itemDietary">Dietary Tags</Label>
                            <div className="relative">
                              <Tag className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                              <Input id="itemDietary" className="pl-8" placeholder="Vegetarian, Gluten-Free" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="itemImage">Image URL</Label>
                          <Input id="itemImage" placeholder="https://example.com/image.jpg" />
                        </div>
                        <Button className="w-full bg-catering-orange hover:bg-catering-orange/90">
                          Save Item
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit Category</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-md">{item.description}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-catering-orange font-medium">${item.price.toFixed(2)}</span>
                            {item.dietary.length > 0 && (
                              <div className="flex ml-4 space-x-1">
                                {item.dietary.map((diet, index) => (
                                  <span 
                                    key={index}
                                    className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded"
                                  >
                                    {diet}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteItem(category.id, item.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                  {category.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No items in this category. Add your first item.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Catering Packages</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-catering-orange hover:bg-catering-orange/90">
                  <Plus className="mr-2 h-4 w-4" /> Add New Package
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Package</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="packageName">Package Name</Label>
                    <Input id="packageName" placeholder="e.g., Premium Wedding Package" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="packageDescription">Description</Label>
                    <Input id="packageDescription" placeholder="Brief description of what's included" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricePerPerson">Price Per Person ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input id="pricePerPerson" type="number" step="0.01" min="0" className="pl-8" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minGuests">Minimum Guests</Label>
                      <Input id="minGuests" type="number" min="1" placeholder="e.g., 20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="includes">What's Included (one per line)</Label>
                    <div className="relative">
                      <FileText className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <textarea 
                        id="includes" 
                        className="pl-8 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Choice of 2 appetizers&#10;1 main course per person&#10;etc."
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-catering-orange hover:bg-catering-orange/90">
                    Save Package
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{pkg.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeletePackage(pkg.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{pkg.description}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-catering-orange">${pkg.pricePerPerson.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">per person (min. {pkg.minGuests} guests)</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Includes:</p>
                    <ul className="space-y-1 text-sm">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {packages.length === 0 && (
            <div className="text-center py-12 border rounded-md">
              <p className="text-gray-500">No packages available. Create your first package.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorMenus;
