<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const router = useRouter()
const volverInicio = () => {
  if (!auth.isAuthenticated) {
    router.push('/login')
  } else if (auth.role === 'admin') {
    router.push('/admin/books')
  } else {
    router.push('/user/prest')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
    <h1 class="text-6xl font-bold text-red-500 mb-4">
      404
    </h1>

    <h2 class="text-2xl font-semibold text-gray-700 mb-2">
      Página no encontrada
    </h2>

    <p class="text-gray-500 mb-6">
      La ruta que intentas visitar no existe o no tienes permiso.
    </p>

    <button
      @click="volverInicio"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
      Volver al inicio
    </button>
  </div>
</template>
