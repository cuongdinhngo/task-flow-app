<template>
  <div class="setting-item">
    <label class="setting-label" @click="toggleSetting(item.id)">
      {{ item.label }}
      <span class="arrow" :class="{ 'expanded': expandedSettings[item.id] }"><i class="fa-solid fa-greater-than"></i></span>
    </label>
    <Transition name="slide-fade">
      <component :is="itemComponents[item.id]" />
    </Transition>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import DarkMode from './DarkMode.vue';
import PriorityColors from './PriorityColors.vue';
import TaskSorting from './TaskSorting.vue';
import { settingsStore } from '@/stores/settingsStore';

const props = defineProps({
  item: Object,
  expandedSettings: Object
});

const expandedSettings = inject('expandedSettings');

const itemComponents = {
  darkMode: DarkMode,
  sortBy: TaskSorting,
  priorityColors: PriorityColors
}

const toggleSetting = (setting) => {
  console.log('toggle setting => ', setting);
  props.expandedSettings[setting] = !props.expandedSettings[setting];
};

console.log('calling Item: ', props.item);
</script>