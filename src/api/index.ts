import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherFromCityName(city: string) {
  const API_KEY: string = process.env.VUE_APP_WEATHER_API_KEY;
  const url: string = `${baseUrl}?q=${city}&lang=ru&units=metric&APPID=${API_KEY}`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.error('Произошла ошибка при получении данных о погоде:', error);
  }
}

export async function getWeatherFromCoordinates(lat: number, lon: number) {
  const API_KEY: string = process.env.VUE_APP_WEATHER_API_KEY;
  console.log(lat, lon);
  const url: string = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.error('Произошла ошибка при получении данных о погоде:', error);
  }
}
