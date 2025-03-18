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

const isDarkMode = ref(settingsStore.darkMode.value);

onMounted(() => document.body.classList.toggle('dark-mode', isDarkMode.value));

watch(
  () => settingsStore.darkMode.value,
  () => {
    console.log('isDarkMode is updating ...', settingsStore.darkMode.value);
    isDarkMode.value = settingsStore.darkMode.value;
  }
);

</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <Header />
    <Nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
