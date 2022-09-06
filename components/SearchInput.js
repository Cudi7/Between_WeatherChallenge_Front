import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CityContext } from "../contexts/cities.context";
import { Button, ButtonGroup } from "@mui/material";

export default function SearchInput() {
  const { currentCity, setCity, resetCity, handleFetch } =
    React.useContext(CityContext);

  const handleChange = (e) => setCity(e.target.value);

  const handleSearch = () => handleFetch();

  return (
    <Box sx={{ maxWidth: 320 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentCity}
          label="City"
          onChange={handleChange}
        >
          <MenuItem value={"Barcelona"}>Barcelona</MenuItem>
          <MenuItem value={"London"}>London</MenuItem>
          <MenuItem value={"Madrid"}>Madrid</MenuItem>
          <MenuItem value={"Beijin"}>Beijin</MenuItem>
        </Select>
        {currentCity ? (
          <ButtonGroup sx={{ my: 1 }}>
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={resetCity}>Reset</Button>
          </ButtonGroup>
        ) : null}
      </FormControl>
    </Box>
  );
}
