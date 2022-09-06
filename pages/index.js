import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import SearchInput from "../components/SearchInput";
import { CityContext } from "../contexts/cities.context";
import AlertMessage from "../components/AlertMessage";
import { addNewWeather } from "../api/api";

export default function Index() {
  const [errorMessage, setErrorMessage] = React.useState();

  const { cityFromAPI, setCity, resetCity, currentData, setCurrentData } =
    React.useContext(CityContext);

  React.useEffect(() => {
    if (cityFromAPI?.error) {
      return errorMessage?.length ? null : setErrorMessage(cityFromAPI.message);
    }
    if (cityFromAPI) {
      setCurrentData([...currentData, cityFromAPI]);
    }
  }, [cityFromAPI]);

  React.useEffect(() => {
    if (errorMessage) setTimeout(() => setErrorMessage(), 5000);
  }, [errorMessage]);

  const handleClear = (id) => {
    const filteredArr = currentData.filter((el) => el.id !== id);
    setCurrentData(filteredArr);
  };

  const handleLike = (id) => {
    const filteredArr = currentData.map((el) =>
      el.id === id ? { ...el, saved: true } : el
    );

    const filteredData = currentData.filter((el) => el.id === id);
    addNewWeather(filteredData);
    setCurrentData(filteredArr);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Between Weather Challenge
          </Typography>
          <SearchInput />
          {errorMessage && <AlertMessage message={errorMessage} />}
          {currentData[0] ? (
            currentData.map((el, index) => (
              <WeatherCard
                data={el}
                key={index}
                handleClear={handleClear}
                handleLike={handleLike}
              />
            ))
          ) : (
            <p>Selecciona una ciudad para empezar</p>
          )}

          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
