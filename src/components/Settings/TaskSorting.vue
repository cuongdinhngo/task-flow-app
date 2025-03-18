<template>
  <div v-show="expandedSettings.sortBy" class="setting-details">
    <label>
      <input type="radio" v-model="settings.sortBy" value="priority"/>
      Sort by Priority
    </label>
    <label>
      <input type="radio" v-model="settings.sortBy" value="due"/>
      Sort by Due Date
    </label>
    <label>
      <input type="radio" v-model="settings.sortBy" value="name"/>
      Sort by Name
    </label>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const expandedSettings = inject('expandedSettings');
const settings = inject('settings');

console.log('Task Sorting ===> ', expandedSettings.sortBy, expandedSettings);
</script>