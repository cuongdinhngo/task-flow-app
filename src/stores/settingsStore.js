import { ref, watch } from "vue";

const defaultColors = {
  high: '#ff0000',
  medium: '#ffcc00',
  low: '#00cc00'
}

export const settingsStore = {
  darkMode: ref(false),
  priorityColors: ref(null),
  sortBy: ref(''),

  init() {
    const storedPriorityColors = localStorage.getItem('priorityColors');
    this.priorityColors.value = storedPriorityColors ? JSON.parse(storedPriorityColors) : defaultColors;

    const storedDarkMode = localStorage.getItem('darkMode');
    this.darkMode.value = Boolean(JSON.parse(storedDarkMode)) || false;

    const storedSortBy = localStorage.getItem('sortBy');
    this.sortBy.value = storedSortBy || 'priority';

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

  updateSortBy(type) {
    console.log(`${this.sortBy.value} -> ${type}`, typeof type);
    console.log(`Old sortBy = ${this.sortBy.value}`);
    this.sortBy.value = type;
    console.log(`New sortBy = ${this.sortBy.value}`);
    console.log('===>>>', this.sortBy.value);
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
        console.log(`sortBy -> localStorage -> ${this.sortBy.value}`);
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
  (oldValue, newValue) => {
    console.log('Watcher - sortBy changed from', oldValue, 'to', newValue);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => settingsStore.saveLocalStorage('sortBy'), 500);
  }
);