import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-catering-orange rounded-lg p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6C10.3431 6 9 7.34315 9 9H15C15 7.34315 13.6569 6 12 6Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM5 10C5 8.34315 6.34315 7 8 7C8 5.34315 9.34315 4 11 4H13C14.6569 4 16 5.34315 16 7C17.6569 7 19 8.34315 19 10V11C19 12.6569 17.6569 14 16 14H8C6.34315 14 5 12.6569 5 11V10ZM7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11V10ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16H9Z" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-catering-orange">CateringBook</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Book premium catering services for your events. From corporate gatherings to private celebrations, we've got your culinary needs covered.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-catering-orange mt-0.5" />
                <span className="text-sm text-gray-600">GLEC </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-catering-orange" />
                <span className="text-sm text-gray-600">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-catering-orange" />
                <span className="text-sm text-gray-600">contact@cateringbook.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-catering-orange">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-sm text-gray-600 hover:text-catering-orange">
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-catering-orange">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-catering-orange">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-catering-orange">
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex justify-center md:justify-start">
              <Link to="/about">
                <button className="bg-catering-orange text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-catering-orange/90 transition">About</button>
              </Link>
            </div>
          </div>
          
          {/* For Vendors */}
          <div>
            <h3 className="text-base font-semibold mb-4">For Vendors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor/register" className="text-sm text-gray-600 hover:text-catering-orange">
                  Join as Vendor
                </Link>
              </li>
              <li>
                <Link to="/vendor/login" className="text-sm text-gray-600 hover:text-catering-orange">
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link to="/vendor/benefits" className="text-sm text-gray-600 hover:text-catering-orange">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/vendor/success-stories" className="text-sm text-gray-600 hover:text-catering-orange">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/vendor/resources" className="text-sm text-gray-600 hover:text-catering-orange">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-catering-orange">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-catering-orange">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-catering-orange">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} E-CateringBook. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-catering-orange">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-catering-orange">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-catering-orange">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
