import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { fetchDetails } from "../api/api";
import { Box } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const formatedDate = (dt) => {
  const timestamp = dt;

  const dateObj = new Date(timestamp);
  return (
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
    dateObj.getSeconds()
  );
};

export default function WeatherDialog({ data }) {
  const [open, setOpen] = React.useState(false);
  const [currentDetails, setCurrentDetails] = React.useState();
  const [formatedDetails, setFormatedDetails] = React.useState();

  React.useEffect(() => {
    if (currentDetails) {
      console.log(currentDetails);
      const filteredDetails = currentDetails.list.map((el, index) => {
        return {
          name: currentDetails.city.name,
          id: currentDetails.city.id,
          date: formatedDate(el.dt),
          temp: el.main.temp,
          temp_min: el.main.temp_min,
          temp_max: el.main.temp_max,
          icon: el.weather[0].icon,
        };
      });

      setFormatedDetails(filteredDetails);
    }
  }, [currentDetails]);

  const handleClickOpen = () => {
    handleDetails();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDetails = async () => {
    const { coord } = data;
    const details = await fetchDetails(coord);
    setCurrentDetails(details);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Details
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {formatedDetails ? currentDetails?.city.name : ""}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box style={{ display: "flex", gap: 10 }}>
            {formatedDetails
              ? formatedDetails.map((el, index) => (
                  <Box
                    sx={{
                      boxShadow: "1px 2px 3px 0 rgba(0,0,0,0.3)",
                      padding: 3,
                      justifyContent: "center",
                      minWidth: 200,
                    }}
                    key={`${el.id} + ${index}`}
                  >
                    <img
                      src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`}
                    />
                    <Typography gutterBottom>{el.date}</Typography>
                    <Typography sx={{ fontSize: 12 }} gutterBottom>
                      temperatura: {el.temp} ºC
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: 12 }} gutterBottom>
                        ⬇️{el.temp_min} ºC
                      </Typography>
                      <Typography sx={{ fontSize: 12 }} gutterBottom>
                        ⬆️{el.temp_max} ºC
                      </Typography>
                    </div>
                  </Box>
                ))
              : null}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
