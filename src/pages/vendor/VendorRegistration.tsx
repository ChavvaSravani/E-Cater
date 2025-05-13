import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  cuisineType: z.string().min(1, {
    message: "Please select at least one cuisine type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  gstNumber: z.string().optional(),
  fssaiLicense: z.string().min(5, {
    message: "FSSAI License number is required.",
  })
});

const VendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      cuisineType: "",
      description: "",
      gstNumber: "",
      fssaiLicense: ""
    }
  });
  
  const onSubmit = async (values) => {
    try {
      // In a real app, you'd send this data to your backend
      console.log("Vendor registration data:", values);
      
      toast({
        title: "Registration Submitted",
        description: "Your vendor registration request has been submitted for review.",
      });
      
      setTimeout(() => {
        navigate("/vendor/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogoUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Logo Uploaded",
        description: "Your business logo has been uploaded successfully.",
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Vendor Registration</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Register as a Catering Vendor</CardTitle>
          <CardDescription>
            Fill out the form below to join our platform as a catering vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your catering business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Owner or manager name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Contact email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuisineType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Cuisine Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cuisine type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="continental">Continental</SelectItem>
                          <SelectItem value="multi-cuisine">Multi-Cuisine</SelectItem>
                          <SelectItem value="south-indian">South Indian</SelectItem>
                          <SelectItem value="north-indian">North Indian</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your catering services and specialties" 
                          className="h-32"
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
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="GST registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fssaiLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FSSAI License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="FSSAI license number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="logo">Business Logo</Label>
                  <div className="mt-2 flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleLogoUpload} 
                      disabled={isUploading}
                      className="flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : "Upload Logo"}
                    </Button>
                    <span className="ml-3 text-sm text-gray-500">Recommended size: 400x400px</span>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Submit Registration
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-2">
                By submitting this form, you agree to our terms and conditions and privacy policy.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorRegistration;
