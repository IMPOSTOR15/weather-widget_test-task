<template>
  <h2 class="settings_header">Settings</h2>
  <div class="cities-list" @dragover.prevent @drop="dropHandler">
    <settings-city-element
      v-for="(city, index) in cities"
      :key="index"
      :city="city"
      @delete-city="deleteCityHandler"
    />
  </div>
  <h4 class="add-city_header">Добавить город:</h4>
  <div class="add-city_wrtapper">
    <input class="city-input" type="text" v-model="city" />
    <add-icon
      @click="addCityHandler"
      class="add-icon"
      :width="'40px'"
      :height="'40px'"
    />
  </div>
</template>

<script lang="ts">
import AddIcon from '@/UI/Icons/AddIcon.vue';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
import SettingsCityElement from './SettingsComponents/SettingsCityElement.vue';

export default defineComponent({
  components: { SettingsCityElement, AddIcon },
  name: 'WeatherSettings',
  computed: {
    ...mapState(['cities']),
  },
  data() {
    return {
      city: '',
    };
  },
  methods: {
    ...mapActions(['addCity', 'removeCity', 'setCities']),
    addCityHandler() {
      if (this.city) {
        if (this.cities.indexOf(this.city) === -1) {
          this.addCity(this.city);
        }
        this.city = '';
      }
    },
    deleteCityHandler(cityToDelete: string) {
      const index = this.cities.indexOf(cityToDelete);
      if (index > -1) {
        this.removeCity(index);
      }
    },
    dropHandler(event: DragEvent) {
      const draggedCity = event.dataTransfer?.getData('text/plain');
      if (draggedCity === undefined) return;
      const fromIndex = this.cities.indexOf(draggedCity);
      const container = event.currentTarget as HTMLElement;
      const relativeY = event.clientY - container.getBoundingClientRect().top;
      const itemHeight = container.children[0].clientHeight;
      const toIndex = Math.floor(relativeY / itemHeight);
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        const citiesCopy = [...this.cities];
        citiesCopy.splice(fromIndex, 1);
        citiesCopy.splice(toIndex, 0, draggedCity);
        this.setCities(citiesCopy);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.settings_header,
.add-city_header {
  display: inline;
  margin: 0;
}
.add-city_wrtapper {
  @include flex-center;
  gap: $main-gap;
  .city-input {
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.2rem 0.75rem;
    font-family: inherit;
    font-size: 1rem;
    background-clip: padding-box;
    border: 1px solid $default-border-color;
    border-radius: $default-border-radius;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      border-color: $default-border-color;
      outline: 0;
      box-shadow: 0 0 0 0.2rem $focus-box-shadow-color;
    }
  }
  .add-icon {
    cursor: pointer;
  }
}
</style>
