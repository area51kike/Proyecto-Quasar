import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([
    {
      id: 1,
      marca: 'Samsung',
      sistema: 'Android',
      pantalla: 5.5,
      nuevo: true,
      precio: 132,
      fecha: '2026-10-01',
      descripcion: 'Samsung J6, Pantalla de 5.5, 64GB, 2GB Ram, Color Negro',
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_797468-MLU78128740857_082024-O.webp',
    },
    {
      id: 2,
      marca: 'Huawei',
      sistema: 'Android',
      pantalla: 6.0,
      nuevo: true,
      precio: 90,
      fecha: '2026-09-28',
      descripcion: 'Huawei Y6, Pantalla de 6.0, 32GB, 2GB Ram, Color Azul',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFi74rkEPnxAagBsZ0Y2urJajOREXSg7sdYHDr4eQeMSGcGFARK1UKnGRy&s=10',
    },
    {
      id: 3,
      marca: 'Nokia',
      sistema: 'Windows',
      pantalla: 5,
      nuevo: false,
      precio: 150,
      fecha: '2026-09-20',
      descripcion: 'Nokia Lumia, Pantalla de 5, 16GB, 1GB Ram, Color Blanco',
      imagen: 'https://i.blogs.es/3433b7/nokia-20lumia-20505-1/450_1000.webp',
    },
    {
      id: 4,
      marca: 'iPhone',
      sistema: 'iOS',
      pantalla: 6.0,
      nuevo: true,
      precio: 800,
      fecha: '2026-10-05',
      descripcion: 'iPhone 11, Pantalla de 6.0, 128GB, 4GB Ram, Color Negro',
      imagen:
        'https://www.radioshackla.com/media/catalog/product/4/6/461525800016_2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    },
    {
      id: 5,
      marca: 'Xiaomi',
      sistema: 'Android',
      pantalla: 5.5,
      nuevo: false,
      precio: 110,
      fecha: '2026-08-15',
      descripcion: 'Xiaomi Redmi, Pantalla de 5.5, 64GB, 3GB Ram, Color Gris',
      imagen: 'https://thumbs.ielectro.es/product/med/95364.webp',
    },
    {
      id: 6,
      marca: 'Samsung',
      sistema: 'Android',
      pantalla: 6.0,
      nuevo: true,
      precio: 320,
      fecha: '2026-10-08',
      descripcion: 'Samsung A32, Pantalla de 6.0, 128GB, 4GB Ram, Color Blanco',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7NzP7WeSHfUG5EzdcU8_Rpcjq1aRS_7xbjyjqO6jOSw&s=10',
    },
    {
      id: 7,
      marca: 'Nokia',
      sistema: 'Android',
      pantalla: 5,
      nuevo: false,
      precio: 75,
      fecha: '2026-07-30',
      descripcion: 'Nokia 2.3, Pantalla de 5, 32GB, 2GB Ram, Color Verde',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGTmzGHdReNKQ72c5TJ75N5oznv_44B4Z54Ec-SyYnXA&s=10',
    },
    {
      id: 8,
      marca: 'Huawei',
      sistema: 'Android',
      pantalla: 5.5,
      nuevo: true,
      precio: 210,
      fecha: '2026-09-10',
      descripcion: 'Huawei P20, Pantalla de 5.5, 64GB, 4GB Ram, Color Dorado',
      imagen:
        'https://images-na.ssl-images-amazon.com/images/I/71LnIsqrcjL._AC_UL495_SR435,495_.jpg',
    },
  ])
  function agregar(anuncio, imagen) {
    const nuevoId = Math.max(0, ...productos.value.map((p) => p.id)) + 1
    productos.value.push({
      ...anuncio,
      id: nuevoId,
      fecha: new Date().toISOString().slice(0, 10),
      descripcion: anuncio.titulo, // la tarjeta muestra este texto
      detalle: anuncio.descripcion, // descripción larga del formulario
      imagen: imagen || 'https://placehold.co/400x400?text=Sin+imagen',
    })
  }

  return { productos, agregar }
})
