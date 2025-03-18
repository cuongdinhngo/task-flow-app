<template>
  <div>
    <TaskItem
      v-for="task in filteredTasks"
      :key="task.text"
      :task="task"
    />

    <TaskModal />
  </div>
</template>

<script setup>
import { computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import TaskModal from './TaskModal.vue';
import TaskItem from './TaskItem.vue';
import { taskStore } from '@/stores/taskStore';
import { settingsStore } from '@/stores/settingsStore';

const filteredTasks = computed(() => {
  console.log('searching ==> ', querySearch.value);
  let tasks = taskStore.getByState(querySearch.value) || [];

  switch (settingsStore.sortBy.value) {
    case 'priority':
      return tasks.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    case 'due':
      return tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
    case 'name':
      return tasks.sort((a, b) => a.text.localeCompare(b.text));
    default:
      return tasks;
  }
});

const route = useRoute();
const querySearch = ref(route.query.state);

watch(
  () => route.query.state,
  (newState, oldState) => {
    querySearch.value = newState;
    console.log(`watching router: New (${newState}), Old (${oldState})`);
  }
);

</script>