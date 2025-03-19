import { ref, watch } from "vue";

export const taskStore = {
  tasks: ref([]),

  init() {
    const storedTasks = localStorage.getItem('tasks');
    const verifiedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasks.value = this.enrich(verifiedTasks);
  },

  enrich(items) {
    const currentDate = new Date();

    return items.map(item => {
      const dueDate = new Date(item.due);
      const isOverdue = dueDate < currentDate && !item.isDone;

      return {...item, isOverdue}
    });
  },

  getByState(state) {
    console.log('getting tasks by state => ', state);
    let data = [];
    let currentDate = (new Date()).toISOString().split('T')[0];
    switch(state) {
      case 'today':
        data = this.tasks.value.filter((item) => {
          const dueDateTime = new Date(item.due);
          const formattedDate = dueDateTime.toISOString().substring(0,10);
          return currentDate >= formattedDate && !item.isDone;
        });
        break;
      case 'upcoming':
        data = this.tasks.value.filter((item) => {
          const dueDateTime = new Date(item.due);
          const formattedDate = dueDateTime.toISOString().substring(0,10);
          return formattedDate > currentDate && !item.isDone;
        });
        break;
      case 'completed':
        data = this.tasks.value.filter(item => item.isDone);
        break;
    }

    return data;
  },

  update(task) {
    console.log('update ...', task);
    const taskIndex = this.tasks.value.findIndex(item => task.id === item.id);
    if (taskIndex) {
      this.tasks.value[taskIndex] = {...task};
    }
  },

  create(task) {
    this.tasks.value.push(task)
  },

  saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks.value))
  },

  fetch() {
    return this.tasks.value;
  }
};

taskStore.init();

let timeout = null;
watch(
  () => taskStore.tasks.value,
  () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => taskStore.saveLocalStorage(), 500);
    console.log('Automatically stored');
  },
  { deep: true}
);

