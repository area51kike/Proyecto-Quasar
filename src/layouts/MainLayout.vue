<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title shrink>
          <q-icon name="campaign" size="lg" /> Tienda CellPhone</q-toolbar-title
        >
        <q-input
          style="width: 100%; min-width: 150px; max-width: 1000px"
          dense
          debounce="300"
          v-model="busqueda"
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
        <q-btn push label="Inicio" to="/" icon="home" />
        <q-btn push label="Estadísticas" to="/StatisticsPage" icon="timeline" />
        <q-btn push round to="/addProduct" icon="add" />
        <q-btn flat round="Carrito" to="/ShoppingCart" icon="shopping_cart">
          <q-badge rounded color="red" floating>1</q-badge></q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item> </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const busqueda = ref('')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
