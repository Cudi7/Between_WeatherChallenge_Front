import { createContext, useState } from "react";
import { fetchCityByName } from "../api/api";

export const CityContext = createContext(null);

const existingCity = (arr, city) => arr.filter((el) => el.name === city);

export function CityProvider(props) {
  const [currentCity, setCurrentCity] = useState(""); // current City
  const [cityFromAPI, setCityFromAPI] = useState(""); // single city from API
  const [currentData, setCurrentData] = useState([]); //data array

  const setCity = (city) => setCurrentCity(city);
  const resetCity = () => setCurrentCity("");

  const handleFetch = async () => {
    if (existingCity(currentData, currentCity).length) return;
    const cityFromApi = await fetchCityByName(currentCity);
    resetCity();
    setCityFromAPI(cityFromApi);
  };

  return (
    <CityContext.Provider
      value={{
        currentCity,
        setCity,
        resetCity,
        handleFetch,
        cityFromAPI,
        currentData,
        setCurrentData,
      }}
    >
      {props.children}
    </CityContext.Provider>
  );
}
