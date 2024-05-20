import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CategoryIcon from '@mui/icons-material/Category';
import Footer from '../Footer';  // Import the Footer component

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: '#EDF3F2' }}>
        <Typography variant='h5' textAlign='center' pt='2%' fontWeight={'bold'}>
          ADMIN DASHBOARD
        </Typography>
        <hr />
        <Grid container spacing={2} backgroundColor={'#EDF3F2'}>
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.1)',
              transition: '0.3s',
              height: '1000px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              orientation='vertical'
              aria-label='secondary tabs example'
            >
              <Tab
                icon={<AppsIcon />}
                iconPosition='start'
                value='one'
                label='overview'
                LinkComponent={Link}
                to='/admin'
              />
              <Tab
                icon={<SupervisedUserCircleIcon />}
                iconPosition='start'
                value='two'
                label='All Users'
                LinkComponent={Link}
                to='/admin/allUsers'
              />
              <Tab
                icon={<CategoryIcon />}
                iconPosition='start'
                value='three'
                label='All Products'
                LinkComponent={Link}
                to='/admin/allProducts'
              />
            </Tabs>
          </Grid>

          <Grid item xs={8} md={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
      <Footer /> {/* Add the Footer component here */}
    </>
  );
}
