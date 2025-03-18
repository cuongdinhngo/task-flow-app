<template>
  <div v-show="expandedSettings.sortBy" class="setting-details">
    <label>
      <input type="radio" v-model="settingsStore.sortBy" value="priority" name="sortBy" @change="updateSortBy" :checked="settingsStore.sortBy"/>
      Sort by Priority
    </label>
    <label>
      <input type="radio" v-model="settingsStore.sortBy" value="due" name="sortBy" @change="updateSortBy" :checked="settingsStore.sortBy"/>
      Sort by Due Date
    </label>
    <label>
      <input type="radio" v-model="settingsStore.sortBy" value="name" name="sortBy" @change="updateSortBy" :checked="settingsStore.sortBy"/>
      Sort by Name
    </label>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { settingsStore } from '@/stores/settingsStore';

const expandedSettings = inject('expandedSettings');

const updateSortBy = () => {
  console.log('sorting by ===', settingsStore.sortBy)
}
</script>