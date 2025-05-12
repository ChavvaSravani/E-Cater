
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNavbar from "./MobileNavbar";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded } = useUser();
  const isMobile = useIsMobile();

  // Add a small delay to prevent flash of content
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-catering-orange"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
