<template>
  <div v-show="expandedSettings.darkMode" class="setting-details">
    <label>
      <input type="checkbox" v-model="settingsStore.darkMode.value" @change="toggleDarkMode" :checked="settingsStore.darkMode.value" :value="settingsStore.darkMode.value"/>
      Enable Dark Mode
    </label>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import { settingsStore } from '@/stores/settingsStore';

const expandedSettings = inject('expandedSettings');

console.log('Current Dark Mode', settingsStore.darkMode.value)

// Dark Mode toggle
const toggleDarkMode = () => {
  console.log('after toggled >>>> ', settingsStore.darkMode.value);
  document.body.classList.toggle('dark-mode', settingsStore.darkMode.value);
};

watch(
  () => settingsStore.darkMode.value,
  () => toggleDarkMode(),
);
</script>