import React, { useState } from 'react'
import { Grid, TextField, Box, Typography, Tab, Tabs } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import Shoe from './Shoe'
// import Footer from './Footer' 

const Products = () => {
  const [products, setProducts] = useState([])
  const [value, setValue] = useState('one')
  const [isSearched, setIsSearched] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSearch = async (e) => {
    setIsSearched(true)
    const key = e.target.value
    if (key) {
      try {
        const response = await axios.get(`http://localhost:8080/searchProducts/${key}`)
        setProducts(response.data)
      } catch (error) {
        console.error('Error searching products:', error)
      }
    } else {
      setIsSearched(false)
    }
  }

  return (
    <>
      <Box
        py={2}
        my={1}
        mb='1%'
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.2)',
          
        }}
      >
        <Typography  fontSize={20} fontWeight={'bold'}>
          PRODUCTS SECTION
        </Typography>

        <Box sx={{ position: 'relative'}}>
          <TextField
            id='search-product'
            label='Search'
            type='search'
            variant='outlined' // Use the outlined variant
            sx={{
              width: '100%', // Set width to fill the container
              borderRadius: '25px', // Add border radius for a rounded appearance
              paddingY: '2px', // Adjust vertical padding
              fontSize: '12px', // Adjust font size
  
            }}
            onChange={handleSearch}
          />
          <SearchIcon
            sx={{
              color: 'action.active',
              position: 'absolute',
              right: '10px', // Adjust the icon position
              top: '50%', // Align the icon vertically
              transform: 'translateY(-50%)', // Center the icon vertically
            }}
          />
        </Box>

      </Box>
      
      <Grid container spacing={1.9}>
        <Grid
          item
          xs={12}
          md={2.5}
          sx={{
            // boxShadow: '2px 2px 2px 0 rgba(0,0,0,0.1)',
            transition: '0.3s',
            height: '600px', // Fill the entire height of the container
            backgroundColor: '#FFFFFFF'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation='vertical'
            aria-label='secondary tabs example'
          >
            <Tab
              value='one'
              label='All Products'
              component={Link}
              to='/productList'
            />
            <Tab
              value='two'
              label='Clothes'
              component={Link}
              to='/productList/watch'
            />
            {/* <Tab
              value='three'
              label='Saree'
              component={Link}
              to='/productList/music'
            /> */}
            {/* <Tab
              value='four'
              label='Coats'
              component={Link}
              to='/productList/coats'
            /> */}
            {/* <Tab
              value='five'
              label='Ladies Items'
              component={Link}
              to='/productList/ladiesItem'
            /> */}
            {/* <Tab
              value='six'
              label='Dresses'
              component={Link}
              to='/productList/trekking'
            /> */}
            <Tab
              value='seven'
              label='Jewelry'
              component={Link}
              to='/productList/biCycle'
            />
            <Tab
              value='eight'
              label='Bags'
              component={Link}
              to='/productList/carryBags'
            />
          </Tabs>
        </Grid>
       
        <Grid
          item
          xs={12}
          md={9.5}
          
          sx={{ overflow: 'auto', height: 'calc(100vh - 90px)', backgroundColor:'#E5EBEA' }}
          // mt='3%'
          // marginBottom={'1.5%'}
        >
          {isSearched ? (
            <>
              {products.length > 0 ? (
                <Grid container spacing={2} rowSpacing={3} p={2}  marginBottom={'10%'}>
                  {products.map((item) => (
                    <Shoe key={item._id} data={item} />
                  ))}
                </Grid>
              ) : (
                <Typography
                  mb={2}
                  mt={3}
                  variant='button'
                  component='h6'
                  fontSize={22}
                  textAlign='center'
                >
                  Oops! No products found...
                </Typography>
              )}
            </>
          ) : (
            <Outlet />
          )}
        </Grid>
      </Grid>

      {/* <Footer />  */}
    </>
  )
}

export default Products
