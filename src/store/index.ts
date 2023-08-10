import { createStore } from 'vuex';
import { getWeatherFromCityName } from '@/api';

export interface WeatherData {
  // eslint-disable-next-line
  [city: string]: any;
}
export interface State {
  cities: string[];
  weatherData: WeatherData;
}
const store = createStore<State>({
  state: {
    cities: JSON.parse(localStorage.getItem('cities') ?? '[]'),
    weatherData: {},
  },
  mutations: {
    ADD_CITY(state, city: string) {
      state.cities.push(city);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    REMOVE_CITY(state, index: number) {
      state.cities.splice(index, 1);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    SET_CITIES(state, cities: string[]) {
      state.cities = cities;
      localStorage.setItem('cities', JSON.stringify(cities));
    },
    // eslint-disable-next-line
    SET_WEATHER_DATA(state, payload: { city: string; data: any }) {
      state.weatherData[payload.city] = payload.data;
    },
  },
  actions: {
    async addCity({ commit }, city: string) {
      commit('ADD_CITY', city);
      const response = await getWeatherFromCityName(city);
      if (response && response.data) {
        commit('SET_WEATHER_DATA', { city, data: response.data });
      } else {
        console.warn(`Ошибка при получении данных о погоде для города ${city}`);
      }
    },
    removeCity({ commit }, index: number) {
      commit('REMOVE_CITY', index);
    },
    setCities({ commit }, cities: string[]) {
      commit('SET_CITIES', cities);
    },
    async setWeatherData({ commit, state }) {
      try {
        for (const city of state.cities) {
          const response = await getWeatherFromCityName(city);
          if (response && response.data) {
            commit('SET_WEATHER_DATA', { city, data: response.data });
          } else {
            console.warn(
              `Ошибка при получении данных о погоде для города ${city}`
            );
          }
        }
      } catch (error) {
        console.error('Произошла ошибка при обработке запросов:', error);
      }
    },
  },
});

export default store;
