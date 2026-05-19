<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import type { User } from '../../types/Users.ts'
  import {crearUsuario, obtenerUsuarios} from "@/services/userServices.ts";

  const usuarios = ref<User[]>([])

  const nuevoUsuario = ref<User>({
    id:0,
    name: '',
    rol:'admin'
  })

  const listarUsuarios= async()=>{
    const response= await obtenerUsuarios()
    usuarios.value=response.data
  }

  const guardoUsuario= async()=>{
    await crearUsuario(nuevoUsuario.value)
    alert('Usuario registrado')
    await listarUsuarios()
    botonAgregar.value=false
  }
  const botonAgregar =ref(false)

  const abrirVentana=()=>{
    botonAgregar.value=true
  }
  const cerrarAgregar=()=>{
    botonAgregar.value=false
  }

    listarUsuarios()

</script>
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-center mb-4">
        <button
          @click="abrirVentana"
          class="bg-emerald-600 text-white px-6 py-3 rounded-xl
           text-lg font-semibold tracking-wide
           shadow-md hover:bg-emerald-700 hover:shadow-lg
           transition duration-200">
          <span>+</span> AGREGAR USUARIO
        </button>
      </div>
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">
          Lista de Usuarios
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left text-gray-600">
            <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th class="px-4 py-3">Id</th>
              <th class="px-4 py-3">Rol</th>
              <th class="px-4 py-3">Name</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="user in usuarios" :key="user.id"
                class="hover:bg-gray-50 transition">
                  <td class="px-4 py-3 font-medium text-gray-800">
                    {{ user.id }}
                  </td>
                  <td class="px-4 py-3">{{ user.rol }}</td>
                  <td class="px-4 py-3">{{ user.name }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="botonAgregar"
        class="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
          <button
            @click="cerrarAgregar"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">
            ✕
          </button>
          <h2 class="text-2xl font-semibold mb-6 text-gray-700">
            Crear Usuario
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div class="flex flex-col">
              <label class="mb-1 text-sm font-medium text-gray-600">
                Nombre
              </label>
              <input v-model="nuevoUsuario.name" type="text" placeholder="Nombre"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>
            <div class="flex flex-col">
              <label class="mb-1 text-sm font-medium text-gray-600">
                Rol
              </label>
              <select v-model="nuevoUsuario.rol"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                <option disabled value="">Seleccione un rol</option>
                <option value="admin">Admin</option>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
              </select>
            </div>

          </div>
          <button
            @click="guardoUsuario"
            class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Guardo Usuario
          </button>
        </div>
      </div>


    </div>
  </div>
</template>
