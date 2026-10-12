<template>
  <q-page padding>
    <div class="row justify-center q-gutter-md">
      <q-card flat bordered class="q-pa-sm">
        <div class="row items-center justify-center q-gutter-sm">
          <span>Precio:</span>
          <q-input
            v-model="precioDesde"
            type="number"
            prefix="$"
            outlined
            dense
            style="width: 100px"
          />
          <span>Hasta:</span>
          <q-input
            v-model="precioHasta"
            type="number"
            prefix="$"
            outlined
            dense
            style="width: 100px"
          />
        </div>
      </q-card>

      <q-card flat bordered class="q-pa-sm">
        <div class="row items-center justify-center q-gutter-sm">
          <span>Ordenar por:</span>
          <q-btn
            :color="campoOrden === 'precio' ? 'red-13' : 'grey-6'"
            :icon="
              campoOrden !== 'precio'
                ? ''
                : direccionOrden === 'desc'
                  ? 'mdi-arrow-up'
                  : 'mdi-arrow-down'
            "
            label="Precio"
            @click="ordenarPor('precio')"
          />
          <q-btn
            :color="campoOrden === 'fecha' ? 'red-13' : 'grey-6'"
            :icon="
              campoOrden !== 'fecha'
                ? ''
                : direccionOrden === 'desc'
                  ? 'mdi-arrow-up'
                  : 'mdi-arrow-down'
            "
            label="Fecha"
            @click="ordenarPor('fecha')"
          />
        </div>
      </q-card>
    </div>

    <div class="row q-col-gutter-md q-mt-md">
      <div v-for="producto in productosPagina" :key="producto.id" class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered>
          <q-img :src="producto.imagen" />
          <q-card-section class="text-center">
            <div class="text-weight-bold">${{ producto.precio.toFixed(2) }}</div>
            <div>{{ producto.descripcion }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row items-center justify-center q-gutter-md q-mt-md">
      <q-pagination
        v-model="pagina"
        :max="totalPaginas"
        :max-pages="7"
        direction-links
        boundary-links
        color="red-13"
      />
      <div class="row items-center q-gutter-sm">
        <span>Artículos por página:</span>
        <q-select
          v-model="porPagina"
          :options="opcionesPorPagina"
          outlined
          dense
          style="width: 90px"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const precioDesde = ref('')
const precioHasta = ref('')
const campoOrden = ref('precio')
const direccionOrden = ref('asc')

function ordenarPor(campo) {
  if (campo === campoOrden.value) {
    direccionOrden.value = direccionOrden.value === 'asc' ? 'desc' : 'asc'
  } else {
    campoOrden.value = campo
    direccionOrden.value = 'asc'
  }
}

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
    imagen: 'https://picsum.photos/300/200?random=1',
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
    imagen: 'https://picsum.photos/300/200?random=2',
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
    imagen: 'https://picsum.photos/300/200?random=3',
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
    imagen: 'https://picsum.photos/300/200?random=4',
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
    imagen: 'https://picsum.photos/300/200?random=5',
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
    imagen: 'https://picsum.photos/300/200?random=6',
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
    imagen: 'https://picsum.photos/300/200?random=7',
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
    imagen: 'https://picsum.photos/300/200?random=8',
  },
])

const pagina = ref(1)
const porPagina = ref(25)
const opcionesPorPagina = [4, 8, 25, 50]

const productosFiltrados = computed(() => {
  let lista = productos.value.filter((p) => {
    const desde = precioDesde.value === '' ? 0 : Number(precioDesde.value)
    const hasta = precioHasta.value === '' ? Infinity : Number(precioHasta.value)
    return p.precio >= desde && p.precio <= hasta
  })

  lista = [...lista].sort((a, b) => {
    const resultado =
      campoOrden.value === 'precio' ? a.precio - b.precio : a.fecha.localeCompare(b.fecha)
    return direccionOrden.value === 'desc' ? -resultado : resultado
  })

  return lista
})

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(productosFiltrados.value.length / porPagina.value)),
)

const productosPagina = computed(() => {
  const inicio = (pagina.value - 1) * porPagina.value
  const fin = inicio + porPagina.value
  return productosFiltrados.value.slice(inicio, fin)
})

// Si cambian los filtros, el orden o los artículos por página, volver a la página 1
watch([precioDesde, precioHasta, campoOrden, direccionOrden, porPagina], () => {
  pagina.value = 1
})
</script>
