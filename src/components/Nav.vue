<template>
  <nav>
    <router-link v-for="route in routes" :to="route.to" :class="['nav-link', 'tab', {active: isActive(route.state)}]" >{{ route.label }}</router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const routes = [
  {
    to: '/task?state=today',
    state: 'today',
    label: 'Today'
  },
  {
    to: '/task?state=upcoming',
    state: 'upcoming',
    label: 'Upcoming'
  },
  {
    to: '/task?state=completed',
    state: 'completed',
    label: 'Completed'
  }
];

const router = useRoute();

const isActive = (state) => {
  console.log('isActive: ', state, router.query?.state && router.query.state === state)
  return router.query?.state && router.query.state === state
}
</script>

<style scoped>
nav {
  background-color: #ffffff;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

nav a {
  text-decoration: none;
  color: #4179bd;
}

.tab {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
}

.tab:hover {
  border-bottom: 2px solid #4a90e2;
  color: #4a90e2;
}

.tab.active {
  border-bottom: 2px solid #4a90e2;
  color: #4a90e2;
}
</style>