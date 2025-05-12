
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { 
  Search, 
  Menu, 
  X, 
  Home,
  Store,
  CalendarClock,
  User,
  Settings,
  LayoutDashboard,
  FileText,
  ChefHat,
  LogIn,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-catering-orange rounded-lg p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6C10.3431 6 9 7.34315 9 9H15C15 7.34315 13.6569 6 12 6Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM5 10C5 8.34315 6.34315 7 8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7C17.6569 7 19 8.34315 19 10V11C19 12.6569 17.6569 14 16 14H8C6.34315 14 5 12.6569 5 11V10ZM7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11V10ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H9Z" fill="white"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-catering-orange">CateringBook</span>
        </Link>

        {/* Mobile Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search size={20} />
          </Button>
          
          <SignedIn>
            <Link to="/bookings">
              <Button variant="ghost" size="icon" className="text-foreground">
                <ShoppingCart size={20} />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
                      <div className="bg-catering-orange rounded-lg p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6C10.3431 6 9 7.34315 9 9H15C15 7.34315 13.6569 6 12 6Z" fill="white"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM5 10C5 8.34315 6.34315 7 8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7C17.6569 7 19 8.34315 19 10V11C19 12.6569 17.6569 14 16 14H8C6.34315 14 5 12.6569 5 11V10ZM7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11V10ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H9Z" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-base font-bold text-catering-orange">CateringBook</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={closeMenu}>
                      <X size={20} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto py-2">
                  <nav className="flex flex-col space-y-1 px-2">
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                        location.pathname === "/" 
                          ? "bg-catering-light-yellow text-catering-orange" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Home size={18} />
                      <span>Home</span>
                    </Link>
                    <Link
                      to="/vendors"
                      onClick={closeMenu}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                        location.pathname.includes("/vendors") 
                          ? "bg-catering-light-yellow text-catering-orange" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Store size={18} />
                      <span>Vendors</span>
                    </Link>
                    
                    <SignedIn>
                      <Link
                        to="/bookings"
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                          location.pathname.includes("/bookings") 
                            ? "bg-catering-light-yellow text-catering-orange" 
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <CalendarClock size={18} />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                          location.pathname === "/profile" 
                            ? "bg-catering-light-yellow text-catering-orange" 
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <User size={18} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={closeMenu}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                          location.pathname === "/dashboard" 
                            ? "bg-catering-light-yellow text-catering-orange" 
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </Link>
                      
                      {/* Vendor Menu */}
                      <div className="mt-4 px-3">
                        <p className="text-xs font-medium text-gray-500 mb-2">VENDOR MENU</p>
                        <Link
                          to="/vendor/dashboard"
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                            location.pathname === "/vendor/dashboard" 
                              ? "bg-catering-light-yellow text-catering-orange" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <ChefHat size={18} />
                          <span>Vendor Dashboard</span>
                        </Link>
                        <Link
                          to="/vendor/menus"
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                            location.pathname === "/vendor/menus" 
                              ? "bg-catering-light-yellow text-catering-orange" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <FileText size={18} />
                          <span>Manage Menus</span>
                        </Link>
                      </div>
                      
                      {/* Admin Menu */}
                      <div className="mt-4 px-3">
                        <p className="text-xs font-medium text-gray-500 mb-2">ADMIN MENU</p>
                        <Link
                          to="/admin/dashboard"
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                            location.pathname === "/admin/dashboard" 
                              ? "bg-catering-light-yellow text-catering-orange" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <LayoutDashboard size={18} />
                          <span>Admin Dashboard</span>
                        </Link>
                        <Link
                          to="/admin/users"
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                            location.pathname === "/admin/users" 
                              ? "bg-catering-light-yellow text-catering-orange" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <Settings size={18} />
                          <span>Manage Users</span>
                        </Link>
                      </div>
                    </SignedIn>
                    
                    <SignedOut>
                      <Link
                        to="/sign-in"
                        onClick={closeMenu}
                        className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </Link>
                    </SignedOut>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;
