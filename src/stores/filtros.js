import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFiltrosStore = defineStore('filtros', () => {
  const busqueda = ref('')
  const soloNuevos = ref(false)
  const marcas = ref([])
  const sistemas = ref([])
  const pantallas = ref([])

  return { busqueda, soloNuevos, marcas, sistemas, pantallas }
})
