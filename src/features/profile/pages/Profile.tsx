import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Mail, Phone, Globe, Shield, Store } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="md:col-span-1 space-y-6">
          
          <Card className="flex flex-col items-center p-6 bg-card">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                {user ? getInitials(user.name) : 'UU'}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">@{user?.user_name}</p>
            {user?.role?.name === 'Admin' && (
              <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground">
                <Shield className="h-3 w-3 mr-1" />
                {user.role.name}
              </div>
            )}
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/products">
                  <Store className="mr-2 h-4 w-4" />
                  Ver Tienda
                </Link>
              </Button>

              <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-medium">{user?.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID de Usuario</p>
                  <p className="font-medium">{user?.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">País</p>
                  <p className="font-medium">{user?.country?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};