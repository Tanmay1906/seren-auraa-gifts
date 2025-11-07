import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
// Product detail page removed; product actions are available from the shop/product cards.
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./lib/auth/AuthContext";
import { ProtectedRoute } from "./lib/auth/ProtectedRoute";

const queryClient = new QueryClient();

// Wrapper component for protected routes
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<About />} />
    
  {/* Protected routes */}
  <Route element={<ProtectedRoute><Shop /></ProtectedRoute>} path="/shop" />
  {/* Product detail route removed: product cards expose cart/wishlist actions inline */}
  <Route element={<ProtectedRoute><Checkout /></ProtectedRoute>} path="/checkout" />
  <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path="/profile" />
    
    {/* 404 - Not Found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
