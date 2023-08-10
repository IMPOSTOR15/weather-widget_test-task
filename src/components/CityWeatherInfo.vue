<template>
  <div v-if="weatherData">
    <h2 class="city-text">{{ city }}</h2>
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
  <loading-indicator v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WindIco from '@/UI/Icons/WindIco.vue';
import PressureIcon from '@/UI/Icons/PressureIcon.vue';
import HumidityIcon from '@/UI/Icons/HumidityIcon.vue';
import MaxTempIcon from '@/UI/Icons/MaxTempIcon.vue';
import MinTempIcon from '@/UI/Icons/MinTempIcon.vue';
import LoadingIndicator from '@/UI/LoadingIndicator/loadingIndicator.vue';

export default defineComponent({
  name: 'WeatherInfo',
  components: {
    WindIco,
    PressureIcon,
    HumidityIcon,
    MaxTempIcon,
    MinTempIcon,
    LoadingIndicator,
  },
  props: {
    // eslint-disable-next-line no-undef
    weatherData: Object,
    city: String,
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
      const index = Math.round((this.weatherData?.wind?.deg % 360) / 22.5);
      return directions[index % 16];
    },
  },
});
</script>

<style scoped lang="scss">
.city-text {
  margin: 0;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: $main-gap;
}
</style>
