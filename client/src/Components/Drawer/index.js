import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GavelIcon from '@mui/icons-material/Gavel';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Toolbar from '@mui/material/Toolbar';
import MenuAppBar from '../CustomAppBar';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Avatar, Button, CardActions, CardHeader, ListItemButton } from '@mui/material';

import { useSession, signOut } from 'next-auth/react'

const drawerWidth = 240;

const ResponsiveDrawer = (props) => {
  const { data, status } = useSession()
  const user = data?.user?.user
  const role = user?.roles[0].name
  const router = useRouter();
  // console.log("drawer", status, user);

  const drawerLinks = [
    {
      text: 'Profile',
      link: '/profile',
      icon: <AccountCircleIcon />,
    },
    {
      text: 'Auction',
      link: '/auction',
      icon: <GavelIcon />
    },

  ]

  const adminLinks = [
    {
      text: 'Add Crop',
      link: '/admin',
      icon: <AddIcon />
    },
    {
      text: 'Create Auction',
      link: '/createauction',
      icon: <NewReleasesIcon />
    }
  ]
  const farmerLinks = [
    {
      text: 'Create Auction',
      link: '/createauction',
      icon: <NewReleasesIcon />
    }
  ]
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = async () => {
    const data = await signOut({ redirect: true, callbackUrl: '/login' });
    // router.push(data.url);
  };

  const drawer = status === "authenticated" && (
    <>
      <Toolbar sx={{ minHeight: '64px !important' }} />
      <Divider />
      <CardHeader avatar={<Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>} title={`${user.firstName} ${user.lastName}`} subheader={role} titleTypographyProps={{ component: 'title', variant: 'body1' }} />
      <CardActions>
      </CardActions>
      <Divider />
      <List>
        {drawerLinks.map((link, index) => (
          <Link href={link.link} key={link.link}>
            <ListItemButton component="a">
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {role === "Farmer" && farmerLinks.map((link, index) => (
          <Link href={link.link} key={link.link}>
            <ListItemButton component="a">
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </Link>
        ))}
        {role === "Admin" && adminLinks.map((link, index) => (
          <Link href={link.link} key={link.link}>
            <ListItemButton component="a">
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Button variant="contained" sx={{ width: '90%', m: 'auto', mb: 3 }} onClick={logout}>Signout</Button>
    </>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // <Box sx={{ display: 'flex' }}>
    <>
      <CssBaseline />
      <MenuAppBar handleDrawerToggle={handleDrawerToggle} />
      {(!(['/', '/login', '/signup'].includes(router.pathname)) && status === "authenticated") && <Box
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
            display: { xxs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xxs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>}
    </>
  );
}

export default ResponsiveDrawer;
