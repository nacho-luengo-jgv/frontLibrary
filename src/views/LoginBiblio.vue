<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')

const router = useRouter()
const auth = useAuthStore()

const login = () => {
  try {
    auth.login(username.value, password.value)
    if (auth.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/user')
    }
  } catch (error) {
    alert('Credenciales incorrectas')
  }
}
</script>
<template>
  <div class="h-screen overflow-hidden flex items-center justify-center bg-slate-50">

    <div class="w-full max-w-xs bg-white rounded-2xl
           shadow-[0_15px_40px_rgba(59,130,246,0.35)] p-6">
      <div class="flex justify-center mb-5">
        <div class="w-14 h-14 rounded-full overflow-hidden shadow">
          <img src="/biblio.png" alt="Logo IJLM"
               class="w-full h-full object-cover">
        </div>
      </div>
      <h2 class="text-center text-lg font-semibold text-slate-700 mb-6 tracking-wide">
        Biblioteca IJLM
      </h2>
      <form @submit.prevent="login" class="space-y-4">
        <input v-model="username" type="text" placeholder="Usuario"
          class="w-full border border-slate-200 rounded-lg
                 px-3 py-2 text-sm
                 focus:outline-none focus:ring-1 focus:ring-blue-400" required/>
        <input v-model="password" type="password" placeholder="Contraseña"
          class="w-full border border-slate-200 rounded-lg
                 px-3 py-2 text-sm
                 focus:outline-none focus:ring-1 focus:ring-blue-400" required/>

        <button type="submit" class="w-full bg-blue-500 text-white
                 py-2 rounded-lg text-sm font-medium
                 hover:bg-blue-600 transition">
          Ingresar
        </button>
      </form>
      <p class="text-center text-[10px] text-slate-500 mt-6">
        © 2026 — Desarrollado por
        <span class="text-violet-400 font-semibold">
          Ignacio Joel Luengo Moreno
        </span>
      </p>
    </div>
  </div>
</template>
