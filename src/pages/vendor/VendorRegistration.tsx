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
import { Upload, IndianRupee, Phone, MapPin, User } from "lucide-react";

// List of Indian states
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", 
  "Chandigarh", "Andaman and Nicobar Islands","Goa", "Dadra and Nagar Haveli and Daman and Diu", 
  "Lakshadweep"
];

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
  state: z.string().min(1, {
    message: "Please select your state.",
  }),
  pincode: z.string().min(6).max(6, {
    message: "Pincode must be 6 digits.",
  }),
  cuisineType: z.string().min(1, {
    message: "Please select at least one cuisine type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  gstNumber: z.string().min(15).max(15, {
    message: "GST Number must be exactly 15 characters.",
  }),
  fssaiLicense: z.string().min(5, {
    message: "FSSAI License number is required.",
  }),
  registrationFee: z.literal(true, {
    message: "You must agree to pay the registration fee to continue.",
  })
});

const VendorRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      cuisineType: "",
      description: "",
      gstNumber: "",
      fssaiLicense: "",
      registrationFee: false
    }
  });
  
  const handleRazorpayPayment = () => {
    setPaymentProcessing(true);
    
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      // Create Razorpay options
      const options = {
        key: 'rzp_test_yVxyfuifAGHD', // Test key
        amount: null, // Amount in paise (₹1000)
        currency: 'INR',
        name: 'CateringBook',
        description: 'Vendor Registration Fee',
        image: 'https://placeholder.co/100x100',
        handler: function(response) {
          // Payment success
          console.log("Payment success:", response);
          

          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          
          // Submit the form data
          const formData = form.getValues();
          console.log("Vendor registration data:", formData);
          
          toast({
            title: "Registration Submitted",
            description: "Your vendor registration request has been submitted for review.",
          });
          
          setTimeout(() => {
            navigate("/");
          }, 3000);
        },
        prefill: {
          name: form.getValues().ownerName,
          email: form.getValues().email,
          contact: form.getValues().phone
        },
        notes: {
          business_name: form.getValues().businessName
        },
        theme: {
          color: '#FF8C00' // catering-orange color
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setPaymentProcessing(false);
    };
    
    script.onerror = () => {
      toast({
        title: "Payment Error",
        description: "Could not load payment gateway. Please try again.",
        variant: "destructive",
      });
      setPaymentProcessing(false);
    };
    
    document.body.appendChild(script);
  };
  
  const onSubmit = async (values) => {
    // Validate the form before proceeding to payment
    if (form.formState.isValid) {
      handleRazorpayPayment();
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
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="Owner or manager name" className="pl-10" {...field} />
                        </div>
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
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Contact phone number" className="pl-10" {...field} />
                          </div>
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
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea placeholder="Full address" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-80">
                            {INDIAN_STATES.map((state) => (
                              <SelectItem key={state} value={state.toLowerCase()}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="6-digit pincode" maxLength={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          <SelectItem value="south-indian">South Indian</SelectItem>
                          <SelectItem value="north-indian">North Indian</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                          <SelectItem value="maharashtrian">Maharashtrian</SelectItem>
                          <SelectItem value="rajasthani">Rajasthani</SelectItem>
                          <SelectItem value="hyderabadi">Hyderabadi</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Vas koda gama</SelectItem>
                          <SelectItem value="continental">Continental</SelectItem>
                          <SelectItem value="multi-cuisine">Multi-Cuisine</SelectItem>
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
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="15-digit GST number" className="pl-10" maxLength={15} {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>Format: 22AAAAA0000A1Z5</FormDescription>
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

                <FormField
                  control={form.control}
                  name="registrationFee"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Registration Fee</FormLabel>
                        <FormDescription>
                          I agree to pay the one-time vendor registration fee of ₹1,000
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={paymentProcessing}>
                {paymentProcessing ? "Processing..." : "Pay ₹1,000 & Register"}
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
