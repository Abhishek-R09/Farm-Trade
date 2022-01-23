import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NextLink from 'next/link';
import { useRouter } from 'next/router'
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment, IconButton, Snackbar, Alert, LinearProgress } from '@mui/material';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" component={NextLink} href="/">
        FarmTrade.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignInPage = ({ setUser, setUsername: updateUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // const [role, setRole] = useState('Farmer');
  // const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  // let history = useHistory();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const handleSubmit = async (event) => {
    setLoading(true);
    setError(false);
    setErrorMsg('');
    event.preventDefault();
    const values = {
      username,
      password,
      // role,
      // remember,
    };
    // console.log(values);
    // setRole('Farmer');
    // setRemember(false);
    try {
      const suc = await axios.post("http://localhost:8080/api/auth/signin", values);
      // console.log(suc);
      localStorage.setItem("profile", JSON.stringify(suc?.data));
      setUser(JSON.parse(localStorage.getItem("profile")).accessToken);
      updateUsername(JSON.parse(localStorage.getItem("profile")).username);
      // console.log("try success");

      router.push("/profile");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data.message);
      console.log("catch fail");
      setError(true);
      setErrorMsg(error.response?.data.message || "Something went wrong!");
    }
    setUsername('');
    setPassword('');
    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: { sm: 1 },
        borderColor: 'grey.100',
        borderRadius: 5,
        marginTop: { xs: '10px', sm: '50px' },
        marginBottom: '50px',
        padding: '30px',
        // mt: 6,
      }}
    >
      <Snackbar open={error} autoHideDuration={6000} onClose={() => {
        setError(false);
        setErrorMsg('');
      }}>
        <Alert onClose={() => {
          setError(false);
          setErrorMsg('');
        }} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading && <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>}
        <NextLink href="/" passHref>
          <Link style={{ display: 'flex' }} component="a">
            <HomeIcon />
            Go to Home Page
          </Link>
        </NextLink>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xxs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              // autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  name="role"
                  required
                  labelId="role"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="Farmer">Farmer</MenuItem>
                  <MenuItem value="Buyer">Buyer</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={remember}
                    onChange={() => setRemember((prev) => !prev)}
                  />
                }
                label="Remember me"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <NextLink href="/signup" passHref>
                <Link variant="body2" component="a">
                  {"Don't have an account? Sign Up"}
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8 }} />
    </Container>
  );
};

export default SignInPage;
