import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, Store } from 'lucide-react';

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

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <User className="h-4 w-4 mr-2" />
                {user?.user_name || 'Perfil'}
              </Link>
            </Button>
            
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
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