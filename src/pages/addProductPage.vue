<template>
  <q-page padding>
    <div justify-content="center">NUEVO ANUNCIO</div>
    <div class="q-pa-md">
      <div class="row justify-between q-gutter-sm">
        <div class="col-auto">
          <q-card class="q-pa-md" style="width: 300px; max-width: 100%">
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.sistema || 'Sistema'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="sistema in sistemas"
                    :key="sistema"
                    v-close-popup
                    clickable
                    @click="anuncio.sistema = sistema"
                  >
                    <q-item-section>
                      <q-item-label>{{ sistema }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.rom || 'ROM'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="rom in roms"
                    :key="rom"
                    v-close-popup
                    clickable
                    @click="anuncio.rom = rom"
                  >
                    <q-item-section>
                      <q-item-label>{{ rom }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.ram || 'RAM'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="ram in rams"
                    :key="ram"
                    v-close-popup
                    clickable
                    @click="anuncio.ram = ram"
                  >
                    <q-item-section>
                      <q-item-label>{{ ram }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.marca || 'Marca'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="marca in marcas"
                    :key="marca"
                    v-close-popup
                    clickable
                    @click="anuncio.marca = marca"
                  >
                    <q-item-section>
                      <q-item-label>{{ marca }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.pantalla || 'Pantalla'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="pantalla in pantallas"
                    :key="pantalla"
                    v-close-popup
                    clickable
                    @click="anuncio.pantalla = pantalla"
                  >
                    <q-item-section>
                      <q-item-label>{{ pantalla }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md">
              <q-btn-dropdown
                color="white"
                rounded
                text-color="black"
                :outline="true"
                :label="anuncio.estado || 'Estado'"
                aria-haspopup="menu"
              >
                <q-list role="menu">
                  <q-item
                    v-for="estado in estados"
                    :key="estado"
                    v-close-popup
                    clickable
                    @click="anuncio.estado = estado"
                  >
                    <q-item-section>
                      <q-item-label>{{ estado }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-card>
        </div>

        <!-- Tarjeta de la derecha -->
        <div class="col-auto">
          <q-card style="width: 300px; max-width: 0%">
            <q-card-section> Tarjeta Derecha </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row justify-between q-gutter-sm">
        <!-- Tarjeta de la izquierda -->
        <div class="col-auto">
          <q-card class="q-pa-md" style="width: 300px; max-width: 100%">
            <q-card-section class="q-pb-none">
              <div class="text-caption text-grey-7">Imagenes</div>
              <q-btn round icon="mdi-plus" color="primary" :size="'50px'" />
              <q-btn round icon="mdi-minus" color="primary" :size="'50px'" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Tarjeta de la derecha -->
        <div class="col-auto">
          <q-card style="width: 300px; max-width: 100%">
            <q-card-section> Tarjeta Derecha </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card style="width: 300px; max-width: 100%"> Esta va aca </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const anuncio = ref({
  estado: '',
  marca: '',
  modelo: '',
  pantalla: '',
  sistema: '',
  rom: '',
  ram: '',
})
const pantallas = ['6.0', '5.5', '5.5']
const marcas = ['Nokia', 'iPhone', 'Xiaomi', 'Samsung', 'Huawei']
const sistemas = ['Android 15', 'Windows 10', 'iOS 56']
const roms = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB']
const rams = ['1GB', '2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB']
const estados = ['Nuevo', 'Usado']
</script>
