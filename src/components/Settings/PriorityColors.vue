<template>
  <div v-show="expandedSettings.priorityColors" class="setting-details">
    <label>
      High Priority
      <input type="color" v-model="settingsStore.priorityColors.value.high"/>
    </label>
    <label>
      Medium Priority
      <input type="color" v-model="settingsStore.priorityColors.value.medium"/>
    </label>
    <label>
      Low Priority
      <input type="color" v-model="settingsStore.priorityColors.value.low"/>
    </label>
  </div>
</template>

<script setup>
import { inject} from 'vue';
import { settingsStore } from '@/stores/settingsStore';

const expandedSettings = inject('expandedSettings');
</script>