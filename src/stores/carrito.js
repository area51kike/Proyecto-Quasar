import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarritoStore = defineStore('carrito', () => {
  const items = ref([])

  const cantidadTotal = computed(() => items.value.reduce((s, i) => s + i.cantidad, 0))
  const total = computed(() => items.value.reduce((s, i) => s + i.precio * i.cantidad, 0))

  function agregar(producto) {
    const existente = items.value.find((i) => String(i.id) === String(producto.id))
    if (existente) {
      existente.cantidad++
    } else {
      items.value.push({
        id: producto.id,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      })
    }
  }

  function quitar(id) {
    items.value = items.value.filter((i) => String(i.id) !== String(id))
  }

  function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) return quitar(id)
    const item = items.value.find((i) => String(i.id) === String(id))
    if (item) item.cantidad = cantidad
  }

  function vaciar() {
    items.value = []
  }

  return { items, cantidadTotal, total, agregar, quitar, cambiarCantidad, vaciar }
})
