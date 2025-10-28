export const mockProducts = [
  {
    id: 1,
    title: "Guitarra Acústica Fender FA-125",
    price: 149.99,
    description: "Una guitarra acorazada de sonido excelente con todo lo que necesitas para empezar a tocar.",
    category: "Instrumentos de Cuerda",
    image: "https://m.media-amazon.com/images/I/71-081-638L._AC_SX466_.jpg" 
  },
  {
    id: 2,
    title: "Teclado Digital Yamaha P-45",
    price: 499.99,
    description: "Piano digital de 88 teclas con acción de martillo graduada (GHS) y 10 voces estéreo.",
    category: "Teclados y Pianos",
    image: "https://m.media-amazon.com/images/I/61+wrc-BaFL._AC_SX466_.jpg"
  },
  {
    id: 3,
    title: "Micrófono de Condensador Audio-Technica AT2020",
    price: 99.00,
    description: "Ideal para estudios de proyectos/caseros. Manejo de altos niveles de presión sonora y un amplio rango dinámico.",
    category: "Estudio y Grabación",
    image: "https://m.media-amazon.com/images/I/71pA8a-qr8L._AC_SX466_.jpg"
  },
  {
    id: 4,
    title: "Batería Electrónica Alesis Nitro Mesh Kit",
    price: 379.00,
    description: "Kit de batería electrónica de 8 piezas con parches de malla silenciosos y sensibles.",
    category: "Batería y Percusión",
    image: "https://m.media-amazon.com/images/I/71FYd4a-EaL._AC_SX466_.jpg"
  },
  {
    id: 5,
    title: "Auriculares de Estudio Beyerdynamic DT 770 PRO",
    price: 159.00,
    description: "Auriculares de campo difuso para estudio, cerrados, 80 ohmios. Ideales para monitorización.",
    category: "Estudio y Grabación",
    image: "https://m.media-amazon.com/images/I/71v1nQ-tqYL._AC_SY450_.jpg"
  }
];

export const findProductById = (id) => {
  const productId = parseInt(id, 10);
  return mockProducts.find(p => p.id === productId);
};