import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LogOut, Mail, Phone, User, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada exitosamente');
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (!user) {
    return null;
  }

  const getInitials = () => {
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen p-4 py-8">
      {/* CAMBIO ESTRUCTURAL: Layout de Grid (1 col en móvil, 3 en desktop) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Perfil y Acciones */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-lg text-muted-foreground">@{user.user_name}</p>
              <Badge variant="secondary" className="text-sm px-4 py-2 mt-4">
                <Shield className="mr-2 h-4 w-4" />
                {user.role.name}
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Información detallada */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CAMBIO ESTRUCTURAL: Ítems de lista rediseñados con icono acentuado */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base font-semibold">{user.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                  <p className="text-base font-semibold">{user.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID de Usuario</p>
                  <p className="text-base font-semibold">{user.id}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">País</p>
                  <p className="text-base font-semibold">{user.country.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};