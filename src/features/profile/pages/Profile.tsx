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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-base">@{user.user_name}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shield className="mr-2 h-4 w-4" />
                {user.role.name}
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Información de Contacto</h3>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-base">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                      <p className="text-base">{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Información Adicional</h3>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID de Usuario</p>
                      <p className="text-base">{user.id}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">País</p>
                      <p className="text-base">{user.country.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
