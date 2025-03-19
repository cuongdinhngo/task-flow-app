<template>
  <div :class="['task', task.priority]">
    <label :class="{isDone: props.task.isDone}">
      {{ task.text }} <font-awesome-icon v-if="task.isOverdue" icon="fire" class="overdue"/>
      <span>Due {{ task.due.replace("T", " at ") }}</span>
    </label>
    <input type="checkbox" id="task1" class="toggle-switch" @input="toggleDone" :checked="props.task.isDone"/>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { taskStore } from '@/stores/taskStore';
import { settingsStore } from '@/stores/settingsStore';

const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: {}
  }
});

const toggleDone = () => {
  console.log(props.task)
  props.task.isDone = !props.task.isDone;
  taskStore.update(props.task)
  console.log('toggle DONE');
}

const updatePriorityColors = () => {
  console.log('## changing color >>>', settingsStore.priorityColors.value);
  document.documentElement.style.setProperty('--high-color', settingsStore.priorityColors.value.high);
  document.documentElement.style.setProperty('--medium-color', settingsStore.priorityColors.value.medium);
  document.documentElement.style.setProperty('--low-color', settingsStore.priorityColors.value.low);
};

updatePriorityColors();

watch(
  () => settingsStore.priorityColors.value,
  () => {
    updatePriorityColors();
  },
  { deep: true }
);
</script>

<style scoped>
.overdue {
  margin-left: 10px;
  color: #7c7c7c;
  animation-name: house-fire;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate-reverse;
}

@keyframes house-fire {
  from {color: #ffffff;}
  to {color: #f90000;}
}

.task.high::before {
  background: var(--high-color, #ff0000);
}

.task.medium::before {
  background: var(--medium-color, #ffcc00);
}

.task.low::before {
  background: var(--low-color, #00cc00);
}

.isDone {
  text-decoration: line-through;
}

.toggle-switch {
  appearance: none;
  width: 40px;
  height: 20px;
  background: #cccccc;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
}

.toggle-switch::after {
  content: '';
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.2s ease;
}

.toggle-switch:checked {
    background: #4a90e2;
}

.toggle-switch:checked::after {
    transform: translateX(20px);
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task label {
  flex: 1;
  font-size: 16px;
}

.task span {
  display: block;
  font-size: 12px;
  color: #666666;
}

.task::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>