import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 3000, 
});

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    createdAt: string;
  };
}

const trackMetric = (metric: { ok: boolean, latency?: number }) => {
  if (metric.ok) {
    console.log(`%c[Métrica] Envío OK - Latencia: ${metric.latency?.toFixed(0)}ms`, 'color: green');
  } else {
    console.log(`%c[Métrica] Envío Fallido`, 'color: red');
  }
};

export const sendContact = async (
  data: ContactFormData, 
  idempotencyKey: string
): Promise<ContactResponse> => {
  
  const maxRetries = 2;
  let attempt = 0;
  const headers = {
    'Idempotency-Key': idempotencyKey, 
  };

  while (attempt <= maxRetries) {
    try {
      const t0 = performance.now(); 
      
      const res = await api.post("/contact", data, { headers });
      
      const t1 = performance.now(); 
      trackMetric({ ok: true, latency: t1 - t0 }); 
      
      return res.data;

    } catch (err: unknown) {
      attempt++; 
      trackMetric({ ok: false });

      if (attempt > maxRetries) {
        console.error("Envío fallido después de", maxRetries, "reintentos.");
        throw err; 
      }

      const delay = 500 * attempt; 
      console.warn(
        `Intento ${attempt} fallido. Reintentando en ${delay}ms...`
      );
      await new Promise(r => setTimeout(r, delay));
    }
  }
  
  throw new Error("Fallo inesperado en el envío de contacto");
};