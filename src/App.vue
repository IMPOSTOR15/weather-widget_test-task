<template>
  <weather-widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';

export default defineComponent({
  components: { WeatherWidget },
  name: 'App',
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
