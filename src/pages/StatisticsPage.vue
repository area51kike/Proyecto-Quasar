<template>
  <q-page padding>
    <div class="text-h5 text-weight-medium q-mb-md">Estadísticas</div>

    <!-- Resumen rápido -->
    <div class="row q-col-gutter-md q-mb-md">
      <div v-for="k in resumen" :key="k.titulo" class="col-12 col-sm-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-caption text-grey-7">{{ k.titulo }}</div>
          <div class="text-h5 text-weight-bold text-red-14">{{ k.valor }}</div>
        </q-card>
      </div>
    </div>

    <div v-if="store.cargando && !store.productos.length" class="row justify-center q-pa-xl">
      <q-spinner color="red-14" size="40px" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <!-- 1. Barras horizontales: anuncios por marca (nuevo vs usado) -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Anuncios por marca</div>
            <div class="text-caption text-grey-7">Cantidad de nuevos y usados</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <svg
              :viewBox="`0 0 ${W} ${H}`"
              class="grafica"
              role="img"
              aria-label="Gráfica de barras horizontales: anuncios por marca, nuevos y usados"
            >
              <g v-for="m in barrasH.esc.marcas" :key="m">
                <line
                  :x1="M.l + (m / barrasH.esc.max) * ancho"
                  :x2="M.l + (m / barrasH.esc.max) * ancho"
                  :y1="M.t"
                  :y2="M.t + alto"
                  class="rejilla"
                />
                <text
                  :x="M.l + (m / barrasH.esc.max) * ancho"
                  :y="H - 14"
                  text-anchor="middle"
                  class="eje"
                >
                  {{ m }}
                </text>
              </g>
              <g v-for="f in barrasH.filas" :key="f.label">
                <text :x="M.l - 6" :y="f.y + 4" text-anchor="end" class="eje">{{ f.label }}</text>
                <g v-for="s in f.series" :key="s.nombre">
                  <rect
                    class="barra"
                    :x="M.l"
                    :y="s.y"
                    :width="s.w"
                    :height="barrasH.g"
                    rx="2"
                    :fill="s.color"
                  >
                    <title>{{ f.label }} · {{ s.nombre }}: {{ s.v }}</title>
                  </rect>
                  <text
                    v-if="s.v > 0"
                    :x="M.l + s.w + 4"
                    :y="s.y + barrasH.g / 2 + 3.5"
                    class="valor"
                  >
                    {{ s.v }}
                  </text>
                </g>
              </g>
              <line :x1="M.l" :x2="M.l" :y1="M.t" :y2="M.t + alto" class="ejeLinea" />
            </svg>
            <div class="row justify-center q-gutter-md text-caption">
              <span v-for="e in estados" :key="e.texto">
                <span class="punto" :style="{ background: e.color }"></span> {{ e.texto }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 2. Barras verticales: precio promedio por sistema (nuevo vs usado) -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Precio promedio por sistema</div>
            <div class="text-caption text-grey-7">En dólares, nuevos vs usados</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <svg
              :viewBox="`0 0 ${W} ${H}`"
              class="grafica"
              role="img"
              aria-label="Gráfica de barras verticales: precio promedio por sistema operativo"
            >
              <g v-for="m in barrasV.esc.marcas" :key="m">
                <line
                  :x1="M.l"
                  :x2="W - M.r"
                  :y1="M.t + alto - (m / barrasV.esc.max) * alto"
                  :y2="M.t + alto - (m / barrasV.esc.max) * alto"
                  class="rejilla"
                />
                <text
                  :x="M.l - 6"
                  :y="M.t + alto - (m / barrasV.esc.max) * alto + 4"
                  text-anchor="end"
                  class="eje"
                >
                  ${{ m }}
                </text>
              </g>
              <g v-for="g in barrasV.grupos" :key="g.label">
                <g v-for="s in g.series" :key="s.nombre">
                  <rect
                    class="barra"
                    :x="s.x"
                    :y="s.y"
                    :width="barrasV.w"
                    :height="s.h"
                    rx="2"
                    :fill="s.color"
                  >
                    <title>{{ g.label }} · {{ s.nombre }}: {{ s.texto }}</title>
                  </rect>
                  <text
                    v-if="s.v !== null"
                    :x="s.x + barrasV.w / 2"
                    :y="s.y - 4"
                    text-anchor="middle"
                    class="valor"
                  >
                    {{ Math.round(s.v) }}
                  </text>
                </g>
                <text :x="g.cx" :y="H - 14" text-anchor="middle" class="eje">{{ g.label }}</text>
              </g>
              <line :x1="M.l" :x2="W - M.r" :y1="M.t + alto" :y2="M.t + alto" class="ejeLinea" />
            </svg>
            <div class="row justify-center q-gutter-md text-caption">
              <span v-for="e in estados" :key="e.texto">
                <span class="punto" :style="{ background: e.color }"></span> {{ e.texto }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 3. Líneas: anuncios publicados por mes -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Anuncios publicados por mes</div>
            <div class="text-caption text-grey-7">Evolución de nuevos y usados</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <svg
              :viewBox="`0 0 ${W} ${H}`"
              class="grafica"
              role="img"
              aria-label="Gráfica de líneas: anuncios publicados por mes, nuevos y usados"
            >
              <g v-for="m in lineas.esc.marcas" :key="m">
                <line
                  :x1="M.l"
                  :x2="W - M.r"
                  :y1="M.t + alto - (m / lineas.esc.max) * alto"
                  :y2="M.t + alto - (m / lineas.esc.max) * alto"
                  class="rejilla"
                />
                <text
                  :x="M.l - 6"
                  :y="M.t + alto - (m / lineas.esc.max) * alto + 4"
                  text-anchor="end"
                  class="eje"
                >
                  {{ m }}
                </text>
              </g>
              <text
                v-for="p in lineas.meses"
                :key="p.clave"
                :x="p.x"
                :y="H - 14"
                text-anchor="middle"
                class="eje"
              >
                {{ p.label }}
              </text>
              <g v-for="s in lineas.series" :key="s.nombre">
                <polyline :points="s.puntos" fill="none" :stroke="s.color" stroke-width="2.5" />
                <circle
                  v-for="p in s.marcas"
                  :key="p.clave"
                  class="barra"
                  :cx="p.x"
                  :cy="p.y"
                  r="4"
                  :fill="s.color"
                >
                  <title>{{ p.label }} · {{ s.nombre }}: {{ p.v }}</title>
                </circle>
              </g>
              <line :x1="M.l" :x2="W - M.r" :y1="M.t + alto" :y2="M.t + alto" class="ejeLinea" />
              <line :x1="M.l" :x2="M.l" :y1="M.t" :y2="M.t + alto" class="ejeLinea" />
            </svg>
            <div class="row justify-center q-gutter-md text-caption">
              <span v-for="e in estados" :key="e.texto">
                <span class="punto" :style="{ background: e.color }"></span> {{ e.texto }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 4. Pastel: distribución por sistema operativo -->
      <div class="col-12 col-md-6">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-medium">Distribución por sistema</div>
            <div class="text-caption text-grey-7">Porcentaje de anuncios por sistema operativo</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <svg
              viewBox="0 0 400 260"
              class="grafica"
              role="img"
              aria-label="Gráfica de pastel: distribución de anuncios por sistema operativo"
            >
              <g v-for="s in sectores" :key="s.label">
                <circle
                  v-if="s.completo"
                  class="barra"
                  :cx="PIE.cx"
                  :cy="PIE.cy"
                  :r="PIE.r"
                  :fill="s.color"
                >
                  <title>{{ s.label }}: {{ s.n }} ({{ s.pct }}%)</title>
                </circle>
                <path v-else class="barra" :d="s.d" :fill="s.color" stroke="#fff" stroke-width="2">
                  <title>{{ s.label }}: {{ s.n }} ({{ s.pct }}%)</title>
                </path>
              </g>
            </svg>
            <div class="row justify-center q-gutter-md text-caption">
              <span v-for="s in sectores" :key="s.label">
                <span class="punto" :style="{ background: s.color }"></span> {{ s.label }}:
                {{ s.n }} ({{ s.pct }}%)
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductosStore } from '@/stores/productos'

const store = useProductosStore()

// Igual que en IndexPage: al entrar (o recargar) se traen los anuncios de CouchDB
onMounted(() => store.cargar().catch((e) => console.error('No se pudo cargar de CouchDB', e)))

// ---------- Estilo y medidas de las gráficas ----------
const COLOR_NUEVO = '#d50000' // red-14, el mismo de la barra superior
const COLOR_USADO = '#78909c' // blue-grey-5
const PALETA = ['#d50000', '#37474f', '#f9a825', '#00897b', '#5e35b1', '#8d6e63']

const estados = [
  { texto: 'Nuevo', color: COLOR_NUEVO },
  { texto: 'Usado', color: COLOR_USADO },
]

const W = 400
const H = 260
const M = { t: 14, r: 24, b: 34, l: 64 } // márgenes
const ancho = W - M.l - M.r
const alto = H - M.t - M.b
const PIE = { cx: 200, cy: 130, r: 105 }

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const ETIQUETAS = { ios: 'iOS', iphone: 'iPhone' }

// ---------- Utilidades ----------
const usd = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// "iphone" / "IPHONE" / "iPhone" cuentan como la misma marca
const clave = (texto) =>
  String(texto ?? '')
    .trim()
    .toLowerCase() || 'sin dato'
const etiqueta = (texto) => {
  const k = clave(texto)
  return ETIQUETAS[k] ?? k.charAt(0).toUpperCase() + k.slice(1)
}
const recortar = (texto, max = 9) => (texto.length > max ? texto.slice(0, max - 1) + '…' : texto)

// Calcula un tope "bonito" y las marcas del eje (0, 5, 10, ...)
function escala(max, entero = false, ticks = 4) {
  if (!(max > 0)) return { max: 1, marcas: [0, 1] }
  const paso0 = max / ticks
  const mag = 10 ** Math.floor(Math.log10(paso0))
  const frac = paso0 / mag
  let paso = (frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10) * mag
  if (entero) paso = Math.max(1, Math.round(paso))
  const tope = Math.ceil(max / paso) * paso
  const marcas = []
  for (let v = 0; v <= tope + 1e-9; v += paso) marcas.push(Math.round(v * 100) / 100)
  return { max: tope, marcas }
}

// ---------- Datos agrupados ----------
const lista = computed(() => store.productos)

// Cuenta por marca: { label, nuevo, usado }
const porMarca = computed(() => {
  const mapa = new Map()
  for (const p of lista.value) {
    const k = clave(p.marca)
    if (!mapa.has(k)) mapa.set(k, { label: etiqueta(p.marca), nuevo: 0, usado: 0 })
    mapa.get(k)[p.nuevo ? 'nuevo' : 'usado']++
  }
  return [...mapa.values()].sort((a, b) => b.nuevo + b.usado - (a.nuevo + a.usado)).slice(0, 8) // máximo 8 marcas para que se lea bien
})

// Precio promedio por sistema: { label, nuevo, usado } (null si no hay de ese tipo)
const porSistemaPrecio = computed(() => {
  const mapa = new Map()
  for (const p of lista.value) {
    const k = clave(p.sistema)
    if (!mapa.has(k)) {
      mapa.set(k, { label: etiqueta(p.sistema), n: [0, 0], suma: [0, 0] })
    }
    const g = mapa.get(k)
    const i = p.nuevo ? 0 : 1
    g.n[i]++
    g.suma[i] += Number(p.precio) || 0
  }
  return [...mapa.values()].map((g) => ({
    label: g.label,
    nuevo: g.n[0] ? g.suma[0] / g.n[0] : null,
    usado: g.n[1] ? g.suma[1] / g.n[1] : null,
  }))
})

// Anuncios por mes (rellena los meses sin anuncios con 0)
const porMes = computed(() => {
  const mapa = new Map()
  for (const p of lista.value) {
    const clave_mes = String(p.fecha ?? '').slice(0, 7) // "2026-10"
    if (!/^\d{4}-\d{2}$/.test(clave_mes)) continue
    if (!mapa.has(clave_mes)) mapa.set(clave_mes, { nuevo: 0, usado: 0 })
    mapa.get(clave_mes)[p.nuevo ? 'nuevo' : 'usado']++
  }
  const claves = [...mapa.keys()].sort()
  if (!claves.length) return []

  const [a0, m0] = claves[0].split('-').map(Number)
  const [a1, m1] = claves[claves.length - 1].split('-').map(Number)
  const meses = []
  let a = a0
  let m = m0
  while (a < a1 || (a === a1 && m <= m1)) {
    const k = `${a}-${String(m).padStart(2, '0')}`
    meses.push({
      clave: k,
      label: `${MESES[m - 1]} ${String(a).slice(2)}`,
      ...(mapa.get(k) ?? { nuevo: 0, usado: 0 }),
    })
    m++
    if (m > 12) {
      m = 1
      a++
    }
  }
  return meses
})

// Cantidad por sistema operativo (para el pastel)
const porSistema = computed(() => {
  const mapa = new Map()
  for (const p of lista.value) {
    const k = clave(p.sistema)
    if (!mapa.has(k)) mapa.set(k, { label: etiqueta(p.sistema), n: 0 })
    mapa.get(k).n++
  }
  return [...mapa.values()].sort((a, b) => b.n - a.n)
})

// ---------- Geometría de cada gráfica ----------
// 1. Barras horizontales
const barrasH = computed(() => {
  const filas = porMarca.value
  const maximo = Math.max(0, ...filas.map((f) => Math.max(f.nuevo, f.usado)))
  const esc = escala(maximo, true)
  const alturaFila = alto / (filas.length || 1)
  const g = Math.min(alturaFila * 0.34, 18) // alto de cada barra
  return {
    esc,
    g,
    filas: filas.map((f, i) => {
      const y = M.t + i * alturaFila + alturaFila / 2
      return {
        label: recortar(f.label),
        y,
        series: [
          {
            nombre: 'Nuevo',
            color: COLOR_NUEVO,
            v: f.nuevo,
            w: (f.nuevo / esc.max) * ancho,
            y: y - g,
          },
          { nombre: 'Usado', color: COLOR_USADO, v: f.usado, w: (f.usado / esc.max) * ancho, y },
        ],
      }
    }),
  }
})

// 2. Barras verticales agrupadas
const barrasV = computed(() => {
  const datos = porSistemaPrecio.value
  const maximo = Math.max(0, ...datos.flatMap((d) => [d.nuevo ?? 0, d.usado ?? 0]))
  const esc = escala(maximo)
  const anchoGrupo = ancho / (datos.length || 1)
  const w = Math.min(anchoGrupo * 0.3, 34) // ancho de cada barra
  const base = M.t + alto
  const barra = (v, x, nombre, color) => {
    const h = v ? (v / esc.max) * alto : 0
    return { nombre, color, v, x, y: base - h, h, texto: v === null ? 'sin anuncios' : usd(v) }
  }
  return {
    esc,
    w,
    grupos: datos.map((d, i) => {
      const cx = M.l + i * anchoGrupo + anchoGrupo / 2
      return {
        label: recortar(d.label),
        cx,
        series: [
          barra(d.nuevo, cx - w - 2, 'Nuevo', COLOR_NUEVO),
          barra(d.usado, cx + 2, 'Usado', COLOR_USADO),
        ],
      }
    }),
  }
})

// 3. Líneas (anuncios por mes)
const lineas = computed(() => {
  const meses = porMes.value
  const maximo = Math.max(0, ...meses.flatMap((m) => [m.nuevo, m.usado]))
  const esc = escala(maximo, true)
  const base = M.t + alto
  // Con un solo mes el punto va al centro; con varios se reparten con 12px de aire a cada lado
  const posX = (i) =>
    meses.length > 1 ? M.l + 12 + (i * (ancho - 24)) / (meses.length - 1) : M.l + ancho / 2

  const hacerSerie = (nombre, color, campo) => {
    const marcas = meses.map((m, i) => ({
      clave: m.clave,
      label: m.label,
      v: m[campo],
      x: posX(i),
      y: base - (m[campo] / esc.max) * alto,
    }))
    return { nombre, color, marcas, puntos: marcas.map((p) => `${p.x},${p.y}`).join(' ') }
  }

  return {
    esc,
    meses: meses.map((m, i) => ({ clave: m.clave, label: m.label, x: posX(i) })),
    series: [hacerSerie('Nuevo', COLOR_NUEVO, 'nuevo'), hacerSerie('Usado', COLOR_USADO, 'usado')],
  }
})

// 4. Pastel
const sectores = computed(() => {
  const total = porSistema.value.reduce((s, x) => s + x.n, 0) || 1
  let ang = -Math.PI / 2 // empieza arriba
  return porSistema.value.map((s, i) => {
    const frac = s.n / total
    const fin = ang + frac * 2 * Math.PI
    const punto = (a) => [PIE.cx + PIE.r * Math.cos(a), PIE.cy + PIE.r * Math.sin(a)]
    const [x0, y0] = punto(ang)
    const [x1, y1] = punto(fin)
    const grande = frac > 0.5 ? 1 : 0
    const sector = {
      label: s.label,
      n: s.n,
      pct: Math.round(frac * 100),
      color: PALETA[i % PALETA.length],
      completo: frac >= 0.9999, // un solo sistema: el arco no se puede dibujar, va un círculo
      d: `M ${PIE.cx} ${PIE.cy} L ${x0} ${y0} A ${PIE.r} ${PIE.r} 0 ${grande} 1 ${x1} ${y1} Z`,
    }
    ang = fin
    return sector
  })
})

// ---------- Resumen ----------
const resumen = computed(() => {
  const total = lista.value.length
  const precios = lista.value.map((p) => Number(p.precio) || 0)
  const promedio = total ? precios.reduce((a, b) => a + b, 0) / total : 0
  const nuevos = lista.value.filter((p) => p.nuevo).length
  return [
    { titulo: 'Total de anuncios', valor: total },
    { titulo: 'Precio promedio', valor: usd(promedio) },
    { titulo: 'Anuncios nuevos', valor: total ? `${Math.round((nuevos / total) * 100)}%` : '0%' },
  ]
})
</script>

<style scoped>
.grafica {
  display: block;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}
.eje {
  font-size: 11px;
  fill: #616161;
}
.valor {
  font-size: 10px;
  fill: #424242;
}
.rejilla {
  stroke: #e0e0e0;
  stroke-width: 1;
}
.ejeLinea {
  stroke: #9e9e9e;
  stroke-width: 1;
}
.barra {
  transition: opacity 0.15s;
}
.barra:hover {
  opacity: 0.75;
}
.punto {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 4px;
}
</style>
