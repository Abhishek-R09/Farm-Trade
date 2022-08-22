import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

const crops = [
  {
    name: "Paddy",
    link: "/cropPrediction/paddy",
    img: "https://img.icons8.com/color/48/000000/rice-bowl.png",
  },
  {
    name: "Wheat",
    link: "/cropPrediction/wheat",
    img: "https://img.icons8.com/color/48/000000/wheat.png",
  },
  {
    name: "Barley",
    link: "/cropPrediction/barley",
    img: "https://img.icons8.com/color/48/000000/barley.png",
  },
  {
    name: "Soya Bean",
    link: "/cropPrediction/soyabean",
    img: "https://img.icons8.com/color/48/000000/soy.png",
  },
  {
    name: "Cotton",
    link: "/cropPrediction/cotton",
    img: "https://img.icons8.com/color/48/000000/cotton.png",
  },
  {
    name: "Coconut",
    link: "/cropPrediction/copra",
    img: "https://img.icons8.com/color/48/000000/coconut.png",
  },
  {
    name: "Ground Nut Seeds",
    link: "/cropPrediction/groundnut",
    img: "https://img.icons8.com/color/48/000000/peanuts.png",
  },
  {
    name: "Mustard Seed",
    link: "/cropPrediction/rape",
    img: "https://thumbs.dreamstime.com/b/black-mustard-seed-texture-top-view-black-mustard-seed-121730021.jpg",
  },
  {
    name: "Sesamum",
    link: "/cropPrediction/sesamum",
    img: "https://img.icons8.com/color/48/000000/sesame.png",
  },
  {
    name: "Gram",
    link: "/cropPrediction/gram",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Sugarcane",
    link: "/cropPrediction/sugarcane",
    img: "https://img.icons8.com/color/48/000000/bamboo.png",
  },
  {
    name: "Arhar",
    link: "/cropPrediction/arhar",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Ragi",
    link: "/cropPrediction/ragi",
    img: "https://img.icons8.com/office/48/000000/wheat.png",
  },
  {
    name: "Maize",
    link: "/cropPrediction/maize",
    img: "https://img.icons8.com/color/48/000000/corn.png",
  },
  {
    name: "Moong",
    link: "/cropPrediction/moong",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Masoor",
    link: "/cropPrediction/masoor",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Urad",
    link: "/cropPrediction/urad",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Raw Jute",
    link: "/cropPrediction/jute",
    img: "https://img.icons8.com/color/48/000000/potato.png",
  },
  {
    name: "Niger Seed",
    link: "/cropPrediction/niger",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Kardi Seed",
    link: "/cropPrediction/safflower",
    img: "https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png",
  },
  {
    name: "Sunflower",
    link: "/cropPrediction/sunflower",
    img: "https://img.icons8.com/color/48/000000/potato.png",
  },
  {
    name: "Jowar",
    link: "/cropPrediction/jowar",
    img: "https://img.icons8.com/color/48/000000/potato.png",
  },
  {
    name: "Bajra",
    link: "/cropPrediction/bajra",
    img: "https://img.icons8.com/color/48/000000/potato.png",
  },
];

const CropWisePredictionPage = (props) => {
  const { status, data } = useSession();

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
        Crop Wise Prediction Portal
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {crops.map((crop, index) => (
          <Grid
            item
            xxs={12}
            xs={6}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            key={`${crop.index}${crop.name}`}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={crop.img}
                alt={crop.name}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h6"
                  sx={{ fontFamily: "Merriweather" }}
                >
                  {crop.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography> */}
              </CardContent>
              <CardActions>
                <Link href={crop.link} passHref>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    color="primary"
                    component="a"
                    sx={{ ml: "auto" }}
                  >
                    Check Forecast
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
  // }
};

export default CropWisePredictionPage;
