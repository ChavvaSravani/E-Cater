
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { 
  Search, 
  Menu, 
  ShoppingCart, 
  Bell,
  LogIn,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { userId } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-catering-orange rounded-lg p-1">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6C10.3431 6 9 7.34315 9 9H15C15 7.34315 13.6569 6 12 6Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM5 10C5 8.34315 6.34315 7 8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7C17.6569 7 19 8.34315 19 10V11C19 12.6569 17.6569 14 16 14H8C6.34315 14 5 12.6569 5 11V10ZM7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11V10ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H9Z" fill="white"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-catering-orange">CateringBook</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`text-sm font-medium ${location.pathname === "/" ? "text-catering-orange" : "text-foreground hover:text-catering-orange"}`}>
            Home
          </Link>
          <Link to="/vendors" className={`text-sm font-medium ${location.pathname.includes("/vendors") ? "text-catering-orange" : "text-foreground hover:text-catering-orange"}`}>
            Vendors
          </Link>
          
          <SignedIn>
            <Link to="/bookings" className={`text-sm font-medium ${location.pathname.includes("/bookings") ? "text-catering-orange" : "text-foreground hover:text-catering-orange"}`}>
              My Bookings
            </Link>
          </SignedIn>

          {/* User role-based links */}
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">More</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                {/* Add vendor and admin routes conditionally in a real app */}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Vendor Access</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/vendor/dashboard" className="w-full cursor-pointer">
                      Vendor Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/vendor/menus" className="w-full cursor-pointer">
                      Manage Menus
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin Access</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="w-full cursor-pointer">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/users" className="w-full cursor-pointer">
                      Manage Users
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </nav>

        {/* Right Section - Search, Cart, User */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-catering-orange">
            <Search size={20} />
          </Button>

          <SignedIn>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-catering-orange">
              <Bell size={20} />
            </Button>
            <Link to="/bookings">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-catering-orange">
                <ShoppingCart size={20} />
              </Button>
            </Link>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8"
                }
              }}
            />
          </SignedIn>

          <SignedOut>
            <Link to="/sign-in">
              <Button className="bg-catering-orange hover:bg-catering-orange/90 text-white">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
