<template>
  <q-layout view="LHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-14 text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink>
          <q-icon name="campaign" size="lg" /> Tienda CellPhone</q-toolbar-title
        >
        <q-input
          v-model="filtros.busqueda"
          style="width: 100%; min-width: 150px; max-width: 800px"
          dense
          debounce="300"
          placeholder="Buscar..."
          outlined
          rounded
          bg-color="white"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn push label="Inicio" to="/" icon="home" color="red-13" />
        <q-btn push label="Estadísticas" to="/StatisticsPage" icon="timeline" color="red-13" />
        <q-btn push round to="/addProductPage" icon="mdi-plus" text-color="dark" color="teal-3" />
        <q-btn flat round to="/ShoppingCart" icon="shopping_cart">
          <q-badge rounded color="blue" floating>1</q-badge></q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-toggle v-model="filtros.soloNuevos" color="red" label="Nuevo" />

        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Marca</div>
          </q-card-section>
          <q-card-section class="column q-pt-none">
            <q-checkbox v-for="m in marcas" :key="m" v-model="filtros.marcas" :val="m" color="red">
              {{ m }}
              <q-badge color="grey-7" outline class="q-ml-xs">{{ contar(m) }}</q-badge>
            </q-checkbox>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Sistema</div>
          </q-card-section>
          <q-card-section class="column q-pt-none">
            <q-checkbox
              v-for="s in sistemas"
              :key="s"
              v-model="filtros.sistemas"
              :val="s"
              :label="s"
              color="red"
            />
          </q-card-section>
        </q-card>

        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Pantalla</div>
          </q-card-section>
          <q-card-section class="column q-pt-none">
            <q-checkbox
              v-for="p in pantallas"
              :key="p"
              v-model="filtros.pantallas"
              :val="p"
              :label="String(p)"
              color="red"
            />
          </q-card-section>
        </q-card>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useFiltrosStore } from '@/stores/filtros'
import { useProductosStore } from '@/stores/productos'

const filtros = useFiltrosStore()
const productos = useProductosStore()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const marcas = ['Samsung', 'Huawei', 'Nokia', 'iPhone', 'Xiaomi']
const sistemas = ['Android', 'iOS', 'Windows']
const pantallas = [6, 5.5, 5]

function contar(marca) {
  return productos.productos.filter((p) => p.marca === marca).length
}
</script>
