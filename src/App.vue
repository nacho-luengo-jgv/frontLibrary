<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute()
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <Navbar v-if="!route.meta.hideLayout" />

    <main class="flex-grow p-6">
      <router-view />
    </main>

    <Footer v-if="!route.meta.hideLayout" />

  </div>
</template>

<style scoped></style>
