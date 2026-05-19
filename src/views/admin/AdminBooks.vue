<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import type { Book } from '../../types/Books.ts'
  import  { obtenerLibrosAdmin, crearLibro, eliminarLibro, actualizarLibro} from '../../services/bookServices.ts'

  const libros=ref<Book[]>([])

  const nuevoLibro= ref<Book>({
    id:0,
    title: '',
    author: '',
    editorial: '',
    anio: 0,
    isbc: '',
    price: 0,
    status: 'DISPONIBLE'
  })

  const listaLibros= async () => {
    const response= await obtenerLibrosAdmin()
    libros.value=response.data
  }
  const guardoLibro= async () => {
    await crearLibro(nuevoLibro.value)
    await listaLibros()
    cerrarAgregar()
  }
  const borrarLibro= async (id: number) => {
    await eliminarLibro(id)
    await listaLibros()
  }
  const botonAgrego =ref(false)
  const modoEditar = ref(false)

  const abrirAgregar = () =>{
    modoEditar.value = false
    nuevoLibro.value = {
      id: 0,
      title: '',
      author: '',
      editorial: '',
      anio: 0,
      isbc: '',
      price: 0,
      status: 'DISPONIBLE'
    }
    botonAgrego.value = true
  }
  const cerrarAgregar = () =>{
    botonAgrego.value = false
  }
  const actualizarLib = async () => {
    await actualizarLibro(nuevoLibro.value.id,nuevoLibro.value)
    await listaLibros()
    cerrarAgregar()
  }
  const editarLibro = (libro :Book) => {
    modoEditar.value = true
    nuevoLibro.value= { ... libro}
    botonAgrego.value=true
  }
  listaLibros()
</script>
<template>
  <div class="min-h-screen bg-gray-100 p-2">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-center mb-4">
        <button
          @click="abrirAgregar"
          class="bg-emerald-600 text-white px-6 py-3 rounded-xl
           text-lg font-semibold tracking-wide
           shadow-md hover:bg-emerald-700 hover:shadow-lg
           transition duration-200">
          <span>+</span> AGREGAR LIBRO
        </button>
      </div>
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-6 text-gray-700">
            Lista de Libros
          </h2>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-600">
              <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th class="px-4 py-3">Título</th>
                <th class="px-4 py-3">Autor</th>
                <th class="px-4 py-3">Editorial</th>
                <th class="px-4 py-3">Año</th>
                <th class="px-4 py-3">ISBN</th>
                <th class="px-4 py-3">Precio</th>
                <th class="px-4 py-3">Estado</th>
                <th class="px-4 py-3 text-center">Acciones</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="libro in libros" :key="libro.id"
                class="hover:bg-gray-50 transition">
                <td class="px-4 py-3 font-medium text-gray-800">
                  {{ libro.title }}
                </td>
                <td class="px-4 py-3">{{ libro.author }}</td>
                <td class="px-4 py-3">{{ libro.editorial }}</td>
                <td class="px-4 py-3">{{ libro.anio }}</td>
                <td class="px-4 py-3">{{ libro.isbc }}</td>
                <td class="px-4 py-3">€ {{ libro.price }}</td>
                <td class="px-4 py-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="{
                  'bg-green-100 text-green-700': libro.status === 'DISPONIBLE',
                  'bg-red-100 text-red-700': libro.status === 'PRESTADO',
                  'bg-yellow-100 text-yellow-700': libro.status === 'RESERVADO'
                  }">
                {{ libro.status }}
              </span>
                </td>
                <td class="px-4 py-3 text-center space-x-2">
                  <button
                    @click="editarLibro(libro)"
                    class="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                    <PencilSquareIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="borrarLibro(libro.id)"
                    class="p-2 rounded-lg hover:bg-red-100 text-red-600 transition">
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>



      <div v-if="botonAgrego"
        class="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50">

        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
          <button
            @click="cerrarAgregar"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">
            ✕
          </button>

          <h2 class="text-2xl font-semibold mb-6 text-gray-700">
            {{ modoEditar ? 'Editar Libro' : 'Crear Libro' }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                Título
              </label>
              <input v-model="nuevoLibro.title" type="text" placeholder="Ej: Clean Code"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                Autor
              </label>
              <input v-model="nuevoLibro.author" type="text" placeholder="Ej: Robert C. Martin"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                Editorial
              </label>
              <input v-model="nuevoLibro.editorial" type="text" placeholder="Ej: Prentice Hall"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                Año de publicación
              </label>
              <input v-model="nuevoLibro.anio" type="number" min="0" placeholder="Ej: 2020"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                ISBN
              </label>
              <input v-model="nuevoLibro.isbc" type="text" placeholder="Ej: 978-0132350884"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

            <div class="flex flex-col">
              <label class="text-sm font-semibold text-gray-600 mb-1">
                Precio (€)
              </label>
              <input v-model="nuevoLibro.price" type="number" step="0.01" min="0" placeholder="Ej: 19.99"
                class="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"/>
            </div>

          </div>

          <button
            @click="modoEditar ? actualizarLib() : guardoLibro()"
            class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            {{ modoEditar ? 'Actualizar Libro' : 'Guardar Libro' }}
          </button>

        </div>
      </div>
    </div>
  </div>
</template>
