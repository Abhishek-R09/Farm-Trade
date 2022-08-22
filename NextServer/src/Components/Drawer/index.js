import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GavelIcon from "@mui/icons-material/Gavel";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import Toolbar from "@mui/material/Toolbar";

import MenuAppBar from "../CustomAppBar";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  CardActions,
  CardHeader,
  ListItemButton,
  Collapse,
} from "@mui/material";

import { useSession, signOut } from "next-auth/react";

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  const { data, status } = useSession();
  const user = data?.user?.user;
  const role = user?.roles[0].name;
  const router = useRouter();
  // console.log("drawer", status, user);

  const drawerLinks = [
    {
      text: "Profile",
      link: "/profile",
      icon: <AccountCircleIcon />,
    },
    {
      text: "Auction",
      link: "/auction",
      icon: <GavelIcon />,
    },
  ];

  const adminLinks = [
    {
      text: "Add Crop",
      link: "/admin",
      icon: <AddIcon />,
    },
    {
      text: "Create Auction",
      link: "/createauction",
      icon: <NewReleasesIcon />,
    },
    [
      {
        text: "Trending Crops",
        link: "/trendingCrops",
        icon: <TrendingUpIcon />,
      },
      {
        text: "Crop Wise Prediction",
        link: "/cropWisePrediction",
        icon: <CategoryIcon />,
      },
    ],
  ];
  const farmerLinks = [
    {
      text: "Create Auction",
      link: "/createauction",
      icon: <NewReleasesIcon />,
    },
    [
      {
        text: "Trending Crops",
        link: "/trendingCrops",
        icon: <TrendingUpIcon />,
      },
      {
        text: "Crop Wise Prediction",
        link: "/cropWisePrediction",
        icon: <CategoryIcon />,
      },
    ],
  ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/login" });
    // router.push(data.url);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = status === "authenticated" && (
    <>
      <Toolbar sx={{ minHeight: "64px !important" }} />
      <Divider />
      <CardHeader
        avatar={<Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>}
        title={`${user.firstName} ${user.lastName}`}
        subheader={role}
        titleTypographyProps={{ component: "title", variant: "body1" }}
      />
      {/* <CardActions></CardActions> */}
      <Divider />
      <Divider />
      <List sx={{ pt: 0 }}>
        {drawerLinks.map((link, index) => (
          <React.Fragment key={link.link}>
            <Link href={link.link} passHref>
              <ListItemButton
                component="a"
                sx={{
                  backgroundColor:
                    router.pathname === link.link ? "secondary.light" : "white",
                  color:
                    router.pathname === link.link
                      ? "secondary.dark"
                      : "primary.dark",
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      router.pathname === link.link
                        ? "secondary.dark"
                        : "primary.dark",
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </Link>
            <Divider />
          </React.Fragment>
        ))}
        {/* </List> */}
        {/* <Divider /> */}
        {/* <List> */}
        {role === "Farmer" &&
          farmerLinks.map((link, index) =>
            Array.isArray(link) ? (
              <React.Fragment key={`Farmer${index}`}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon
                    sx={{
                      color: "primary.dark",
                    }}
                  >
                    <LightbulbIcon />
                  </ListItemIcon>
                  <ListItemText primary="Predictions" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Divider />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.map((subLinks, index) => (
                      <React.Fragment key={subLinks.link}>
                        <Link href={subLinks.link} passHref>
                          <ListItemButton
                            component="a"
                            sx={{
                              pl: 4,
                              backgroundColor:
                                router.pathname === subLinks.link
                                  ? "secondary.light"
                                  : "white",
                              color:
                                router.pathname === subLinks.link
                                  ? "secondary.dark"
                                  : "primary.dark",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color:
                                  router.pathname === subLinks.link
                                    ? "secondary.dark"
                                    : "primary.dark",
                              }}
                            >
                              {subLinks.icon}
                            </ListItemIcon>
                            <ListItemText primary={subLinks.text} />
                          </ListItemButton>
                        </Link>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
                <Divider />
              </React.Fragment>
            ) : (
              <React.Fragment key={link.link}>
                <Link href={link.link} passHref>
                  <ListItemButton
                    component="a"
                    sx={{
                      backgroundColor:
                        router.pathname === link.link
                          ? "secondary.light"
                          : "white",
                      color:
                        router.pathname === link.link
                          ? "secondary.dark"
                          : "primary.dark",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          router.pathname === link.link
                            ? "secondary.dark"
                            : "primary.dark",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </Link>
                <Divider />
              </React.Fragment>
            )
          )}
        {role === "Admin" &&
          adminLinks.map((link, index) =>
            Array.isArray(link) ? (
              <React.Fragment key={`Admin${index}`}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon
                    sx={{
                      color: "primary.dark",
                    }}
                  >
                    <LightbulbIcon />
                  </ListItemIcon>
                  <ListItemText primary="Predictions" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Divider />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {link.map((subLinks, index) => (
                      <React.Fragment key={subLinks.link}>
                        <Link href={subLinks.link} passHref>
                          <ListItemButton
                            component="a"
                            sx={{
                              pl: 4,
                              backgroundColor:
                                router.pathname === subLinks.link
                                  ? "secondary.light"
                                  : "white",
                              color:
                                router.pathname === subLinks.link
                                  ? "secondary.dark"
                                  : "primary.dark",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color:
                                  router.pathname === subLinks.link
                                    ? "secondary.dark"
                                    : "primary.dark",
                              }}
                            >
                              {subLinks.icon}
                            </ListItemIcon>
                            <ListItemText primary={subLinks.text} />
                          </ListItemButton>
                        </Link>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
                <Divider />
              </React.Fragment>
            ) : (
              <React.Fragment key={link.link}>
                <Link href={link.link} passHref>
                  <ListItemButton
                    component="a"
                    sx={{
                      backgroundColor:
                        router.pathname === link.link
                          ? "secondary.light"
                          : "default",
                      color:
                        router.pathname === link.link
                          ? "secondary.dark"
                          : "primary.dark",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          router.pathname === link.link
                            ? "secondary.dark"
                            : "primary.dark",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </Link>
                <Divider />
              </React.Fragment>
            )
          )}
      </List>
      <Button
        variant="contained"
        sx={{ width: "90%", m: "auto", mb: 3 }}
        onClick={logout}
      >
        Signout
      </Button>
    </>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // <Box sx={{ display: 'flex' }}>
    <>
      <CssBaseline />
      <MenuAppBar handleDrawerToggle={handleDrawerToggle} />
      {!["/", "/login", "/signup"].includes(router.pathname) &&
        status === "authenticated" && (
          <Box
            // {<Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              // container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xxs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xxs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        )}
    </>
  );
};

export default ResponsiveDrawer;
