<template>
  <q-layout view="LHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-14 text-white">
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
        <q-btn push label="Inicio" to="/" icon="home" color="bg-red-5" />
        <q-btn push label="Estadísticas" to="/StatisticsPage" icon="timeline" />
        <q-btn push round to="/addProductPage" icon="mdi-plus" text-color="dark" color="teal-3" />
        <q-btn flat round to="/ShoppingCart" icon="shopping_cart">
          <q-badge rounded color="blue" floating>1</q-badge></q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-toggle v-model="valuenuevo" color="red">Nuevo</q-toggle>

        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Marca</div>
          </q-card-section>

          <q-card-section class="column q-pt-none">
            <q-checkbox v-model="valuesamsung" color="red">
              Samsung
              <q-badge color="grey-7" outline class="q-ml-xs">15</q-badge>
            </q-checkbox>
            <q-checkbox v-model="valuehuawei" color="red"
              >Huawei
              <q-badge color="grey-7" outline class="q-ml-xs">10</q-badge>
            </q-checkbox>
            <q-checkbox v-model="valuenokia" color="red"
              >Nokia
              <q-badge color="grey-7" outline class="q-ml-xs">56</q-badge>
            </q-checkbox>
            <q-checkbox v-model="valueiphone" color="red"
              >iPhone
              <q-badge color="grey-7" outline class="q-ml-xs">4</q-badge>
            </q-checkbox>
            <q-checkbox v-model="valuexiaomi" color="red"
              >Xiaomi
              <q-badge color="grey-7" outline class="q-ml-xs">4</q-badge>
            </q-checkbox>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Sistema</div>
          </q-card-section>

          <q-card-section class="column q-pt-none">
            <q-checkbox v-model="valueandroidquince" color="red">Android 15</q-checkbox>
            <q-checkbox v-model="valuewindowsdiez" color="red">Windows 10</q-checkbox>
            <q-checkbox v-model="valueios56" color="red">iOS 56</q-checkbox>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="q-my-sm">
          <q-card-section class="q-pb-none">
            <div class="text-caption text-grey-7">Pantalla</div>
          </q-card-section>

          <q-card-section class="column q-pt-none">
            <q-checkbox v-model="valuep6" color="red">6.0</q-checkbox>
            <q-checkbox v-model="valuep55" color="red">5.5</q-checkbox>
            <q-checkbox v-model="valuep5" color="red">5</q-checkbox>
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

const leftDrawerOpen = ref(false)
const busqueda = ref('')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const valuenuevo = ref(false)
const valuesamsung = ref(false)
const valuehuawei = ref(false)
const valuenokia = ref(false)
const valueiphone = ref(false)
const valuexiaomi = ref(false)
const valueandroidquince = ref(false)
const valuewindowsdiez = ref(false)
const valueios56 = ref(false)
const valuep6 = ref(false)
const valuep55 = ref(false)
const valuep5 = ref(false)
</script>
