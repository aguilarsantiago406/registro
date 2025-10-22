import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/profile');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* CAMBIO ESTRUCTURAL: Tarjeta más ancha (max-w-3xl) y con layout flex horizontal (md:flex) */}
      <Card className="w-full max-w-3xl shadow-xl overflow-hidden md:flex">
        
        {/* Panel Izquierdo: Bienvenida (Oculto en móvil) */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center p-8 lg:p-12 bg-card-foreground/5">
          <ShieldCheck className="h-16 w-16 text-primary mb-6" />
          <h1 className="text-3xl font-bold mb-4">Bienvenido de Nuevo</h1>
          <p className="text-muted-foreground text-lg">
            Accede a tu cuenta para gestionar tus proyectos y perfil.
          </p>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-3xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CAMBIO ESTRUCTURAL: Se elimina CardContent y CardFooter para un flujo de formulario simple */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 text-base" // Campo más grande
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 text-base" // Campo más grande
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold" // Botón más grande
              disabled={isLoading}
            >
              {isLoading ? (
                'Iniciando sesión...'
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-8">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};