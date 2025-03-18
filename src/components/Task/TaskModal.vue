<template>
  <button class="fab" @click="openModal">+</button>

  <div v-if="isShowModal" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal">
      <h2>Add new task</h2>
      <form @submit.prevent="addNewTask">
          <div class="form-group">
            <label for="task-text">Task</label>
            <input id="task-text" type="text" v-model.capitalize="taskText" placeholder="Enter task"/>
          </div>
          <div class="form-group">
            <label for="task-due">Due Date</label>
            <input id="task-due" type="datetime-local" v-model="taskDueDateTime"/>
          </div>
          <div class="form-group">
            <label>Priority</label>
            <div class="radio-group">
              <label>
                <input type="radio" value="high" v-model="taskPriority" /> High
              </label>
              <label>
                <input type="radio" value="medium" v-model="taskPriority"/> Medium
              </label>
              <label>
                <input type="radio" value="low" v-model="taskPriority"/> Low
              </label>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">Add Task</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { taskStore } from '@/stores/taskStore';

const isShowModal = ref(false);
const closeModal = () => { isShowModal.value = false }
const openModal = () => { isShowModal.value = true }
const handleOverlayClick = (event) => {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
};

const taskText = ref('');
const taskDueDateTime = ref('');
const taskPriority = ref('');

watchEffect(() => {
  console.log('watch Effect ...', taskText.value)
  taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1);
});


const addNewTask = () => {
  console.log('add new task ....', taskText.value, taskDueDateTime.value, taskPriority.value);
  taskStore.create({
    id: Date.now(),
    text: taskText.value,
    due: taskDueDateTime.value,
    priority: taskPriority.value,
    isDone: false
  });
}
</script>

<style scoped>
.radio-group {
  display: flex;
  gap: 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 0;
}

.radio-group input[type="radio"] {
  width: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background: #cccccc;
}

.modal-actions button:last-child {
  background: #4a90e2;
  color: #ffffff;
}

.fab {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>