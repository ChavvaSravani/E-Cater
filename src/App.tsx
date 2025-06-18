import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import VendorPage from "./pages/VendorPage";
import VendorDetails from "./pages/VendorDetails";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import Profile from "./pages/Profile";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorMenus from "./pages/vendor/VendorMenus";
import VendorOrders from "./pages/vendor/VendorOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import VendorRegistration from "./pages/vendor/VendorRegistration";
import FoodItemUpload from "./pages/vendor/FoodItemUpload";
import OrderTracking from "./pages/OrderTracking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import VendorLogin from "./pages/vendor/VendorLogin";
import Benefits from "./pages/vendor/Benefits";
import Resources from "./pages/vendor/Resources";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

// Protect routes that require authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="catering-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="vendors" element={<VendorPage />} />
            <Route path="vendors/:id" element={<VendorDetails />} />
            <Route path="vendor/register" element={<VendorRegistration />} />
            <Route path="order-tracking" element={<OrderTracking />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="help" element={<Help />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            
            {/* Protected Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="bookings"
              element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="bookings/:id"
                element={
                  <ProtectedRoute>
                    <BookingDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Vendor Routes */}
            <Route
              path="vendor/dashboard"
              element={
                <ProtectedRoute>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/menus"
              element={
                <ProtectedRoute>
                  <VendorMenus />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/orders"
              element={
                <ProtectedRoute>
                  <VendorOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/food/upload"
              element={
                <ProtectedRoute>
                  <FoodItemUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/login"
              element={
                <ProtectedRoute>
                  <VendorLogin />
                </ProtectedRoute>
              }
            />
            <Route path="vendor/benefits" element={<Benefits />} />
            <Route path="vendor/resources" element={<Resources />} />

            {/* Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/vendors"
              element={
                <ProtectedRoute>
                  <AdminVendors />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
