<template>
  <q-page padding>
    <div class="text-h4 text-center text-weight-bold q-mb-md">NUEVO ANUNCIO</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat bordered class="q-pa-md q-mb-md">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-md">Estado:</span>
            <q-option-group
              v-model="anuncio.nuevo"
              :options="estados"
              type="radio"
              inline
              class="inline-block"
            />
          </div>

          <q-input v-model="anuncio.marca" label="Marca" outlined dense class="q-mb-sm" />
          <q-input v-model="anuncio.modelo" label="Modelo" outlined dense class="q-mb-sm" />
          <q-input
            v-model.number="anuncio.pantalla"
            label="Pantalla"
            type="number"
            suffix="Pulgadas"
            outlined
            dense
            class="q-mb-sm"
          />
          <q-select
            v-model="anuncio.sistema"
            :options="sistemas"
            label="Sistema"
            outlined
            dense
            class="q-mb-sm"
          />
          <q-input
            v-model.number="anuncio.rom"
            label="ROM (almacenamiento interno)"
            type="number"
            suffix="GB"
            outlined
            dense
            class="q-mb-sm"
          />
          <q-input
            v-model.number="anuncio.ram"
            label="RAM"
            type="number"
            suffix="GB"
            outlined
            dense
          />
        </q-card>

        <q-card flat bordered class="q-pa-md">
          <div class="text-caption text-grey-7 q-mb-sm">Imágenes</div>

          <input
            ref="inputArchivo"
            type="file"
            accept="image/*"
            style="display: none"
            @change="agregarImagen"
          />

          <div class="row q-col-gutter-md items-start">
            <div class="col-auto column q-gutter-sm">
              <q-btn round color="primary" icon="mdi-plus" @click="inputArchivo.click()" />
              <q-btn
                round
                color="primary"
                icon="mdi-minus"
                :disable="seleccionada === -1"
                @click="quitarImagen"
              />
            </div>

            <div class="col">
              <q-markup-table flat dense>
                <thead>
                  <tr>
                    <th class="text-left">N</th>
                    <th class="text-left">Tamaño</th>
                    <th class="text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(img, i) in imagenes"
                    :key="img.url"
                    class="cursor-pointer"
                    :class="{ 'bg-red-1': i === seleccionada }"
                    @click="seleccionada = i"
                  >
                    <td>{{ i + 1 }}</td>
                    <td>{{ img.tamano }} kb</td>
                    <td>{{ img.tipo }}</td>
                  </tr>
                  <tr v-if="imagenes.length === 0">
                    <td colspan="3" class="text-grey-6">Sin imágenes</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>

            <div class="col-12 col-sm-5">
              <q-img
                v-if="imagenes[seleccionada]"
                :src="imagenes[seleccionada].url"
                :ratio="1"
                fit="contain"
                class="bordered"
              />
              <div
                v-else
                class="flex flex-center bg-grey-3 text-grey-6"
                style="aspect-ratio: 1; border: 1px solid #bbb"
              >
                <q-icon name="mdi-image-outline" size="48px" />
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <div class="text-weight-bold q-mb-xs">Título breve del anuncio</div>
        <q-input v-model="anuncio.titulo" maxlength="80" outlined dense class="q-mb-md" />

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6">
            <q-input v-model="anuncio.vendedor" label="Vendedor" outlined dense />
          </div>
          <div class="col-12 col-sm-6">
            <q-input v-model="anuncio.telefono" label="Teléfono" mask="####-####" outlined dense />
          </div>
        </div>

        <div class="text-weight-bold q-mb-xs">DESCRIPCIÓN</div>
        <q-input v-model="anuncio.descripcion" type="textarea" rows="6" outlined class="q-mb-md" />

        <q-card flat bordered class="q-pa-md q-mb-md" style="max-width: 250px">
          <div class="text-caption text-grey-7 q-mb-sm">PRECIO</div>
          <q-input v-model.number="anuncio.precio" type="number" prefix="$" outlined dense />
        </q-card>

        <div class="row q-gutter-md">
          <q-btn
            outline
            color="grey-8"
            icon="mdi-close-circle"
            label="Cancelar"
            @click="cancelar"
          />
          <q-btn color="red-13" icon="mdi-content-save" label="Crear" @click="crear" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProductosStore } from '@/stores/productos'

const router = useRouter()
const $q = useQuasar()
const store = useProductosStore()

const anuncio = ref({
  nuevo: true,
  marca: '',
  modelo: '',
  pantalla: null,
  sistema: null,
  rom: null,
  ram: null,
  titulo: '',
  vendedor: '',
  telefono: '',
  descripcion: '',
  precio: null,
})

const estados = [
  { label: 'Nuevo', value: true },
  { label: 'Usado', value: false },
]
const sistemas = ['Android', 'iOS', 'Windows']

// Imágenes
const inputArchivo = ref(null)
const imagenes = ref([])
const seleccionada = ref(-1)

function agregarImagen(evento) {
  const archivo = evento.target.files[0]
  if (!archivo) return
  imagenes.value.push({
    tamano: Math.round(archivo.size / 1024),
    tipo: archivo.type.split('/')[1],
    url: URL.createObjectURL(archivo),
  })
  seleccionada.value = imagenes.value.length - 1
  evento.target.value = '' // permite volver a elegir el mismo archivo
}

function quitarImagen() {
  if (seleccionada.value === -1) return
  URL.revokeObjectURL(imagenes.value[seleccionada.value].url)
  imagenes.value.splice(seleccionada.value, 1)
  seleccionada.value = imagenes.value.length - 1
}

// Botones
function cancelar() {
  router.push('/')
}

function crear() {
  if (!anuncio.value.titulo || !anuncio.value.precio) {
    $q.notify({ message: 'Falta el título o el precio', color: 'negative' })
    return
  }

  // La primera imagen de la lista es la que se muestra en la tarjeta
  store.agregar(anuncio.value, imagenes.value[0]?.url)

  $q.notify({
    message: 'Anuncio guardado satisfactoriamente',
    color: 'positive',
    icon: 'mdi-check-circle',
    position: 'top',
    timeout: 2500,
  })
  router.push('/')
}
</script>
