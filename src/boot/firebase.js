import { defineBoot } from '#q-app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase (viene del archivo .env, que Git ignora).
const firebaseApp = initializeApp({
  apiKey: import.meta.env.QCLI_FIREBASE_API_KEY,
  authDomain: import.meta.env.QCLI_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.QCLI_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.QCLI_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.QCLI_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.QCLI_FIREBASE_APP_ID,
})

// Firestore: aquí se guardan los DATOS del anuncio (las imágenes se quedan en CouchDB)
const db = getFirestore(firebaseApp)

export default defineBoot(() => {
  // Nada que registrar: el store importa { db } directamente
})

export { db }
