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
  Card, CardActions, CardMedia, Pagination, Divider, List, ListItem, ListItemText, ListItemButton, InputAdornment, Skeleton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import axios from "axios";
import wheatImg from "../Images/wheat.jpg"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Image from "next/image";

const BidPage = () => {
  const router = useRouter()
  const [data, setData] = useState({});
  const [bids, setBids] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [bid, setBid] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    return <h1>Please login to continue!</h1>
  }
  const user = session?.user?.user
  const role = user?.roles[0].name

  const getData = async () => {
    setLoading(true)
    try {
      const { data: { auctionDetails } } = await axios.get(`/api/auctions/${id}`)
      const { bids: previousBids, ...bidDetails } = auctionDetails
      setBids(previousBids)
      setData(bidDetails)
    } catch (err) {
      console.log(err);
      setError(true)
      setAlertMsg(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
    const timer = setInterval(() => {
      getBids()
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const getBids = async () => {
    try {
      const { data: { bids: { bids: newBids } } } = await axios.get(`/api/auctions/bids/${id}`)
      // console.log(data)
      setBids(newBids)
    } catch (err) {
      console.log(err);
      setError(true)
      setAlertMsg(err)
    }
  }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     getBids()
  //   }, 5000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  const calculateTimeLeft = (startdate, duration) => {
    let now = new Date().getTime() / 1000;
    let end = new Date(startdate + duration * 60).getTime();
    let timeLeft = end - now;
    let days = Math.floor(timeLeft / (60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (60 * 60 * 24)) / (60 * 60)
    );
    let minutes = Math.floor((timeLeft % (60 * 60)) / (60));
    let seconds = Math.floor((timeLeft % (60)));
    return { days, hours, minutes, seconds };
  };


  useEffect(() => {
    // if (data?.startdate && data?.duration) {
    let interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(data?.startdate || 0, data?.duration || 0));
    }, 1000);
    return () => clearInterval(interval);
    // }
  }, [data.startdate, data.duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(bid);
    if (role !== "farmer") {
      if (bid <= 0 || !bid) {
        setAlertMsg("Invalid bid!")
        setOpen(true);
        setError(true)
        return;
      }
      try {
        // const result = await axios.get(`http://localhost:8080/api/auction/${id}`);
        // console.log(result.data._id);
        const posres = await axios.put(
          `/api/auctions/bids/${id}`,
          {
            bidprice: bid,
            time: Math.floor(Date.now() / 1000),
          }
        );
        // console.log(posres);
        setAlertMsg("Bid placed successfully!")
        setOpen(true);
        setError(false)
        setBid(0)
      } catch (e) {
        setAlertMsg("Not Allowed!");
        setError(true)
        setOpen(true);
        console.log({ ...e });
      }
    } else {
      setAlertMsg("You can't bid as you are a farmer!");
      setOpen(true);
      setError(true)
    }
  };

  return (
    <>
      <Container sx={{ marginBottom: '20px' }}>
        <Typography
          sx={{
            color: '#1B5E20',
            fontFamily: 'Merriweather',
            margin: '20px auto'
          }}
          variant="h3"
          component="h2"
        >
          {loading && <Skeleton />}
          {!loading && data?.description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                alt="Paella dish">
                <Image src={wheatImg} />
              </CardMedia>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Pagination count={1} variant="outlined" />
              </CardActions>
            </Card>
            <Paper sx={{ marginTop: '15px', padding: '10px', }}>
              {loading && <Skeleton />}
              {!loading && <Button size="large" color="secondary" fullWidth sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
                Current Bid: &#8377;{`${bids[0]?.bidprice}`}
              </Button>}
              {loading && <Skeleton />}
              {!loading && <Button color="primary" sx={{ textTransform: 'none', cursor: 'default', color: 'primary.dark', mt: 2 }} variant="outlined" fullWidth>
                Time Left: {timeLeft.days} days {timeLeft.hours} hours{" "}
                {timeLeft.minutes} minutes {timeLeft.seconds} seconds
              </Button>}
            </Paper>
          </Grid>
          <Grid item xxs={12} md={6}>
            <Paper >
              <div style={{ padding: '10px' }}>
                <Typography sx={{
                  fontFamily: 'Merriweather',
                  marginBottom: '10px'
                }} component="h3" variant="h4">Details</Typography>
                <Typography component="p" sx={{ margin: '5px 0' }}>
                  Sold By: <b>{`${data?.owner?.firstname} ${data?.owner?.lastname}`}</b>
                  {loading && <Skeleton />}
                </Typography>
                {/* <Typography component="p" sx={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  Farmer Rating:
                  <Rating readOnly value={4.4} precision={0.1} />
                  (<b>4.4</b>)
                </Typography>
                <Typography component="p" sx={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  <LocationOnIcon /> <b>Delhi</b>
                </Typography> */}
              </div>
              <Divider />
              <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {loading && <Skeleton />}
                {!loading && <Button color="secondary" sx={{ textTransform: 'none', cursor: 'default', color: 'secondary.dark' }} variant="outlined">
                  List Price: &#8377;{data?.startprice}
                </Button>}
                {loading && <Skeleton />}
                {!loading && <Button color="primary" sx={{ textTransform: 'none', cursor: 'default', color: 'primary.dark' }} variant="outlined">
                  Quantity: {data?.quantity}KG
                </Button>}
              </div>
              <Divider />
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity={error ? "error" : "success"}
                >
                  {alertmsg}
                </Alert>
              </Collapse>
              <form onSubmit={handleSubmit} style={{ padding: '10px' }}>
                <TextField fullWidth variant="outlined" value={bid} label="Bid Amount" onChange={(e) => setBid(e.target.value)} InputProps={{
                  startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                }} />
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  fullWidth
                  style={{ margin: "10px auto" }}
                >
                  Place Bid
                </Button>
              </form>
            </Paper>
            <Paper>
              <div style={{ padding: '10px' }}>
                <Typography sx={{
                  fontFamily: 'Merriweather',
                  marginBottom: '10px'
                }} component="h3" variant="h4">Last 10 Bids</Typography>
              </div>
              <List disablePadding spacing={2}>
                {bids && bids.map((user) => (
                  <React.Fragment key={`${user._id}`}>
                    <ListItem>
                      <ListItemButton sx={{ justifyContent: 'space-between' }}>
                        <ListItemText
                          primary={`By "${user.bidby.username}"`}
                          secondary={`Rs.${user.bidprice} @ 
                            ${new Date(user.time * 1000).toLocaleDateString()} 
                            ${new Date(user.time * 1000).toLocaleTimeString()}
                            `} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default BidPage;
