<template>
  <div v-show="expandedSettings.darkMode" class="setting-details">
    <label>
      <input type="checkbox" v-model="settingsStore.darkMode.value" @change="settingsStore.toggleDarkMode" />
      Enable Dark Mode
    </label>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { settingsStore } from '@/stores/settingsStore';

const expandedSettings = inject('expandedSettings');
</script>