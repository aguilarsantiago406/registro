import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, Store, Send } from 'lucide-react';

export const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-card border-b sticky top-0 z-10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          <Link to="/products" className="text-xl font-bold text-primary flex items-center gap-2">
            <Store className="h-6 w-6" />
            Mi Tienda
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact" className="flex items-center gap-1">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Contacto</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.user_name || 'Perfil'}</span>
              </Link>
            </Button>
            
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>
    </div>
  );
};