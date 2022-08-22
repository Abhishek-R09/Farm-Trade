import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  FormControl,
  Select,
  InputLabel,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Alert,
  Snackbar,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const FarmerForm = (props) => {
  const { status, data } = useSession();

  const [alertMsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [cropsList, setCropsList] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [duration, setDuration] = useState(0);
  const [harvestDate, setHarvestDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // console.log("in component did mount user is", username);
    const getCrops = async () => {
      setError(false);
      setAlertMsg("");
      setLoading(true);
      try {
        const {
          data: {
            crops: { crops },
          },
        } = await axios.get(`/api/crops/getCrops`);
        let cropslist = crops.map(function (crop) {
          let x = {};
          x.name = crop.name;
          x.rating = crop.rating;
          x.id = crop._id;
          return x;
        });
        setCropsList(cropslist);
      } catch (error) {
        setError(true);
        setAlertMsg("Error fetching data!");
      }
      setLoading(false);
    };
    if (
      data?.user?.user?.roles.length > 0 &&
      data?.user?.user?.roles[0]?.name !== "Buyer"
    )
      getCrops();
  }, [data]);

  if (
    data?.user?.user?.roles.length > 0 &&
    data?.user?.user?.roles[0]?.name === "Buyer"
  )
    return <h1>Not Allowed!</h1>;

  const handleSubmit = async (e) => {
    // check if any of the fields are empty
    // if any of the fields are empty, show an alert message
    // if all the fields are filled, submit the form
    setLoading(true);

    if (selectedCrop === "") {
      setAlertMsg("Please select a crop");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please select a crop" });
      // setState({ open: true });
    } else if (startDate === null) {
      setAlertMsg("Please select a crop");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please select a start date" });
      // setState({ open: true });
    } else if (duration <= 0) {
      setAlertMsg("Please select a duration");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please select a duration" });
      // setState({ open: true });
    } else if (harvestDate === null) {
      setAlertMsg("Please select a harvest date");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please select a harvest date" });
      // setState({ open: true });
    } else if (quantity === 0) {
      setAlertMsg("Please enter a valid quantity");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please enter a quantity" });
      // setState({ open: true });
    } else if (description === "") {
      setAlertMsg("Please enter a description");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please enter a description" });
      // setState({ open: true });
    } else if (startPrice <= 0) {
      setAlertMsg("Please enter a valid start price");
      setOpen(true);
      setError(true);
      // setState({ alertmsg: "Please enter a start price" });
      // setState({ open: true });
    } else {
      e.preventDefault();
      try {
        const suc = await axios.post("/api/auctions/createauction", {
          //TODO: Add address here like : "localhost:3000/api/farmer/createauction"
          startdate: startDate,
          duration: duration,
          harvestdate: harvestDate,
          quantity: quantity,
          description: description,
          startprice: startPrice,
          crop: selectedCrop,
        });
        // console.log(suc);
        // setAlertMsg("Auction created successfully")
        // setOpen(true)
        setError(false);
        // setState({ alertmsg: "Auction created successfully" });
        // console.log("Auction Successfully Registered");
        setSelectedCrop("");
        setStartDate(null);
        setHour(0);
        setMinutes(0);
        setDescription("");
        setHarvestDate(null);
        setQuantity(0);
        setStartPrice(0);
        // router.push("/auction")
        router.push({
          pathname: "/auction",
          query: {
            msg: "Auction created successfully!",
          },
        });
      } catch (error) {
        // setState({ alertmsg: "Auction not created" });
        console.log(error.response?.data.message);
        setAlertMsg(`Auction not created! - ${error.response?.data.msg}`);
        setOpen(true);
        setError(true);
      }
    }
    // setOpen(true);
    setLoading(false);
  };

  const submit = (e) => {
    setAlertMsg("");
    setOpen(false);
    setError(false);
    // console.debug(states);
    // check if start date is in past. or harvest date is in future
    // if so, return with error
    // if not, submit the form

    // console.log("FARMER FORM: ", new Date(duration));

    if (new Date(startDate) < new Date()) {
      setAlertMsg("Start date cannot be in the past");
      setOpen(true);
      setError(true);
    } else if (new Date(harvestDate) > new Date()) {
      setAlertMsg("Harvest date cannot be in the future");
      setOpen(true);
      setError(true);
      // setState(prevState => ({ ...prevState, alertmsg: "Harvest date cannot be in the future", open: true }));
      // setState(prevState => ({ ...prevState, open: true }));
    } else {
      // setDuration(parseInt(hour) * 60 + parseInt(minutes))
      // states["duration"] =
      //   parseInt(states["durationhour"] * 60) + parseInt(states["durationminute"]);

      // console.log(states);
      handleSubmit(e);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return <h1>Please login to continue</h1>;
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Typography
        sx={{
          color: "#1B5E20",
          fontFamily: "Merriweather",
          margin: "20px auto",
        }}
        variant="h4"
        component="h2"
      >
        New Auction
      </Typography>
      <Box component="form" onSubmit={submit} sx={{ mt: 1, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xxs={12}>
            <FormControl fullWidth>
              <InputLabel>Crop</InputLabel>
              <Select
                value={selectedCrop}
                label="Crop"
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                {loading && (
                  <MenuItem>
                    <CircularProgress />
                  </MenuItem>
                )}
                {cropsList.map((crop) => (
                  <MenuItem value={crop.id} key={crop.id}>
                    {crop.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xxs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <Stack spacing={3}> */}
              <TextField
                id="datetime-local"
                label="Start date"
                type="datetime-local"
                // defaultValue={new Date().toLocaleDateString()}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                sx={{
                  width: { xxs: "100%", md: "50%" },
                  mt: { xxs: 1 },
                  mb: { xxs: 1 },
                }}
                InputLabelProps={{
                  shrink: true,
                  min: new Date(
                    new Date() - new Date().getTimezoneOffset() * 60 * 1000
                  )
                    .toISOString()
                    .slice(0, -8),
                }}
              />
              {/* <DateTimePicker
                  label="Date desktop"
                  // inputFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={(newVal) => setStartDate(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              {/* </Stack> */}
            </LocalizationProvider>
            <TextField
              type="number"
              className="form-control"
              min="0"
              max="23"
              label="Auction Hours"
              value={hour}
              sx={{
                width: { xxs: "100%", xs: "49%", md: "20%" },
                mt: { xxs: 1 },
                mb: { xxs: 1 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Hrs.</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setHour(e.target.value);
                setDuration(parseInt(e.target.value) * 60 + parseInt(minutes));
              }}
            />
            <TextField
              type="number"
              className="form-control"
              label="Auction Minutes"
              value={minutes}
              min="0"
              max="59"
              sx={{
                width: { xxs: "100%", xs: "49%", md: "20%" },
                mt: { xxs: 1 },
                mb: { xxs: 1 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Min.</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setMinutes(e.target.value);
                setDuration(parseInt(hour) * 60 + parseInt(e.target.value));
              }}
            />
          </Grid>
          <Grid item xxs={12}>
            <TextField
              type="text"
              className="form-control"
              label="Description"
              value={description}
              sx={{ width: { xxs: "100%" }, mt: { xxs: 1 }, mb: { xxs: 1 } }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid
            item
            xxs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* <Stack spacing={3}> */}
              <TextField
                id="date-local"
                label="Harvest date"
                type="date"
                // defaultValue={new Date().toLocaleDateString()}
                onChange={(e) => setHarvestDate(e.target.value)}
                sx={{
                  width: { xxs: "100%", md: "50%" },
                  mt: { xxs: 1 },
                  mb: { xxs: 1 },
                }}
                value={harvestDate}
                InputLabelProps={{
                  shrink: true,
                  max: new Date().toISOString().split("T")[0],
                }}
              />
            </LocalizationProvider>
            <TextField
              type="number"
              className="form-control"
              label="Quantity"
              value={quantity}
              sx={{
                width: { xxs: "100%", xs: "49%", md: "20%" },
                mt: { xxs: 1 },
                mb: { xxs: 1 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Kg</InputAdornment>
                ),
              }}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              type="number"
              className="form-control"
              label="Start Price"
              value={startPrice}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">&#8377;</InputAdornment>
                ),
              }}
              sx={{
                width: { xxs: "100%", xs: "49%", md: "20%" },
                mt: { xxs: 1 },
                mb: { xxs: 1 },
              }}
              onChange={(e) => setStartPrice(e.target.value)}
            />
          </Grid>
          <Grid item xxs={12}>
            <Button variant="contained" onClick={submit}>
              Submit
              {loading && <CircularProgress />}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen((prev) => !prev);
          setAlertMsg("");
          setError(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen((prev) => !prev);
            setAlertMsg("");
            setError(false);
          }}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
  // }
};

export default FarmerForm;
