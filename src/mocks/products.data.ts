export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Guitarra Acústica Fender FA-125",
    price: 149.99,
    description: "Una guitarra acorazada de sonido excelente con todo lo que necesitas para empezar a tocar.",
    category: "Instrumentos de Cuerda",
    image: "https://tse2.mm.bing.net/th/id/OIP.e_pk3GQBnqjf7b3pBLflowHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" 
  },
  {
    id: 2,
    title: "Teclado Digital Yamaha P-45",
    price: 499.99,
    description: "Piano digital de 88 teclas con acción de martillo graduada (GHS) y 10 voces estéreo.",
    category: "Teclados y Pianos",
    image: "https://tse2.mm.bing.net/th/id/OIP.hg9-TrAbiS_nrSCQSWJG8gHaDx?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 3,
    title: "Micrófono de Condensador Audio-Technica AT2020",
    price: 99.00,
    description: "Ideal para estudios de proyectos/caseros. Manejo de altos niveles de presión sonora y un amplio rango dinámico.",
    category: "Estudio y Grabación",
    image: "https://www.audioproperu.com/wp-content/uploads/2020/03/Audio-Technica-AT2020-2.jpg"
  },
  {
    id: 4,
    title: "Batería Electrónica Alesis Nitro Mesh Kit",
    price: 379.00,
    description: "Kit de batería electrónica de 8 piezas con parches de malla silenciosos y sensibles.",
    category: "Batería y Percusión",
    image: "https://tse3.mm.bing.net/th/id/OIP.PaWTMVKw7fk_SGzaRmbMjwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 5,
    title: "Auriculares de Estudio Beyerdynamic DT 770 PRO",
    price: 159.00,
    description: "Auriculares de campo difuso para estudio, cerrados, 80 ohmios. Ideales para monitorización.",
    category: "Estudio y Grabación",
    image: "https://tse1.mm.bing.net/th/id/OIP.feXwdatuLpwOptDiRGIboAHaGs?rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];

export const findProductById = (id: string | number): Product | undefined => {
  const productId = parseInt(id as string, 10);
  return mockProducts.find(p => p.id === productId);
};