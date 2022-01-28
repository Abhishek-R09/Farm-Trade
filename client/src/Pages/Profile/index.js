import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Stack,
  Skeleton,
  Alert,
} from "@mui/material";
import testImg from "../../Images/wheat.jpg";
import axios from "axios";
import wheatImg from "../../Images/wheat.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfilePage = () => {
  const { data, status } = useSession();
  const user = data?.user?.user;
  // console.log("profile", user);
  const [auctionslist, setAuctionslist] = useState([]);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (user) {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setUsername(user?.username || "");
    // }

    const temp = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/user/getAuctions");
        const data = await res.data;
        setAuctionslist(data.auctions);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    temp();
  }, [user]);

  if (status === "loading" || status === "unauthenticated") {
    return <h1>Please Login to continue</h1>;
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
        Profile
      </Typography>
      {/* <Divider /> */}
      <Paper
        sx={{ display: "flex", flexDirection: { xxs: "column", sm: "row" } }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            p: { xxs: 0, md: 2 },
            width: { xxs: "100%", sm: "35%", md: "25%" },
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: { xxs: "center", xs: "space-evenly", sm: "center" },
            flexDirection: { xxs: "column", xs: "row", sm: "column" },
          }}
        >
          <Avatar
            alt={
              status === "authenticated"
                ? `${user.firstName} ${user.lastName}`
                : "No image"
            }
            // src={testImg}
            sx={{ width: "130px", height: "130px", maxWidth: "100%" }}
          >
            <Image
              src={testImg}
              alt={
                status === "authenticated"
                  ? `${user.firstName} ${user.lastName}`
                  : "No image"
              }
              layout="fill"
            />
          </Avatar>
          {/* <label htmlFor="contained-button-file">
          <input accept="image/*" id="contained-button-file" multiple type="file" style={{ display: 'none' }} />
          <Button variant="contained" component="span" startIcon={<PhotoCamera />} sx={{ mt: 2 }}>
            Upload
          </Button>
        </label> */}
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            p: { xxs: 1, sm: 2 },
            width: { xxs: "100%", sm: "65%", md: "75%" },
          }}
        >
          <Typography
            sx={{ mb: 2, textAlign: "center" }}
            variant="h4"
            component="h4"
          >
            Update Profile
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              disabled
              type="text"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                width: {
                  xxs: "100%",
                  xs: "45%",
                  sm: "100%",
                  md: "45%",
                  lg: "35ch",
                },
                m: { xxs: "5px auto", xs: "1" },
              }}
            />
            <TextField
              disabled
              type="text"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                width: {
                  xxs: "100%",
                  xs: "45%",
                  sm: "100%",
                  md: "45%",
                  lg: "35ch",
                },
                m: { xxs: "5px auto", xs: "1" },
                ml: { xs: "5px", sm: "auto", md: "10px" },
              }}
            />
            <TextField
              disabled
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: {
                  xxs: "100%",
                  xs: "45%",
                  sm: "100%",
                  md: "45%",
                  lg: "35ch",
                },
                m: { xxs: "5px auto", xs: "1" },
              }}
            />
            <TextField
              disabled
              type="text"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                width: {
                  xxs: "100%",
                  xs: "45%",
                  sm: "100%",
                  md: "45%",
                  lg: "35ch",
                },
                m: { xxs: "5px auto", xs: "1" },
                ml: { xs: "5px", sm: "auto", md: "10px" },
              }}
            />
          </div>
        </Box>
      </Paper>
      <Typography
        sx={{
          color: "#1B5E20",
          fontFamily: "Merriweather",
          margin: "20px auto",
          textAlign: "center",
        }}
        variant="h5"
        component="h3"
      >
        Auctions Participated
      </Typography>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3, mb: 3 }}
      >
        {loading && (
          <>
            <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
              </Stack>
            </Grid>
            <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={118} />
              </Stack>
            </Grid>
          </>
        )}
        {!loading && auctionslist.length === 0 ? (
          <Alert severity="info">
            You have not participated in any auction yet.
          </Alert>
        ) : (
          auctionslist.map((auction, index) => {
            return <AuctionCard key={index} auction={auction} index={index} />;
          })
        )}
      </Grid>
    </Container>
  );
};

const epochToDate = (epoch) => {
  const date = new Date(epoch * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const AuctionCard = ({ auction, index }) => {
  return (
    <Grid item xxs={12} xs={9} sm={9} md={6} lg={4} xl={3}>
      <Card>
        <CardHeader
          title={`Auction ${index + 1} - ${
            auction.crop?.name || auction.description
          }`}
        />
        <CardMedia height="194" alt="Paella dish">
          <Image src={wheatImg} />
        </CardMedia>
        <CardContent>
          <p>Start Date: {epochToDate(Number(auction.startdate))} </p>
          <p>
            End Date :{" "}
            {epochToDate(
              Number(auction.startdate) + Number(auction.duration) * 60
            )}{" "}
          </p>
          <p>
            Duration:{" "}
            {`${Math.floor(Number(auction.duration) / 60)} Hours ${
              Number(auction.duration) % 60
            } Minutes`}
          </p>
          <p>
            Harvest Date : {new Date(auction.harvestdate).toLocaleDateString()}{" "}
          </p>
          <p>Quantity : {auction.quantity} KG</p>
          <p>Start Price : &#8377;{auction.startprice}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};

AuctionCard.propTypes = {
  auction: PropTypes.shape({
    crop: PropTypes.shape({
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    startdate: PropTypes.number,
    duration: PropTypes.number,
    harvestdate: PropTypes.number,
    quantity: PropTypes.number,
    startprice: PropTypes.number,
  }),
  index: PropTypes.number,
};

export default ProfilePage;
