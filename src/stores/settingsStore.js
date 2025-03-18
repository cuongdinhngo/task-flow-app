import { ref, watch } from "vue";

const defaultColors = {
  high: '#ff0000',
  medium: '#ffcc00',
  low: '#00cc00'
}

export const settingsStore = {
  darkMode: ref(false),
  priorityColors: ref(null),
  sortBy: ref('priority'),

  init() {
    const storedPriorityColors = localStorage.getItem('priorityColors');
    this.priorityColors.value = storedPriorityColors ? JSON.parse(storedPriorityColors) : defaultColors;

    const storedDarkMode = localStorage.getItem('darkMode');
    this.darkMode.value = Boolean(JSON.parse(storedDarkMode)) || false;

    const storedSortBy = localStorage.getItem('sortBy');
    this.sortBy.value = storedSortBy || 'priority';

    console.log('Init DarkMode:', this.darkMode.value);
    this.applyDarkMode();
  },

  applyDarkMode() {
    if (this.darkMode.value === true) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  },

  toggleDarkMode() {
    console.log('Before toggle, Current DarkMode ===', this.darkMode.value);
    console.log('After toggle, New DarkMode ===', this.darkMode.value);
    this.applyDarkMode();
  },

  saveLocalStorage(type) {
    let data = null;
    console.log('save local storage ->', type)
    switch(type) {
      case 'priorityColors':
        data = JSON.stringify(this.priorityColors.value);
        break;
      case 'darkMode':
        data = this.darkMode.value;
        break;
      case 'sortBy':
        data = this.sortBy.value;
        break;
    }

    if (data !== null) {
      localStorage.setItem(type, data);
    }
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

watch(
  () => settingsStore.darkMode.value,
  () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => settingsStore.saveLocalStorage('darkMode'), 500);
    console.log('darkMode stored');
  }
);

watch(
  () => settingsStore.sortBy.value,
  () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => settingsStore.saveLocalStorage('sortBy'), 500);
  }
);