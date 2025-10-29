import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout"; 
import { Login } from "./features/auth/pages/Login";
import { Register } from "./features/auth/pages/Register";
import { Profile } from "./features/profile/pages/Profile";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact"; 
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout /> 
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* --- RUTA CATCH-ALL (404) --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;