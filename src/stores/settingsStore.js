import { ref, watch } from "vue";

const defaultColors = {
  high: '#ff0000',
  medium: '#ffcc00',
  low: '#00cc00'
}

export const settingsStore = {
  darkMode: ref(false),
  priorityColors: ref(null),
  sortBy: ref('prioriy'),

  init() {
    const storedPriorityColors = localStorage.getItem('priorityColors');
    this.priorityColors.value = storedPriorityColors ? JSON.parse(storedPriorityColors) : defaultColors; 
    const storedDarkMode = localStorage.getItem('darkMode');
    this.darkMode.value = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    console.log('init darkMode =', this.darkMode.value);
  },

  saveLocalStorage(type) {
    let data = null;
    console.log('save local storage ->', type)
    switch(type) {
      case 'priorityColors':
        data = JSON.stringify(this.priorityColors.value);
      case 'darkMode':
        data = JSON.stringify(this.darkMode.value)
        console.log(data);
    }

    localStorage.setItem(type, data)
  }
};

settingsStore.init();

let timeout = null;
watch(
  () => settingsStore.priorityColors.value,
  () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => settingsStore.saveLocalStorage('priorityColors'), 500);
    console.log('priorityColors stored');
  },
  { deep: true}
);

let timeoutDarkMode = null;
watch(
  () => settingsStore.darkMode.value,
  () => {
    if (timeoutDarkMode) clearTimeout(timeoutDarkMode);
    timeoutDarkMode = setTimeout(() => settingsStore.saveLocalStorage('darkMode'), 500);
    console.log('darkMode stored');
  },
  { deep: true}
);