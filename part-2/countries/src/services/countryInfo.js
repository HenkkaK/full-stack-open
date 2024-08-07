import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const APIKEY = import.meta.env.VITE_WTHR_KEY;

const getAll = async () => {
  const response = await axios.get(`${baseURL}/all`);
  return response.data;
};

const getInfo = async (country) => {
  const response = await axios.get(`${baseURL}/name/${country}`);
  return response.data;
};

const getWeather = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
  );
  return response.data;
};

export default { getAll, getInfo, getWeather };
