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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
import axios from "axios";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TrendingCropsPage = (props) => {
  const { status, data } = useSession();

  const [alertMsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [top5Crops, setTop5Crops] = useState([]);
  const [bottom5Crops, setBottom5Crops] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // console.log("in component did mount user is", username);
    const getTop5 = async () => {
      setError(false);
      setAlertMsg("");
      setLoading(true);
      try {
        const { data: top5 } = await axios.get(
          `http://localhost:5000/getTopFive`
        );
        console.log(top5.top5);
        setTop5Crops(top5.top5);
      } catch (error) {
        setError(true);
        setAlertMsg("Error fetching data!");
      }
      setLoading(false);
    };
    const getBottom5 = async () => {
      setError(false);
      setAlertMsg("");
      setLoading(true);
      try {
        const { data: bottom5 } = await axios.get(
          `http://localhost:5000/getBottomFive`
        );
        console.log(bottom5.bottom5);
        setBottom5Crops(bottom5.bottom5);
      } catch (error) {
        setError(true);
        setAlertMsg("Error fetching data!");
      }
      setLoading(false);
    };
    if (
      data?.user?.user?.roles.length > 0 &&
      data?.user?.user?.roles[0]?.name !== "Buyer"
    ) {
      getTop5();
      getBottom5();
    }
  }, [data?.user?.user]);

  if (
    data?.user?.user?.roles.length > 0 &&
    data?.user?.user?.roles[0]?.name === "Buyer"
  )
    return <h1>Not Allowed!</h1>;

  if (status === "loading" || status === "unauthenticated") {
    return <h1>Please login to continue</h1>;
  }

  return (
    <Container sx={{ mt: 3, mb: 3 }}>
      <Typography
        sx={{
          color: "#1B5E20",
          fontFamily: "Merriweather",
          margin: "20px auto",
        }}
        variant="h4"
        component="h2"
      >
        Trending Crops
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mb: 3, width: "100%", ml: "auto", mr: "auto" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  sx={{
                    color: "#1B5E20",
                    fontFamily: "Merriweather",
                    // margin: "20px auto",
                  }}
                  variant="h6"
                  component="h6"
                >
                  Top 5 Gainers
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell sx={{ width: "max-content" }}>
                Item Name
              </StyledTableCell>
              <StyledTableCell sx={{ width: "max-content" }}>
                Price (&#8377; per Qtl.)
              </StyledTableCell>
              <StyledTableCell sx={{ width: "max-content" }}>
                Change (%)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top5Crops.map((row) => (
              <StyledTableRow key={row[0]}>
                <StyledTableCell component="th" scope="row">
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell>&#8377; {row[1]}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {row[2]}
                    <ArrowDropUpIcon color="success" />
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  sx={{
                    color: "#1B5E20",
                    fontFamily: "Merriweather",
                    // margin: "20px auto",
                  }}
                  variant="h6"
                  component="h6"
                >
                  Top 5 Losers
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell sx={{ width: "max-content" }}>
                Item Name
              </StyledTableCell>
              <StyledTableCell sx={{ width: "max-content" }}>
                Price (&#8377; per Qtl.)
              </StyledTableCell>
              <StyledTableCell sx={{ width: "max-content" }}>
                Change (%)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bottom5Crops.map((row) => (
              <StyledTableRow key={row[0]}>
                <StyledTableCell component="th" scope="row">
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell>&#8377; {row[1]}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {row[2]}
                    <ArrowDropDownIcon color="error" />
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
  // }
};

export default TrendingCropsPage;
