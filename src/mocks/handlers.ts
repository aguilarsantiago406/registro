import { http, HttpResponse, delay } from 'msw';
import { mockProducts, findProductById } from './products.data'; 

export const handlers = [

 
  http.get('/api/products', async () => {
    await delay(800);
    return HttpResponse.json({ 
      data: mockProducts
    }); 
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    const product = findProductById(id as string);
    
    if (product) {
      return HttpResponse.json({ 
        data: product 
      });
    } else {
      return HttpResponse.json(
        { message: 'Producto no encontrado' }, 
        { status: 404 }
      );
    }
  }),

  http.post('/api/contact', async ({ request }) => {
    await delay(1000);
    
    if (Math.random() < 0.2) {
      return HttpResponse.json(
        { 
          success: false,
          message: 'El servidor está ocupado. Intente más tarde.' 
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    const spreadableBody = (typeof body === 'object' && body !== null && !Array.isArray(body)) 
      ? body 
      : { payload: body }; 
    
    return HttpResponse.json({
      success: true,
      message: 'Mensaje recibido correctamente',
      data: {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...spreadableBody
      }
    }, { status: 201 });
  }),
];