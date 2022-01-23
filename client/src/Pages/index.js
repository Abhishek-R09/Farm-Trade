import MainBG from './Images/mainBG.jpg';
import Image from 'next/image'
import { Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <div style={{ width: '100%', maxHeight: '100vh' }}>
        <Typography
          sx={{
            color: '#1B5E20',
            fontFamily: 'Merriweather',
            width: '65%',
            position: 'relative',
            top: '90px',
            pt: 4,
            marginLeft: { xxs: '20px', xs: '70px' },
            fontSize: { xxs: '2.5em', xs: '3.5em' },
            align: 'left'
          }}
          variant="h2"
          component="h1"
        >
          Empowering Farmers with Free Market
        </Typography>

        <div className='mainpageImg'>
          <Image
            src={MainBG}
            alt="Main"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
