import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import UserShoe from './UserShoe';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer'; // Import the Footer component

export default function BoxSx() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(
        `http://localhost:8080/getProductsByUserId/${params.id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        },
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of dashboard.js');
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, [products]);

  return (
    <Box
      sx={{
        backgroundColor: '#E5EBEA',
        padding: '-2% -2%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '2% 2%',
          width: '80%',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
          margin: 'auto',
          marginTop: '2%',
          marginBottom: '1%',
          // px: '5%',
          // py: '2%',
        }}
      >
        <Typography variant='h5' textAlign={'center'} fontWeight={'bold '}>
          DASHBOARD
        </Typography>
        <hr />

        <Box>
          {Array.isArray(products) ? (
            <>
              <Typography
                mb={2}
                mt={3}
                variant='button'
                component='h6'
                fontSize={20}
                // fontFamily={'Lora'}
                // fontWeight={'bold'}
              >
                Your Uploaded Products
              </Typography>
              <Grid container spacing={3} rowSpacing={3}>
                {products.map((item) => {
                  return <UserShoe key={item._id} data={item} />;
                })}
              </Grid>
            </>
          ) : (
            <Typography
              mb={2}
              mt={3}
              variant='button'
              component='h6'
              fontSize={20}
              textAlign='center'
              fontFamily={'Lora'}
            >
              Oops! you haven't uploaded any products
            </Typography>
          )}
        </Box>
        <Link to='/user/addProduct' style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            sx={{
              mt: 5,
              backgroundColor: '#397168',
              color: 'white',
              '&:hover': { backgroundColor: '#28554E' },
            }}
          >
            upload a new product
          </Button>
        </Link>
      </Box>
      <Footer />
    </Box>
  );
}
