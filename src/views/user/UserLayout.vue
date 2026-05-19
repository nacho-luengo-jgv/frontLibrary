<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()

</script>
<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-gray-200 rounded-2xl border-r border-gray-200 p-8">
      <h2 class="text-2xl font-semibold text-gray-700 tracking-tight leading-snug">
        Panel Usuario
        <span class="block text-sm font-medium  pb-4  text-gray-500 mt-1">
        Gestión de libros
        </span>
        <div class="mt-4 mb-6 w-45 h-0.5 bg-gray-400"></div>
      </h2>
      <nav class="space-y-3">
        <router-link to="/user/prest"
          class="flex justify-between items-center px-4 py-3 rounded-lg
               text-gray-700 hover:bg-gray-100 transition"
          :class="route.path.includes('prest') ? 'bg-gray-100 font-semibold' : ''">
          <span>Libros prestados</span>
          <span class="text-gray-500">→</span>
        </router-link>
        <div class="mt-4 mb-6 w-37 h-0.5 bg-gray-400"></div>
        <router-link to="/user/disp"
          class="flex justify-between items-center px-4 py-3 rounded-lg
               text-gray-700 hover:bg-gray-100 transition"
          :class="route.path.includes('disp') ? 'bg-gray-100 font-semibold' : ''">
          <span>Libros disponibles</span>
          <span class="text-gray-500">→</span>
        </router-link>
        <div class="mt-4 mb-6 w-37 h-0.5 bg-gray-400"></div>
      </nav>
    </aside>
    <main class="flex-1 p-10">
      <router-view />
    </main>
  </div>
</template>
