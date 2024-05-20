import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { Link } from 'react-router-dom'

export default function FullWidthGrid() {
  const myIcon = {
    cursor: 'pointer',
    fontSize: '30',
    margin: '5%',
  }
  const d = new Date()
  return (
    <Box
      mt={1}
      sx={{
        flexGrow: 1,
        backgroundColor: '#1F1C1C',
        color: 'white',
        textAlign: 'center',
        padding: '3% 5% 1% 5%',
      }}
    >
      
      <Typography variant={'h5'} textAlign={'center'} marginBottom={'2%'} marginTop={'-2%'} fontStyle={'italic'}  fontFamily={'Lora'} >
          "Rent-Nepal: Elevate your style, share your treasures, make every moment extraordinary."
          </Typography>
          <hr />

      <Grid container spacing={5}>
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h6' >LINKS</Typography>
       
          <Typography variant='body2' gap>
          Home
          <br />

          About Us
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h6' >CONTACT US</Typography>
         

          <Typography variant='body2' >
            9800000000
            <br />
            info@rentnepal.com
            <br />
            Kathmandu, Nepal
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h6' >FOLLOW US ON</Typography>

          <Grid container justifyContent='center' >
            <FacebookIcon style={myIcon} />
            <InstagramIcon style={myIcon} />
            <TwitterIcon style={myIcon} />
          </Grid>
        </Grid>
      </Grid>
      <hr />

      <Box display='flex' justifyContent='center' alignItems='center'  >
        Copyright &nbsp;
        <CopyrightIcon />
        &nbsp; RentNepal {d.getFullYear()} . All rights reserved.&nbsp;
        
        <Link to='/legalTerms' style={{ color: '#397168' }}>
          Terms of sevice and privacy policy
        </Link>

      </Box>
    </Box>
  )
}
