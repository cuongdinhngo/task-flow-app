<script setup>
import { ref, provide, computed, watch, onMounted } from 'vue';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import { settingsStore } from './stores/settingsStore';

const showSettings = ref(false);
provide('showSettings', showSettings);

const settings = ref({
  darkMode: false,
  sortBy: 'priority',
  priorityColors: {
    high: '#ff0000',
    medium: '#ffcc00',
    low: '#00cc00'
  }
});
provide('settings', settings);

const expandedSettings = ref({
  darkMode: false,
  sortBy: false,
  priorityColors: false
});
provide('expandedSettings', expandedSettings);
</script>

<template>
  <div>
    <Header />
    <Nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
