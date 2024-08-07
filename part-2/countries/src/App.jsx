import { useState, useEffect } from "react";
import countryService from "./services/countryInfo";

const CountryList = ({ countryList, showInfo }) => {
  if (countryList.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {countryList.map((country) => {
        return (
          <li key={country.name.common}>
            {`${country.name.common}`}
            <button onClick={() => showInfo(country)}>info</button>
          </li>
        );
      })}
    </ul>
  );
};

const Filter = ({ filterValue, handleFilterInputChange }) => {
  return (
    <>
      Find countries{" "}
      <input value={filterValue} onChange={handleFilterInputChange} />
    </>
  );
};

const CountryInfo = ({ country, weather }) => {
  if (!country) return null;
  if (!weather) return null;
  const langKeys = Object.keys(country.languages);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>{`Capital: ${country.capital}`}</p>
      <p>{`Area: ${country.area}`}</p>
      <h3>Languages</h3>
      <ul>
        {langKeys.map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>{`Weather in ${country.capital}`}</h2>
      <p>{`Temperature: ${(weather.main.temp - 273.15).toFixed(2)} Celsius`}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>{`Wind: ${weather.wind.speed.toFixed(2)} m/s`}</p>
    </>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [info, setInfo] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    updateAllCountries();
  }, []);

  useEffect(() => {
    updateCountries();
  }, [input]);

  useEffect(() => {
    checkCountryToShow();
  }, [countries]);

  const updateAllCountries = async () => {
    const all = await countryService.getAll();
    setAllCountries(all);
    setCountries(all);
  };

  const handleFilterInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const checkCountryToShow = () => {
    if (countries.length !== 1) {
      setInfo(null);
      return;
    }
    updateCountryInfo(countries[0]);
  };

  const updateCountries = () => {
    const filteredList = allCountries.map((country) => {
      if (country.name.common.toLowerCase().includes(input.toLowerCase()))
        return country;
    });
    setCountries(filteredList.filter((country) => !!country));
  };

  const updateCountryInfo = async (country) => {
    updateCountryWeather(country);
    const info = await countryService.getInfo(country.name.common);
    setInfo(info);
  };

  const updateCountryWeather = async (country) => {
    const weather = await countryService.getWeather(
      country.latlng[0],
      country.latlng[1]
    );
    setWeather(weather);
  };

  return (
    <>
      <Filter
        filterValue={input}
        handleFilterInputChange={handleFilterInputChange}
      />
      <CountryInfo country={info} weather={weather} />
      {info ? null : (
        <CountryList countryList={countries} showInfo={updateCountryInfo} />
      )}
    </>
  );
};

export default App;
