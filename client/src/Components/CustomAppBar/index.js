import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { AuthContext } from '../../Context/auth';

// const drawerWidth = 240;

export default function MenuAppBar(props) {
  // eslint-disable-next-line no-unused-vars
  // const auth = React.useContext(AuthContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const location = useLocation();

  // if (location.pathname === '/login' || location.pathname === '/signup') {
  //   return <></>;
  // }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary' }}
            >
              FarmTrade
            </Typography>
          </div>
          {location.pathname === '/' && user && <Button
            sx={{ marginRight: '10px' }}
            component={Link}
            to="/auction"
            variant="contained"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
          >
            Auction
          </Button>}
          {/*location.pathname !== '/marketplace' ? <Button
            sx={{ marginRight: '10px' }}
            component={Link}
            to="/marketplace"
            variant="contained"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
          >
            Marketplace
          </Button> : <Button
            sx={{ marginRight: '10px' }}
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>*/}
          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar>F</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (<>
            <div>
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                <MenuItem component={Link} to="/signup" onClick={handleClose}>Signup</MenuItem>
              </Menu>
            </div>
            {/* <>
              <Button
                sx={{ marginRight: '10px' }}
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
              >
                Signup
              </Button>
            </> */}
          </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
