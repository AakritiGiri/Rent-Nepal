import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'
import Footer from './Footer'

import bags from '../images/carouselImage/pants.jpg'
import coats from '../images/carouselImage/handbags.jpg'
import trek from '../images/carouselImage/rentalfashion.jpg'
import guitar from '../images/carouselImage/handbag2.jpg'
import rentclothes from '../images/carouselImage/rentclothes.jpeg'
// import periodearrings from '../images/carouselImage/periodearrings.jpg'
// import clothesImage from '..images/carouselImage/clothesImage.jpg'


import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import PublicIcon from '@mui/icons-material/Public'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import { Link } from 'react-router-dom'

function IndividualIntervalsExample() {
  const gridStyle = {
    textAlign: 'center',
    padding: '4% 6% 5% 6%',
  }
  return (
    <>
      <Carousel style={{ marginBottom: '2%' }}>
      <Carousel.Item interval={2000}>
        <img
          src={trek}
          alt='trek'
          className='d-block w-100'
          style={{ objectFit: 'cover', maxHeight: '500px' }} // Using object-fit to ensure images fit perfectly
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          src={coats}
          alt='coats'
          className='d-block w-100'
          style={{ objectFit: 'cover', maxHeight: '500px' }} // Using object-fit to ensure images fit perfectly
        />
        <Carousel.Caption>
          <Typography variant='h2' color='white' fontStyle='italic' fontWeight='bold' fontFamily='Lora' position='center'>
      
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          src={bags}
          alt='bags'
          className='d-block w-100'
          style={{ objectFit: 'cover', maxHeight: '500px' }} // Using object-fit to ensure images fit perfectly
        />
        <Carousel.Caption>
          <Typography variant='h2' color='white' fontWeight='bold'  fontStyle='italic' fontFamily='Lora' position='center'>
          Rent it, flaunt it, return it!
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          src={guitar}
          alt='guitar'
          className='d-block w-100'
          style={{ objectFit: 'cover', maxHeight: '500px' }} // Using object-fit to ensure images fit perfectly
        />
        <Carousel.Caption>
          <Typography variant='h2' color='white' fontStyle='italic' fontWeight='bold' fontFamily='Lora'>
          Rent your favorite bags and shine.
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


      <Box
        sx={{
          flexGrow: 2,
          marginTop: '1.5%',
          marginBottom: '1%',
          
        }}
      >


         {/* <Box sx={{ flexGrow: 1, backgroundColor: '#E7F0EE',  }}>
         <Grid container spacing={1}>
          <Grid item xs={8} padding='5%'>
            <img height='400' width='100%' alt='rentclothes' src={rentclothes} />
          </Grid>
        </Grid>
         </Box> */}
      
      <Box sx={{ flexGrow: 1, backgroundColor: '#E7F0EE', marginBottom: '2%',  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Grid container alignItems="center" >

         {/* Grid item for the image */}
    <Grid item xs={5} sm={5.5} sx={{ display: 'flex', justifyContent: 'center' }}>
      <img style={{ width: '100%', height: '400px' }} alt='rentclothes' src={rentclothes} />
    </Grid>
    {/* Grid item for the text */}
    <Grid item xs={10} sm={6.5} >
      <Typography variant='h1' mt='1%' fontWeight='bold' padding={'5%'} >
        Don't Buy, 
      </Typography>

      <Typography variant='h2' fontWeight='bold' textAlign={'center'} > 
        Just Rent Them
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', sm:'6.5'}}>
        
        <Link to='/productList' style={{ textDecoration: 'none', textAlign: 'center' }}>
        <Button

 
  sx={{ 

    backgroundColor: '#397168',
    color: 'white',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#28554E', // Changing the background color on hovering 
    }
  }}
>
  Rent Now
</Button>
        </Link>
      </div>
    </Grid>

   
  </Grid>
</Box>

         


<Box sx={{ flexGrow: 1, backgroundColor: '#E7F0EE', padding: '2%', marginBottom: '2%',  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
  {/* Box for CATEGORIES */}
  <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
    <Typography variant="h5" fontWeight="bold"  >
      CATEGORIES
    </Typography>
  </Box>

  {/* Grid container for images and names */}
  <Grid container justifyContent="center" spacing={2}  >
    {/* Grid item for Clothes */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Box sx={{ marginBottom: '1rem' }}>
        {/* <img style={{ width: '100%', height: 'auto' }} alt='clothesImage' src={clothesImage} /> */}
      </Box>
      <Typography variant="h4" fontWeight="bold" fontFamily={"Lora"}>
        Clothes
      </Typography>
    </Grid>
    {/* Grid item for Bags */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Box sx={{ marginBottom: '1rem' }}>
        {/* <img style={{ width: '100%', height: 'auto' }} alt='bags' src={bagsImage} /> */}
      </Box>
      <Typography variant="h4" fontWeight="bold" fontFamily={"Lora"}>
        Bags
      </Typography>
    </Grid>
    {/* Grid item for Jewelry */}
    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
      <Box sx={{ marginBottom: '1rem' }}>
        {/* <img style={{ width: '100%', height: 'auto' }} alt='jewelry' src={jewelryImage} /> */}
      </Box>
      <Typography variant="h4" fontWeight="bold" fontFamily={"Lora"}>
        Jewelry
      </Typography>
    </Grid>
  </Grid>
</Box>



      </Box>

   
      <Box sx={{ flexGrow: 1, backgroundColor: '#E7F0EE', padding: '2%', marginBottom: '2%', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
  {/* Benefits of renting box */}
  <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
    <Typography variant="h5" fontWeight="bold" marginTop={'0.5%'}>
      BENEFITS OF RENTING
    </Typography>
  </Box>

  <Typography variant='h6' textAlign='center' marginBottom='2%' fontFamily="Lora">
    Dress sustainably, save money, and make a positive impact by joining the rental revolution.
  </Typography>

  <Grid container spacing={3} justifyContent="center" >
    <Grid item xs={12} md={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CurrencyExchangeIcon color='primary' fontSize='large' />
        <Typography variant='h6' marginTop='1rem' fontFamily="Lora">
          EARN MONEY
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} md={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <PublicIcon color='primary' fontSize='large' />
        <Typography variant='h6' marginTop='1rem'fontFamily="Lora">
          SAVE THE PLANET
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} md={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <SavingsOutlinedIcon color='primary' fontSize='large' />
        <Typography variant='h6' marginTop='1rem' fontFamily="Lora">
          SAVE MONEY
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Box>


     
      <Footer />
    </>
  )
}

export default IndividualIntervalsExample
