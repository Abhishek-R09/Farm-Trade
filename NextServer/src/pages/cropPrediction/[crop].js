import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  TextField,
  Container,
  Typography,
  IconButton,
  Collapse,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Pagination,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  InputAdornment,
  Skeleton,
  Box,
  LinearProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";
import wheatImg from "../../Images/wheat.jpg";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { styled, useTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Next 12 Months Prediction",
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Previous Year Data",
    },
  },
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CommodityPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [cropData, setCropData] = useState({});
  const [forecastDataset, setForecastDataset] = useState({
    labels: ["a"],
    data: [
      {
        label: "Loading",
        data: [1],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [previousDataset, setPreviousDataset] = useState([]);
  const [bids, setBids] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { crop } = router.query;
  console.log(crop);
  const { data: session, status } = useSession();
  const user = session?.user?.user;
  const role = user?.roles[0].name;

  useEffect(() => {
    // console.log("in component did mount user is", username);
    const getCropDetails = async () => {
      setError(false);
      setAlertMsg("");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/getCommodityDetails/${crop}`
        );
        console.log(data);
        setCropData(data);
        setForecastDataset({
          labels: data.forecast_x,
          datasets: [
            {
              label: "Forecast Data",
              data: data.forecast_y,
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.light,
            },
          ],
        });
        setPreviousDataset({
          labels: data.previous_x,
          datasets: [
            {
              label: "Previous Data",
              data: data.previous_y,
              borderColor: theme.palette.secondary.dark,
              backgroundColor: theme.palette.secondary.light,
            },
          ],
        });
      } catch (error) {
        setError(true);
        setAlertMsg("Error fetching data!");
      }
      setLoading(false);
    };

    if (
      session?.user?.user?.roles.length > 0 &&
      session?.user?.user?.roles[0]?.name !== "Buyer"
    ) {
      getCropDetails();
    }
  }, [session?.user?.user]);

  if (
    session?.user?.user?.roles.length > 0 &&
    session?.user?.user?.roles[0]?.name === "Buyer"
  )
    return <h1>Not Allowed!</h1>;

  if (status === "loading" || status === "unauthenticated") {
    return <h1>Please Login to continue!</h1>;
  }

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {!loading && status === "authenticated" && (
        <Container sx={{ marginBottom: "20px" }}>
          <Typography
            sx={{
              color: "#1B5E20",
              fontFamily: "Merriweather",
              margin: "20px auto",
            }}
            variant="h3"
            component="h2"
          >
            {cropData.name}
          </Typography>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ mb: 3 }}>
            <Grid item xxs={12} xs={8} sm={12} md={7} lg={6}>
              <Card>
                <CardMedia alt={`${cropData.name} Crop`}>
                  <Image src={wheatImg} alt="Wheat Crop" />
                </CardMedia>
                {/* <CardActions sx={{ justifyContent: "center" }}>
                  <Pagination count={1} variant="outlined" />
                </CardActions> */}
                <CardContent sx={{ padding: "16px !important" }}>
                  <List disablePadding dense>
                    <ListItem disablePadding dense disableGutters>
                      <ListItemButton disableGutters>
                        <ListItemIcon>
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Current Price"
                          secondary={
                            <span>&#8377;{cropData?.current_price || ""}</span>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding dense disableGutters>
                      <ListItemButton disableGutters>
                        <ListItemIcon>
                          <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Prime Location"
                          secondary={cropData?.prime_loc || ""}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding dense disableGutters>
                      <ListItemButton disableGutters>
                        <ListItemIcon>
                          <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Crop Type"
                          secondary={cropData?.type_c || ""}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding dense disableGutters>
                      <ListItemButton disableGutters>
                        <ListItemIcon>
                          <ImportExportIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Exports"
                          secondary={cropData?.export || 0}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xxs={12} xs={8} sm={12} md={5} lg={6}>
              <Card>
                <CardContent sx={{ padding: "8px 16px !important" }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Merriweather" }}
                  >
                    Brief Forecast
                  </Typography>
                  <List>
                    <ListItem disablePadding disableGutters>
                      <ListItemButton dense>
                        <ListItemIcon>
                          <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Maximum Price Prediction" />
                      </ListItemButton>
                    </ListItem>
                    <List component="div" disablePadding>
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
                        <ListItemButton sx={{ pl: 4 }} dense>
                          <ListItemIcon>
                            <CalendarMonthIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              (cropData?.max_crop && cropData?.max_crop[0]) ||
                              ""
                            }
                          />
                        </ListItemButton>
                      </Typography>
                      <ListItemButton sx={{ pl: 4 }} dense>
                        <ListItemIcon>
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            (cropData?.max_crop && cropData.max_crop[1]) || ""
                          }
                        />
                      </ListItemButton>
                    </List>
                    <Divider />
                    <ListItem disablePadding disableGutters>
                      <ListItemButton dense>
                        <ListItemIcon>
                          <TrendingDownIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mininum Price Prediction" />
                      </ListItemButton>
                    </ListItem>
                    <List component="div" disablePadding>
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
                        <ListItemButton sx={{ pl: 4 }} dense>
                          <ListItemIcon>
                            <CalendarMonthIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              (cropData?.min_crop && cropData?.min_crop[0]) ||
                              ""
                            }
                          />
                        </ListItemButton>
                      </Typography>
                      <ListItemButton sx={{ pl: 4 }} dense>
                        <ListItemIcon>
                          <CurrencyRupeeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            (cropData?.min_crop && cropData?.min_crop[1]) || ""
                          }
                        />
                      </ListItemButton>
                    </List>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            {/* </Grid> */}
            <Grid item xxs={12} lg={8}>
              <TableContainer
                component={Paper}
                sx={{ mb: 3, width: "100%", ml: "auto", mr: "auto" }}
              >
                <Table size="medium" aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{ width: "300px" }}>
                      <TableCell sx={{ width: "max-content" }}>
                        <Typography
                          sx={{
                            color: "#1B5E20",
                            fontFamily: "Merriweather",
                            // margin: "20px auto",
                          }}
                          variant="h6"
                          component="h6"
                        >
                          Forecast Trends - Next 12 months
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell sx={{ width: "100px" }}>
                        Month
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "100px" }}>
                        Price (&#8377; per Qtl.)
                      </StyledTableCell>
                      <StyledTableCell sx={{ width: "100px" }}>
                        Change Based on Current Price(%)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cropData?.forecast_values &&
                      cropData.forecast_values.map((row) => (
                        <StyledTableRow key={row[0]}>
                          <StyledTableCell component="th" scope="row">
                            {row[0]}
                          </StyledTableCell>
                          <StyledTableCell>{row[1]}</StyledTableCell>
                          <TableCell
                            sx={{
                              color:
                                row[2] > 0
                                  ? "success.light"
                                  : row[2] < 0
                                  ? "error.light"
                                  : "info.light",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "right",
                              }}
                            >
                              {row[2]}
                              {row[2] > 0 ? (
                                <ArrowDropUpIcon />
                              ) : row[2] < 0 ? (
                                <ArrowDropDownIcon />
                              ) : (
                                <TrendingFlatIcon />
                              )}
                            </span>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Grid container> */}
            <Grid item xxs={12} lg={8}>
              <Paper sx={{ padding: 2 }}>
                <Typography
                  variant="h5"
                  // component="div"
                  sx={{ fontFamily: "Merriweather", mb: 2 }}
                >
                  Forecast Chart - Next 12 months
                </Typography>
                <Line data={forecastDataset} options={options1} />
              </Paper>
            </Grid>
            <Grid item xxs={12} lg={8}>
              <Paper sx={{ padding: 2 }}>
                <Typography
                  variant="h5"
                  // component="div"
                  sx={{ fontFamily: "Merriweather", mb: 2 }}
                >
                  Previous Year Trends
                </Typography>
                <Line data={previousDataset} options={options2} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default CommodityPage;
