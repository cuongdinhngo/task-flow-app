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

const filteredTasks = computed(() => {
  console.log('searching ==> ', querySearch.value);
  return querySearch.value && taskStore.tasks.value.length > 0 ? taskStore.getByState(querySearch.value) : []
});

const route = useRoute();
const querySearch = ref(route.query.state);

watch(
  () => route.query.state,
  (newState, oldState) => {
    querySearch.value = newState;
    filteredTasks.value = taskStore.getByState(querySearch.value);
    console.log(`watching router: New (${newState}), Old (${oldState})`);
  }
);

</script>