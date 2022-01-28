import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";

import { useSession, signOut } from "next-auth/react";

export default function MenuAppBar(props) {
  const { data, status } = useSession();
  const user = data?.user?.user;

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    handleClose();
    const data = await signOut({ redirect: true, callbackUrl: "/login" });
    // const data = await signOut({ redirect: false, callbackUrl: '/login' });
    // router.push(data.url);
  };

  // console.log("appbar", data, status);
  // console.log("appbar", router.pathname);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {!(router.pathname === "/") && status === "authenticated" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div style={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography
                variant="h5"
                component="a"
                sx={{
                  flexGrow: 1,
                  textDecoration: "none",
                  color: "text.primary",
                }}
              >
                FarmTrade
              </Typography>
            </Link>
          </div>
          {router.pathname === "/" && status === "authenticated" && (
            <>
              <Link href="/auction" passHref>
                <Button
                  sx={{
                    marginRight: "10px",
                    display: { xxs: "none", xs: "inline-flex" },
                  }}
                  component="a"
                  variant="contained"
                  color="secondary"
                  startIcon={<ShoppingCartIcon />}
                >
                  Auction
                </Button>
              </Link>
              <Link href="/testprotected" passHref>
                <Button
                  sx={{
                    marginRight: "10px",
                    display: { xxs: "none", xs: "inline-flex" },
                  }}
                  component="a"
                  variant="contained"
                  color="secondary"
                  startIcon={<ShoppingCartIcon />}
                >
                  Test
                </Button>
              </Link>
            </>
          )}
          {status === "authenticated" && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar
                  sx={{ bgcolor: "secondary.main" }}
                >{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "center" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link href="/profile" passHref>
                  <MenuItem component="a" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                </Link>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <Link href="/auction" passHref>
                  <MenuItem
                    sx={{ display: { xxs: "flex", sm: "none" } }}
                    component="a"
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    Auction
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          {(status === "unauthenticated" || status === "loading") && (
            <>
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  keepMounted
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "center" }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link href="/login" passHref>
                    <MenuItem component="a" onClick={handleClose}>
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Login
                    </MenuItem>
                  </Link>
                  <Link href="/signup" passHref>
                    <MenuItem component="a" onClick={handleClose}>
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Signup
                    </MenuItem>
                  </Link>
                </Menu>
              </>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
