<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div class="app">
    <Navbar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
  body {
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    background-color: #FFFFFF;
  }

  .main-content {
    flex: 1;
    display: flex;
    width: 100%;
  }
</style>
