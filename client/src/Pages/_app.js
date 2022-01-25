// import App from 'next/app'
// import { AuthContextProvider } from '../Context/auth'
import { ThemeProvider, Box } from '@mui/material';
import theme from '../theme'
import { SnackbarProvider } from 'notistack';
import ResponsiveDrawer from '../Components/Drawer';
import { SessionProvider } from "next-auth/react"
import '../index.css'
const drawerWidth = 240;

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

  return (
    // <AuthContextProvider>
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <ResponsiveDrawer setUser={null} />
          <Box
            component="main"
            sx={{ mt: 4, pt: 4 }}
          >
            <Component {...pageProps} />
          </Box>
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
    // </AuthContextProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp