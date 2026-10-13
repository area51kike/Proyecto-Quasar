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
        <q-card flat bordered class="column full-height">
          <q-img :src="producto.imagen" :ratio="1" fit="contain" />
          <q-card-section class="text-center col">
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
import { storeToRefs } from 'pinia'
import { useFiltrosStore } from '@/stores/filtros'
import { useProductosStore } from '@/stores/productos'

const store = useProductosStore()
const filtros = useFiltrosStore()
const { busqueda, soloNuevos, marcas, sistemas, pantallas } = storeToRefs(filtros)

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

const pagina = ref(1)
const porPagina = ref(25)
const opcionesPorPagina = [4, 8, 25, 50]

const productosFiltrados = computed(() => {
  let lista = store.productos.filter((p) => {
    const desde = precioDesde.value === '' ? 0 : Number(precioDesde.value)
    const hasta = precioHasta.value === '' ? Infinity : Number(precioHasta.value)
    const texto = busqueda.value.toLowerCase()

    return (
      p.precio >= desde &&
      p.precio <= hasta &&
      (!soloNuevos.value || p.nuevo) &&
      (marcas.value.length === 0 || marcas.value.includes(p.marca)) &&
      (sistemas.value.length === 0 || sistemas.value.includes(p.sistema)) &&
      (pantallas.value.length === 0 || pantallas.value.includes(p.pantalla)) &&
      p.descripcion.toLowerCase().includes(texto)
    )
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

watch(
  [
    precioDesde,
    precioHasta,
    campoOrden,
    direccionOrden,
    porPagina,
    busqueda,
    soloNuevos,
    marcas,
    sistemas,
    pantallas,
  ],
  () => {
    pagina.value = 1
  },
)
</script>
