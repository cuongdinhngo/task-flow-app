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
import { computed, onMounted, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import TaskModal from './TaskModal.vue';
import TaskItem from './TaskItem.vue';
import { taskStore } from '@/stores/taskStore';
import { settingsStore } from '@/stores/settingsStore';

const route = useRoute();
const querySearch = ref(route.query.state);
const filteredTasks = ref([]);

const filterTaskByState = () => {
  let data = taskStore.getByState(querySearch.value) || [];
  filteredTasks.value = sortTasksBy(data);
}

const sortTasksBy = (tasks) => {
  let sortBy = settingsStore.sortBy.value;
  let data = [];
  switch (sortBy) {
    case 'priority':
      data = tasks.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      break;
    case 'due':
      data = tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
      break;
    case 'name':
      data = tasks.sort((a, b) => a.text.localeCompare(b.text));
      break;
  }

  return data;
}

onMounted(() => filterTaskByState());

watch(
  () => route.query.state,
  (newState, oldState) => {
    querySearch.value = newState;
    filterTaskByState();
    console.log(`watching router: New (${newState}), Old (${oldState})`);
  }
);

watch(
  () => settingsStore.sortBy.value,
  (newSortBy, oldSortBy) => {
    console.log(`NewSortBy: ${newSortBy} >< OldSortBy: ${oldSortBy}`);
    filteredTasks.value = sortTasksBy(filteredTasks.value);
  }
);

</script>