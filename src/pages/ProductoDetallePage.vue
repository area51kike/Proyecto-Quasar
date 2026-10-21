<template>
  <q-page padding>
    <div v-if="producto">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-7">
          <q-carousel
            v-model="slide"
            animated
            swipeable
            arrows
            navigation
            infinite
            height="350px"
            class="bordered rounded-borders"
          >
            <q-carousel-slide v-for="(img, i) in imagenes" :key="i" :name="i" class="q-pa-none">
              <q-img :src="img" fit="contain" class="fit" />
            </q-carousel-slide>
          </q-carousel>
        </div>

        <div class="col-12 col-md-5">
          <div class="text-subtitle1 text-weight-bold">{{ producto.descripcion }}</div>
          <div class="text-h4 text-italic q-my-md">$ {{ producto.precio.toFixed(2) }}</div>

          <q-btn
            color="red-13"
            size="lg"
            icon="add_shopping_cart"
            label="Comprar"
            class="q-mb-md"
            @click="comprar"
          />

          <q-card flat bordered>
            <q-card-section class="row justify-between q-gutter-sm">
              <div>Vendedor: {{ producto.vendedor ?? 'No disponible' }}</div>
              <div>Teléfono: {{ producto.telefono ?? 'No disponible' }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="text-h5 text-center text-weight-bold q-my-lg">DESCRIPCIÓN</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered class="full-height">
            <q-card-section>
              <div>Estado: {{ producto.nuevo ? 'Nuevo' : 'Usado' }}</div>
              <div>Marca: {{ producto.marca }}</div>
              <div>Modelo: {{ producto.modelo ?? '—' }}</div>
              <div>Pantalla: {{ producto.pantalla }} pulgadas</div>
              <div>Sistema: {{ producto.sistema }}</div>
              <div>Rom: {{ producto.rom ? producto.rom + 'GB' : '—' }}</div>
              <div>Ram: {{ producto.ram ? producto.ram + 'GB' : '—' }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-6">
          <q-card flat bordered class="full-height">
            <q-card-section style="white-space: pre-line">
              {{ producto.detalle ?? producto.descripcion }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div v-else-if="store.cargando" class="flex flex-center q-pa-xl">
      <q-spinner color="red-13" size="40px" />
    </div>

    <div v-else class="text-center q-pa-xl">
      <div class="text-h6">Producto no encontrado</div>
      <q-btn flat color="red-13" label="Volver al inicio" to="/" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProductosStore } from '@/stores/productos'
import { useCarritoStore } from '@/stores/carrito'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const store = useProductosStore()
const carrito = useCarritoStore()

const slide = ref(0)

// Si recargas la página directamente en /producto/xxx, hay que volver a cargar de CouchDB
onMounted(() => store.cargar().catch((e) => console.error('No se pudo cargar', e)))

const producto = computed(() => store.porId(route.params.id))

const imagenes = computed(() => {
  const p = producto.value
  return p?.imagenes?.length ? p.imagenes : [p?.imagen]
})

function comprar() {
  carrito.agregar(producto.value)
  $q.notify({ message: 'Añadido al carrito', color: 'positive', icon: 'check', timeout: 1000 })
  router.push('/ShoppingCart')
}
</script>
