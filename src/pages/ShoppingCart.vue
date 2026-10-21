<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Carrito</div>

    <div v-if="carrito.items.length === 0" class="text-grey-7">
      Tu carrito está vacío.
      <q-btn flat color="red-13" label="Ir a la tienda" to="/" />
    </div>

    <div v-else>
      <q-list bordered separator>
        <q-item v-for="item in carrito.items" :key="item.id">
          <q-item-section avatar>
            <q-img :src="item.imagen" fit="contain" style="width: 64px; height: 64px" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="2">{{ item.descripcion }}</q-item-label>
            <q-item-label caption>
              $ {{ item.precio.toFixed(2) }} c/u — Subtotal: $
              {{ (item.precio * item.cantidad).toFixed(2) }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center no-wrap">
              <q-btn
                flat
                round
                dense
                icon="remove"
                @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)"
              />
              <span class="q-mx-sm">{{ item.cantidad }}</span>
              <q-btn
                flat
                round
                dense
                icon="add"
                @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)"
              />
              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                @click="carrito.quitar(item.id)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-between items-center q-mt-md">
        <q-btn flat color="negative" label="Vaciar carrito" @click="carrito.vaciar()" />
        <div class="text-h6">Total: $ {{ carrito.total.toFixed(2) }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCarritoStore } from '@/stores/carrito'

const carrito = useCarritoStore()
</script>
