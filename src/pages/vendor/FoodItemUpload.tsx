
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, IndianRupee } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  servingSize: z.string().min(1, {
    message: "Please specify serving size.",
  }),
  preparationTime: z.string().min(1, {
    message: "Please specify preparation time.",
  })
});

const FoodItemUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      servingSize: "",
      preparationTime: ""
    }
  });
  
  const onSubmit = async (values) => {
    try {
      // In a real app, you'd send this data to your backend
      console.log("Food item data:", values);
      
      toast({
        title: "Item Added",
        description: "Your food item has been added to your menu.",
      });
      
      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Item upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error adding your item. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleImageUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setImagePreview("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3");
      toast({
        title: "Image Uploaded",
        description: "Your food item image has been uploaded successfully.",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Food Item</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Menu Item</CardTitle>
          <CardDescription>
            Add a new dish to your catering menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of the dish" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the dish, including ingredients and preparation style" 
                          className="h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">₹</span>
                            <Input type="text" placeholder="0.00" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="appetizer">Appetizer</SelectItem>
                            <SelectItem value="main-course">Main Course</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                            <SelectItem value="beverage">Beverage</SelectItem>
                            <SelectItem value="side-dish">Side Dish</SelectItem>
                            <SelectItem value="bread">Bread</SelectItem>
                            <SelectItem value="soup">Soup</SelectItem>
                            <SelectItem value="salad">Salad</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="servingSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serving Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1 person, 100g" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preparationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 30 minutes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="isVegetarian"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Vegetarian</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isVegan"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Vegan</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isGlutenFree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Gluten Free</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label>Food Item Image</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Food preview" 
                          className="w-full h-48 object-cover rounded-md" 
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => setImagePreview(null)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleImageUpload} 
                          disabled={isUploading}
                          className="flex items-center mx-auto"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {isUploading ? "Uploading..." : "Upload Image"}
                        </Button>
                        <p className="mt-2 text-sm text-gray-500">
                          Recommended: High-resolution image (at least 800x600px)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Add to Menu
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodItemUpload;
