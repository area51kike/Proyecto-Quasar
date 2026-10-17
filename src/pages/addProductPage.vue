<template>
  <q-page padding>
    <div class="text-h4 text-center text-weight-bold q-mb-md gt-sm">NUEVO ANUNCIO</div>

    <!-- Selector de archivos (uno solo, lo usan escritorio y celular) -->
    <input
      ref="inputArchivo"
      type="file"
      accept="image/*"
      style="display: none"
      @change="agregarImagen"
    />

    <div class="form-grid">
      <!-- Columna izquierda (escritorio) -->
      <div class="form-col">
        <q-card flat bordered class="q-pa-md b-specs">
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

        <q-card flat bordered class="q-pa-md b-fotos">
          <div class="text-caption text-grey-7 q-mb-sm">Imágenes</div>

          <!-- Celular y tablet: tira de fotos con el botón "Agregar Foto" -->
          <div class="fotos-mobile lt-md">
            <div
              class="foto-tile column flex-center text-center cursor-pointer bordered-tile"
              @click="inputArchivo.click()"
            >
              <q-icon name="mdi-plus-circle" size="48px" color="grey-8" />
              <div class="text-caption q-mt-xs">Agregar Foto</div>
            </div>

            <div v-for="(img, i) in imagenes" :key="img.url" class="foto-tile">
              <q-img :src="img.url" :ratio="1" fit="cover" class="fit rounded-borders" />
              <q-btn
                round
                dense
                size="sm"
                color="negative"
                icon="mdi-close"
                class="absolute-top-right q-ma-xs"
                aria-label="Quitar foto"
                @click="quitarImagenEn(i)"
              />
            </div>
          </div>

          <!-- Escritorio: tabla de imágenes con + y - -->
          <div class="row q-col-gutter-md items-start gt-sm">
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

      <!-- Columna derecha (escritorio) -->
      <div class="form-col">
        <div class="b-titulo">
          <div class="text-weight-bold q-mb-xs">Título breve del anuncio</div>
          <q-input
            v-model="anuncio.titulo"
            type="textarea"
            autogrow
            maxlength="80"
            input-class="text-weight-bold"
            outlined
            dense
          />
        </div>

        <div class="contacto b-contacto">
          <q-input v-model="anuncio.vendedor" label="Vendedor" outlined dense />
          <q-input v-model="anuncio.telefono" label="Teléfono" mask="####-####" outlined dense />
        </div>

        <div class="b-desc">
          <div class="text-weight-bold q-mb-xs">DESCRIPCIÓN</div>
          <q-input v-model="anuncio.descripcion" type="textarea" rows="6" outlined />
        </div>

        <q-card flat bordered class="q-pa-md card-precio b-precio">
          <div class="text-caption text-grey-7 q-mb-sm">PRECIO</div>
          <q-input
            v-model.number="anuncio.precio"
            type="number"
            prefix="$"
            :input-class="$q.screen.lt.md ? 'text-h5 text-weight-bold text-italic' : ''"
            outlined
            dense
          />
        </q-card>

        <div class="row b-botones" :class="$q.screen.lt.md ? 'justify-around' : 'q-gutter-md'">
          <q-btn
            outline
            color="grey-8"
            icon="mdi-close-circle"
            label="Cancelar"
            @click="cancelar"
          />
          <q-btn
            color="red-13"
            icon="mdi-content-save"
            :label="$q.screen.lt.md ? 'Crear Anuncio' : 'Crear'"
            :loading="guardando"
            @click="crear"
          />
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
const guardando = ref(false)

function agregarImagen(evento) {
  const archivo = evento.target.files[0]
  if (!archivo) return
  imagenes.value.push({
    tamano: Math.round(archivo.size / 1024),
    tipo: archivo.type.split('/')[1],
    url: URL.createObjectURL(archivo),
    archivo, // el File real, para subirlo a CouchDB
  })
  seleccionada.value = imagenes.value.length - 1
  evento.target.value = '' // permite volver a elegir el mismo archivo
}

// Quita la imagen que está en la posición i (botón X de cada foto en celular)
function quitarImagenEn(i) {
  if (i < 0 || i >= imagenes.value.length) return
  URL.revokeObjectURL(imagenes.value[i].url)
  imagenes.value.splice(i, 1)
  seleccionada.value = imagenes.value.length - 1
}

// Quita la imagen seleccionada (botón - en escritorio)
function quitarImagen() {
  quitarImagenEn(seleccionada.value)
}

// Botones
function cancelar() {
  router.push('/')
}

async function crear() {
  if (!anuncio.value.titulo || !anuncio.value.precio) {
    $q.notify({ message: 'Falta el título o el precio', color: 'negative' })
    return
  }

  guardando.value = true
  try {
    // Se guarda el anuncio y todas las imágenes de la lista como attachments
    await store.agregar(
      anuncio.value,
      imagenes.value.map((img) => img.archivo),
    )

    $q.notify({
      message: 'Anuncio guardado satisfactoriamente',
      color: 'positive',
      icon: 'mdi-check-circle',
      position: 'top',
      timeout: 2500,
    })
    router.push('/')
  } catch (error) {
    console.error(error)
    $q.notify({
      message: `No se pudo guardar el anuncio (${error.response?.status ?? error.message})`,
      color: 'negative',
    })
  } finally {
    guardando.value = false
  }
}
</script>

<style scoped>
/* Escritorio: dos columnas */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.form-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contacto {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.card-precio {
  max-width: 250px;
}

/* Tira de fotos (celular y tablet) */
.fotos-mobile {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.foto-tile {
  position: relative;
  flex: 0 0 140px;
  width: 140px;
  height: 140px;
}

.bordered-tile {
  display: flex;
  border: 1px solid #bbb;
  border-radius: 4px;
}

/* Celular y tablet: una sola columna, en el orden del wireframe */
@media (max-width: 1023px) {
  .form-grid {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .form-col {
    display: contents;
  }

  .b-fotos {
    order: 1;
  }
  .b-titulo {
    order: 2;
  }
  .b-precio {
    order: 3;
  }
  .b-contacto {
    order: 4;
  }
  .b-specs {
    order: 5;
  }
  .b-desc {
    order: 6;
  }
  .b-botones {
    order: 7;
  }

  .card-precio {
    max-width: none;
  }
}
</style>
