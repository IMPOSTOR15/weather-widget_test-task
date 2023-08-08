<template>
  <div class="container">
    <settings-ico class="settings-icon" :width="'30px'" :height="'30px'" />
    <nav class="top-nav">
      <h2 class="city-text">{{ city }}</h2>
    </nav>
    <section v-if="weatherData" class="main-section">
      <div class="top-data">
        <img
          class="top-weather_icon"
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
          alt=""
        />
        <span class="top-temp-text">{{ weatherData.main.temp }} °C</span>
      </div>
      <p>
        {{
          `Ощущается как ${weatherData.main.feels_like}. ${weatherData.weather[0].description}.`
        }}
      </p>
      <div class="aditional-info">
        <div class="info-block">
          <max-temp-icon :width="'30px'" :height="'30px'" />
          <span>{{ weatherData.main.temp_max }} °C</span>
        </div>
        <div class="info-block">
          <min-temp-icon :width="'30px'" :height="'30px'" />
          <span>{{ weatherData.main.temp_min }} °C</span>
        </div>
        <div class="info-block">
          <wind-ico :width="'30px'" :height="'30px'" />
          <span>{{ weatherData.wind.speed }} м/c {{ windDirection }}</span>
        </div>
        <div class="info-block">
          <pressure-icon :width="'30px'" :height="'30px'" />
          <span>{{ weatherData.main.pressure }} Па</span>
        </div>
        <div class="info-block">
          <humidity-icon :width="'30px'" :height="'30px'" />
          <span>{{ weatherData.main.humidity }} %</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import SettingsIco from '@/UI/Icons/SettingsIco.vue';
import WindIco from '@/UI/Icons/WindIco.vue';
import PressureIcon from '@/UI/Icons/PressureIcon.vue';
import HumidityIcon from '@/UI/Icons/HumidityIcon.vue';
import MaxTempIcon from '@/UI/Icons/MaxTempIcon.vue';
import MinTempIcon from '@/UI/Icons/MinTempIcon.vue';

export default defineComponent({
  components: {
    SettingsIco,
    WindIco,
    PressureIcon,
    HumidityIcon,
    MaxTempIcon,
    MinTempIcon,
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      weatherData: null as any,
      city: 'Moscow',
    };
  },

  methods: {
    async fetchWeather() {
      const API_KEY: string = process.env.VUE_APP_WEATHER_API_KEY;
      const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=ru&units=metric&APPID=${API_KEY}`;
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
        console.log(response);
      } catch (error) {
        console.error('Произошла ошибка при получении данных о погоде:', error);
      }
    },
  },
  computed: {
    windDirection() {
      const directions = [
        'С',
        'ССВ',
        'СВ',
        'ВСВ',
        'В',
        'ВЮВ',
        'ЮВ',
        'ЮЮВ',
        'Ю',
        'ЮЮЗ',
        'ЮЗ',
        'ЗЮЗ',
        'З',
        'ЗСЗ',
        'СЗ',
        'ССЗ',
      ];
      const index = Math.round((this.weatherData.wind.deg % 360) / 22.5);
      return directions[index % 16];
    },
  },
  mounted() {
    this.fetchWeather();
  },
});
</script>

<style lang="scss" scoped>
$container-width: 400px;
$icon-size: 30px;
$weather-icon-size: 100px;
$top-data-font: 2rem;
$info-block-width: 170px;
$main-gap: 10px;
$aditional-info-gap: 20px;

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: $main-gap;
  width: $container-width;
  border: 2px solid black;
  text-align: left;
  margin: 0 auto;
  .settings-icon {
    position: absolute;
    top: $main-gap;
    right: $main-gap;
    cursor: pointer;
    width: $icon-size;
    height: $icon-size;
  }
  .top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .city-text {
      margin: 0;
    }
  }
  .main-section {
    display: flex;
    flex-direction: column;
    gap: $main-gap;
  }
  .top-weather_icon {
    width: $weather-icon-size;
    height: $weather-icon-size;
  }
  .top-data {
    @include flex-center;
    font-weight: bold;
    font-size: $top-data-font;
  }
  .info-block {
    display: flex;
    align-items: center;
    width: $info-block-width;
    gap: $main-gap;
  }
  .aditional-info {
    display: flex;
    flex-wrap: wrap;
    gap: $aditional-info-gap;
  }
}
</style>
