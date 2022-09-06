const key = `c9ab0150a0f70fd7bea8eb1d869c9eee`;

const fetchCityByName = async (name) => {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=${key}`
  );
  const data = await res.json();

  return data.cod === 200 ? data : { error: data.cod, message: data.message };
};

const fetchDetails = async (coord) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${key}`
  );
  const data = await res.json();

  return data.cod === "200" ? data : { error: data.cod, message: data.message };
};

const addNewWeather = async (cityData) => {
  console.log("adding data: ");
  console.log(cityData);
  try {
    const response = await fetch("http://localhost:5000/api/city/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityData[0]),
    });
    const data = await response.json();
  } catch (error) {
    // enter your logic for when there is an error (ex. error toast)

    console.log(error);
  }
};

const deleteOne = async (id) => {
  try {
    let response = await fetch(`http://localhost:5000/api/city/delete/${id}`, {
      method: "DELETE",
    });
  } catch (err) {}
};

export { fetchCityByName, fetchDetails, addNewWeather, deleteOne };
