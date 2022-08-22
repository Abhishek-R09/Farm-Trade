/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Alert,
  Collapse,
  IconButton,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
// import useStyles from "./styles";
import { Close as CloseIcon } from "@mui/icons-material/";
import { useSession } from "next-auth/react";

const crops = [
  "Paddy",
  "Wheat",
  "Barley",
  "Soya Bean",
  "Cotton",
  "Coconut",
  "Ground Nut Seeds",
  "Mustard Seed",
  "Sesamum",
  "Gram",
  "Sugarcane",
  "Arhar",
  "Ragi",
  "Maize",
  "Moong",
  "Masoor",
  "Urad",
  "Raw Jute",
  "Niger Seed",
  "Kardi Seed",
  "Sunflower",
  "Jowar",
  "Bajra",
];

const Admin = () => {
  const { status, data } = useSession();
  const [cropName, setCropName] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

  useEffect(() => {
    // console.log("in component did mount user is", username);
    const getFarmers = async () => {
      setError(false);
      setAlertMsg("");
      setLoading(true);
      try {
        const { data } = await axios.get("/api/user/getFarmers");
        console.log(data.result);
        setFarmers(data.result.map((farmer) => farmer.username));
        // setTop5Crops(top5.top5);
      } catch (error) {
        setError(true);
        setAlertMsg("Error fetching data!");
      }
      setLoading(false);
    };
    if (
      data?.user?.user?.roles.length > 0 &&
      data?.user?.user?.roles[0]?.name === "Admin"
    ) {
      getFarmers();
    }
  }, [data?.user?.user]);

  if (status === "loading" || status === "unauthenticated") {
    return <h1>Please Login to continue</h1>;
  }

  if (
    data?.user?.user?.roles.length > 0 &&
    data?.user?.user?.roles[0]?.name !== "Admin"
  )
    return <h1>Not Allowed!</h1>;

  // const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(cropName.label, username, rating, image);
    if (cropName === "") {
      setOpen(true);
      setError(true);
      setAlertMsg("Crop Name can't be empty!");
      return;
    }
    try {
      const res = await axios.post("/api/crops/addCrop", {
        cropName,
        username,
        rating,
        image,
      });
      console.log(res);
      setOpen(true);
      setAlertMsg("Successfully added new Crop!");
      setCropName("");
      setUsername("");
      setError(false);
    } catch (e) {
      console.log({ ...e });
      setOpen(true);
      setAlertMsg(`${e.response?.data?.msg} - Failed to add new crop!`);
      setError(true);
    }

    // console.log(res);
  };
  // useEffect(() => {
  //   if (!autoCompleteOpen) {
  //     setFarmers([]);
  //   }
  // }, [autoCompleteOpen]);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography
          sx={{
            color: "#1B5E20",
            fontFamily: "Merriweather",
            margin: "20px auto",
          }}
          variant="h3"
          component="h2"
        >
          Add a Crop
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xxs={12}>
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  // action={
                  //   <IconButton
                  //     aria-label="close"
                  //     color="inherit"
                  //     size="small"
                  //     onClick={() => {
                  //       setOpen(false);
                  //     }}
                  //   >
                  //     <CloseIcon fontSize="inherit" />
                  //   </IconButton>
                  // }
                  severity={error ? "error" : "success"}
                >
                  {alertmsg}
                  {/* "Hello" */}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xxs={12}>
              <Autocomplete
                fullWidth
                disablePortal
                id="cropName"
                clearOnEscape
                options={crops}
                getOptionLabel={(option) => option}
                onChange={(e, newVal) => setCropName(newVal)}
                renderInput={(params) => (
                  <TextField {...params} label="Crop Name" />
                )}
              />
              {/* <TextField
                variant="outlined"
                fullWidth
                label="Crop name"
                name="cropname"
                onChange={(e) => setCropName(e.target.value)}
              ></TextField> */}
            </Grid>
            <Grid item xxs={12}>
              <Autocomplete
                id="farmerUsername"
                // sx={{ width: 300 }}
                fullWidth
                open={autoCompleteOpen}
                onOpen={() => {
                  setAutoCompleteOpen(true);
                }}
                onClose={() => {
                  setAutoCompleteOpen(false);
                }}
                onChange={(e, newVal) => setUsername(newVal)}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) => option}
                options={farmers}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Farmer Username"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              {/* <TextField
                variant="outlined"
                fullWidth
                label="Farmer Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              ></TextField> */}
            </Grid>
            {/* <Grid item xs={12} sm={12}>
                <NumericInput
                  onChange={(val) => setRating(val)}
                  className="form-control"
                />
              </Grid> */}
            {/* <Grid item xs={12} sm={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(file) => setImage(file)}
                />
              </Grid> */}
            <Grid item xxs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Admin;
