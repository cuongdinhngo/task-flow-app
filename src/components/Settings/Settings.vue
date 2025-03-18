<template>
  <div v-if="showSettings" class="modal-overlay" @click="closeSettings">
    <div class="modal" @click.stop>
      <h2>Settings</h2>
      <div class="settings-list">
        <Item
          v-for="item in settingItems"
          :key="item.id"
          :item="item"
          :expanded-settings="expandedSettings"
          :settings="settings"
        />
      </div>
      <div class="modal-actions">
        <button type="button" @click="closeSettings">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import Item from './Item.vue';

const showSettings = inject('showSettings');
const settings = inject('settings');
const expandedSettings = inject('expandedSettings');

const settingItems = [
  {
    id: 'darkMode',
    label: 'Dark Mode',
  },
  {
    id: 'sortBy',
    label: 'Task Sorting',
  },
  {
    id: 'priorityColors',
    label: 'Priority Colors',
  },
];

const closeSettings = () => {
  showSettings.value = false;

  expandedSettings.value = {
    darkMode: false,
    sortBy: false,
    priorityColors: false
  };
};
</script>

<style scoped>

</style>