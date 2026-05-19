<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-500 text-white">
    <div class="max-w-7xl mx-auto px-6 py-6 text-center">
      <p class="text-sm">© {{ year }} — Desarrollado por
        <span class="text-violet-300 font-semibold">
          Ignacio Joel Luengo Moreno
        </span>
      </p>
    </div>
  </footer>
</template>
