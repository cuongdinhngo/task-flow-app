<template>
  <header>
    <h1>TaskFlow</h1>
    <button class="mode-toggle" @click="openSettings"><font-awesome-icon icon="fa-cog"/></button>
  </header>

  <Settings />
</template>

<script setup>
import { inject } from 'vue';
import Settings from './Settings/Settings.vue';

const showSettings = inject('showSettings');
const openSettings = () => {
  showSettings.value = true;
};

</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #4a90e2;
  color: #ffffff;
}

h1 {
  font-size: 20px;
}

.process {
  width: 45px;
  height: 45px;
  background: #8abaf3;
  line-height: 45px;
  border-radius: 50%;
  text-align: center;
}

.mode-toggle {
  background: none;
  border: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}

.mode-toggle i {
  vertical-align: middle; /* Ensures icon aligns nicely */
}
</style>