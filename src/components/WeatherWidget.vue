<template>
  <div class="container">
    <cross-icon
      v-if="settingsShow"
      @click="toggleSettings"
      class="settings-icon"
      :width="'30px'"
      :height="'30px'"
    />
    <settings-ico
      v-else
      @click="toggleSettings"
      class="settings-icon"
      :width="'30px'"
      :height="'30px'"
    />
    <weather-settings v-if="settingsShow" />
    <div class="cities-column" v-else>
      <h2 v-if="!cities.length">У вас нет добавленных городов</h2>
      <city-weather-info
        v-else
        v-for="city in cities"
        :key="city"
        :weatherData="weatherData[city]"
        :city="city"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsIco from '@/UI/Icons/SettingsIco.vue';
import CrossIcon from '@/UI/Icons/CrossIcon.vue';
import CityWeatherInfo from './CityWeatherInfo.vue';
import WeatherSettings from './WeatherSettings.vue';
import { mapActions, mapState } from 'vuex';
import { getWeatherFromCoordinates } from '@/api/';

export default defineComponent({
  components: {
    SettingsIco,
    CrossIcon,
    CityWeatherInfo,
    WeatherSettings,
  },
  computed: {
    ...mapState(['cities', 'weatherData']),
  },
  data() {
    return {
      settingsShow: false,
    };
  },
  methods: {
    ...mapActions(['setWeatherData', 'addCity']),
    toggleSettings() {
      this.settingsShow = !this.settingsShow;
    },
    async getUserGeolocation(): Promise<{
      latitude: number;
      longitude: number;
    }> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        }, reject);
      });
    },
  },
  async mounted() {
    this.setWeatherData();
    if (this.cities.length === 0 && 'geolocation' in navigator) {
      try {
        const coordinates = await this.getUserGeolocation();
        const response: any = await getWeatherFromCoordinates(
          coordinates.latitude,
          coordinates.longitude
        );
        this.addCity(response.data.name);
      } catch (error) {
        console.error('Не удалось получить геолокацию:', error);
      }
    }
  },
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: $container-width;
  gap: $main-gap;
  border: 2px solid black;
  text-align: left;
  margin: 0 auto;
  .settings-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: $icon-size;
    height: $icon-size;
  }
  .cities-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
