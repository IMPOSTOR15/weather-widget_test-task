import 'normalize.css';
import store from './store';
import { createApp } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';

const widgetElements = document.querySelectorAll('weather-widget');
widgetElements.forEach((el) => {
  const app = createApp(WeatherWidget);
  app.use(store);
  app.mount(el);
});
