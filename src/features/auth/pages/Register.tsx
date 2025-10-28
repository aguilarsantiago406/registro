import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/features/auth/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, Lock, UserPlus, FileText } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      const registerData = {
        document_number: formData.document_number,
        name: formData.name,
        paternal_lastname: formData.paternal_lastname,
        maternal_lastname: formData.maternal_lastname,
        email: formData.email,
        phone: formData.phone,
        user_name: formData.user_name,
        password: formData.password,
        last_session: new Date().toISOString().split('T')[0],
        account_statement: true,
        document_type_id: 1, 
        country_id: 179,
      };

      await authService.register(registerData);
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (error: any) {
      console.error('Register error:', error);
      
      if (error.response && error.response.data) {
        const errors = error.response.data;
        
        if (typeof errors === 'object' && !errors.message && Object.keys(errors).length > 0) {
          const firstErrorKey = Object.keys(errors)[0];
          const firstErrorMessage = Array.isArray(errors[firstErrorKey]) ? errors[firstErrorKey][0] : errors[firstErrorKey];
          toast.error(`Error: ${firstErrorMessage}`);
      
        } else if (errors.message) {
          toast.error(errors.message);
        
        } else {
          toast.error('Error al registrar usuario. Intente más tarde.');
        }
      } else {
        toast.error('No se pudo conectar al servidor.');
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4 py-8">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
          <CardDescription className="text-center">
            Completa el formulario para registrarte
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="document_number">Número de Documento</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="document_number"
                    name="document_number"
                    placeholder="12345678"
                    value={formData.document_number}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                    type="tel"
                    minLength={8}
                    maxLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paternal_lastname">Apellido Paterno</Label>
                <Input
                  id="paternal_lastname"
                  name="paternal_lastname"
                  placeholder="Pérez"
                  value={formData.paternal_lastname}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maternal_lastname">Apellido Materno</Label>
                <Input
                  id="maternal_lastname"
                  name="maternal_lastname"
                  placeholder="García"
                  value={formData.maternal_lastname}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="999888777"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                    type="tel"
                    minLength={9}
                    maxLength={9}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_name">Nombre de Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="user_name"
                    name="user_name"
                    placeholder="juanperez"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                'Registrando...'
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Registrarse
                </>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};