<template>
  <div v-show="expandedSettings.sortBy" class="setting-details">
    <label>
      <input type="radio" v-model="settingsStore.sortBy.value" value="priority" name="sortBy" @click="settingsStore.updateSortBy('priority')"/>
      Sort by Priority
    </label>
    <label>
      <input type="radio" v-model="settingsStore.sortBy.value" value="due" name="sortBy" @click="settingsStore.updateSortBy('due')"/>
      Sort by Due Date
    </label>
    <label>
      <input type="radio" v-model="settingsStore.sortBy.value" value="name" name="sortBy" @click="settingsStore.updateSortBy('name')"/>
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