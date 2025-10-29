import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { sendContact } from '../features/contact/api/contactApi';

// Componentes de Shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  subject: z.string().min(3, { message: "El asunto debe tener al menos 3 caracteres." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  consent: z.boolean().refine(value => value === true, {
    message: "Debes aceptar la política de privacidad."
  }),
});

type FormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const form = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormData) => {
    const idempotencyKey = crypto.randomUUID();
    
    try {
      const response = await sendContact(data, idempotencyKey);
      
      // ✅ Éxito
      form.reset();
      toast.success(`¡Mensaje recibido! (ID: ${response.data.id.substring(0, 6)})`);
      
    } catch (err: unknown) {
      // ❌ Error
      const error = err as { 
        response?: { 
          data?: { message?: string } 
        } 
      };
      const errorMsg = error.response?.data?.message || 'Error al enviar el mensaje';
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Contacto</CardTitle>
        <CardDescription>
          Formulario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField 
              control={form.control} 
              name="name" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control} 
              name="email" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control} 
              name="subject" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Asunto de tu mensaje" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control} 
              name="message" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escribe tu mensaje aquí..." 
                      {...field} 
                      rows={6} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control} 
              name="consent" 
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Acepto la política de privacidad
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Tus datos serán tratados de forma confidencial.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}