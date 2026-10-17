import { defineBoot } from '#q-app'
import axios from 'axios'

// Cliente HTTP para el CouchDB de la clase.
// Usuario y contraseña vienen del archivo .env (que Git ignora).
const api = axios.create({
  baseURL: import.meta.env.QCLI_COUCHDB_URL,
  auth: {
    username: import.meta.env.QCLI_COUCHDB_USER,
    password: import.meta.env.QCLI_COUCHDB_PASS,
  },
})

export default defineBoot(({ app }) => {
  // Para usarlo en Options API: this.$axios y this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
