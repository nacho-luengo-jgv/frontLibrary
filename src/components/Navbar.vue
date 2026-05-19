<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const auth = useAuthStore()

const irLogin = () => {
  if(!auth.isAuthenticated){
    router.push('/login')
  } else if(auth.role==='admin'){
    router.push('/admin')
  }else if(auth.role==='user'){
    router.push('/user')
  }else{
    router.push('/')
  }
}

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-slate-500 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-center h-20">

        <div class="text-2xl font-medium tracking-wide text-white"
             @click="irLogin">
          Biblioteca IJLM
        </div>

        <button
          @click="logout"
          class="bg-white/20 backdrop-blur-sm
                 text-white font-medium tracking-wide
                 px-5 py-2 rounded-lg
                 hover:bg-white/30 transition duration-200">
          Cerrar sesión
        </button>

      </div>
    </div>
  </nav>
</template>
