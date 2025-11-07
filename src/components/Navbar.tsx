import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group">
            <span className="text-2xl font-bold tracking-tight gradient-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 inline-block">
              SerenAuraa
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 transition-transform duration-300 group-hover:scale-100"></div>
            </Link>
            <Link to="/shop" className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group">
              <span className="relative z-10">Shop</span>
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 transition-transform duration-300 group-hover:scale-100"></div>
            </Link>
            <Link to="/about" className="relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 transition-transform duration-300 group-hover:scale-100"></div>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300 rounded-full px-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">{user?.email?.split('@')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 glass-effect border-border/50">
                    <DropdownMenuItem 
                      onClick={() => navigate('/profile')}
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart Button */}
                <Link to="/checkout">
                  <Button 
                    size="sm" 
                    className="relative bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 rounded-full h-10 w-10 p-0"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm font-medium hover:bg-primary/10 transition-all duration-300 rounded-full px-6"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-primary/10 transition-all duration-300 rounded-full h-10 w-10 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-in slide-in-from-top duration-300">
            <Link 
              to="/" 
              className="block px-4 py-3 text-sm font-medium hover:bg-primary/10 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block px-4 py-3 text-sm font-medium hover:bg-primary/10 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-3 text-sm font-medium hover:bg-primary/10 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;