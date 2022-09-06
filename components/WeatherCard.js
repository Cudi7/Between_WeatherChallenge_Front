import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WeatherDialog from "./WeatherDialog";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function WeatherCard({ data, handleClear, handleLike }) {
  const { coord, id, main, name, weather, dt } = data;
  const { feels_like, temp, temp_max, temp_min } = main;
  const { icon, description } = weather[0];

  const timestamp = dt;

  const dateObj = new Date(timestamp);
  const formatedDate =
    dateObj.getDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear() +
    " " +
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes() +
    ":" +
    dateObj.getSeconds();

  const handleClearButton = () => handleClear(id);
  const handleLikeButton = () => handleLike(id);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                sx={{ fontSize: 16, mb: 2 }}
                color="text.secondary"
                gutterBottom
              >
                {`${name}`}
              </Typography>
              <Typography variant="caption">{formatedDate}</Typography>
              <Typography>{`Current temperature ${temp} ºC`}</Typography>
              <Typography variant="caption">{`(feels like ${feels_like} ºC)`}</Typography>
            </div>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          </div>

          <Typography variant="h5" component="div" sx={{ mt: 3 }}>
            {`${weather[0].main}, ${description}`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`min: ${temp_min} ºC, max: ${temp_max} ºC`}
          </Typography>
          <Typography variant="body2">
            <a
              target="blank"
              href={`https://www.google.com/maps/@${coord.lat},${coord.lon},14z`}
            >
              View en maps
            </a>
          </Typography>
        </CardContent>
        <CardActions>
          <WeatherDialog data={data} />
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            endIcon={
              <FavoriteBorderIcon color={data.saved ? "error" : "grey"} />
            }
            color="success"
            onClick={handleLikeButton}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            color="warning"
            endIcon={<ClearIcon />}
            onClick={handleClearButton}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
