<script setup lang="ts">
  import { obtenerLibrosDisponibles,solicitarPrestamo } from "@/services/bookServices.ts";
  import {ref, onMounted} from "vue";
  import type {Book} from "@/types/Books.ts"
  import {useAuthStore} from "@/stores/auth.ts"
  const auth= useAuthStore()
  const librosDisponibles = ref<Book [] >([])
  const listarLibrosDisponibles = async () => {
    try {
      const response = await obtenerLibrosDisponibles()
      librosDisponibles.value = response.data
    }catch (error) {
      console.log('Error al listar los libros disponibles')
    }
  }
  const solicitarPrest=async(idLibro:number) => {
    try{
    if(auth.userId) {
      await solicitarPrestamo(auth.userId, idLibro);
      alert('Libro pedido correctamente')
      await listarLibrosDisponibles()
    }} catch (error) {
        console.log('Error al solicitar los libros disponibles')
    }
  }

  if(auth.userId) {
    listarLibrosDisponibles()
  }


</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">
          Libros disponibles
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left text-gray-600">
            <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th class="px-4 py-3">Titulo</th>
              <th class="px-4 py-3">Autor</th>
              <th class="px-4 py-3">Editorial</th>
              <th class="px-4 py-3">Año publicacion</th>
              <th class="px-4 py-3">ISBN</th>
              <th class="px-4 py-3">Precio</th>
              <th class="px-4 py-3 text-center">Acciones</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="lib in librosDisponibles" :key="lib.id"
              class="hover:bg-gray-50 transition">
              <td class="px-4 py-3 font-medium text-gray-800">
                {{ lib.title }}
              </td>
              <td class="px-4 py-3">{{ lib.author }}</td>
              <td class="px-4 py-3">{{ lib.editorial }}</td>
              <td class="px-4 py-3">{{ lib.anio }}</td>
              <td class="px-4 py-3">{{ lib.isbc }}</td>
              <td class="px-4 py-3">€ {{ lib.price }}</td>
              <td class="px-4 py-3 text-center space-x-2">
                <button
                  @click="solicitarPrest(lib.id)"
                  class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                  Solicitar Prestamo
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
