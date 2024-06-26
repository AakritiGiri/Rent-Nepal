import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import noPhoto from '../Product/photos/noPhoto.jpg'
import noProfile from '../Product/photos/noProfile.png'
import { IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MuiAlert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import MessageOwnerBox from './MessageOwner'
import Review from './Review'
import RecommendSection from '../User/RecommendSection'
import UserProduct from '../User/UserProduct'

//for alert appeared when clicked on like icon buttton
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function FullWidthGrid() {
  const [userId, setuserId] = useState('')

  // if (userId) {
  //   userId = JSON.parse(localStorage.getItem('users'))._id
  //   setisLoggedn(true)
  // }

  const [open, setOpen] = React.useState(false)
  const [ownProduct, setownProduct] = useState(false)

  const [isLiked, setisLiked] = React.useState(false)
  const [isBooked, setisBooked] = useState(false)
  const checkBooking = (message) => {
    setisBooked(message)
    setOpen(true)
  }

  const handleLike = async () => {
    if (userId) {
      const response = await axios.post(
        `http://localhost:8080/addLikes/${params.id}`,
        { userId },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.status === 200) {
        setisLiked(true)
      }
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const params = useParams()
  const [productInfo, setproductInfo] = useState({
    name: '',
    type: '',
    size: '',
    price: '',
    location: '',
    status: '',
    photo: '',
    likes: [],
  })
  const [userDetails, setuserDetails] = useState({})
  const [profilePic, setprofilePic] = useState(null)
  const [productPhoto, setproductPhoto] = useState(null)

  const checkLikes = (productDesc) => {
    if (productDesc.includes(userId)) {
      setisLiked(true)
    } else {
      setisLiked(false)
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('users')

    if (user) {
      setuserId(JSON.parse(user)._id)
    }
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        `http://localhost:8080/getProductDetailById/${params.id}`,

        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setproductInfo(res.data.productDetails)
        setuserDetails(res.data.userDetails)
        // console.log(userDetails)
        checkLikes(res.data.productDetails.likes)
        if (res.data.userDetails.photo) {
          var photoUser = res.data.userDetails.photo.replace('public\\', '')
          photoUser = `http://localhost:8080/${photoUser}`
          setprofilePic(photoUser)
        }
        if (res.data.productDetails.photo) {
          var photoName = res.data.productDetails.photo.replace('public\\', '')
          photoName = `http://localhost:8080/${photoName}`
          setproductPhoto(photoName)
        }
        if (userId === res.data.userDetails._id) {
          setownProduct(true)
        } else {
          setownProduct(false)
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of profile.js')
        }
      })

    return () => {
      cancelToken.cancel()
    }
  }, [userId, isBooked, isLiked, productInfo])
  return (

    <Box sx={{ flexGrow: 1, p: 2, backgroundColor:'#EDF3F2'}}>
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} md={6} pl={5} pr={3} mb={3}>
        <img
          style={{ height: '530px', width: '100%' }}
          src={productPhoto ? productPhoto : noPhoto}
          alt='product info'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={1}
          sx={{
            pt: 3,
            pl: 5,
            pb: 3,
            pr: 5,
            ml: 1,
            mr: 2,
            borderRadius: '2px',
            height: '530px', // Same height as the image
            width: '100%',   // Same width as the image
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={10}>
              <Typography variant='h5' component='h6'fontWeight={'bold'}>
                {productInfo.name.toUpperCase()}
              </Typography>
              <Typography
                mb={2}
                variant='caption'
                color='GrayText'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <LocationOnIcon fontSize='small' />
                &nbsp;{productInfo.location}
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              {/*  like functionality*/}
              {isBooked ? (
                <Box>
                  <IconButton
                    disabled={isLiked}
                    aria-label='add to favorites'
                    onClick={handleLike}
                    size='small'
                  >
                    <FavoriteIcon
                      color={isLiked ? 'error' : ''}
                      fontSize='large'
                    />
                  </IconButton>
                </Box>
              ) : (
                ''
              )}
            </Grid>
          </Grid>

          <Typography variant='button' component='div'>
            TYPE: {productInfo.type}
          </Typography>

          <Typography variant='button' component='div'>
            SIZE : {productInfo.size}
          </Typography>

          <Typography variant='button' component='div'>
            Price: Rs. {productInfo.price}/day
          </Typography>

          <Typography variant='button' component='div'>
            <FavoriteIcon color='error' fontSize='large' />
            {productInfo.likes.length} likes
          </Typography>

          <Box display='flex' justifyContent='space-between' my='2%'>
            <Button
              size='small'
              variant='contained'
              color={productInfo.status === 'available' ? 'success' : 'error'}
              style={{
                cursor: 'text',
              }}
            >
              {productInfo.status === 'available' ? 'available' : 'booked'}
            </Button>
            {userId ? (
              <>
                {ownProduct ? (
                  ''
                ) : (
                  <>
                    {productInfo.status === 'available' ? (
                      <>
                        {isBooked ? (
                          ''
                        ) : (
                          <MessageOwnerBox
                            data={{
                              productId: productInfo._id,
                              userId,
                              receiverEmail: userDetails.email,
                            }}
                            checkBooking={checkBooking}
                          />
                        )}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button variant='outlined'>Sign up for booking</Button>
              </Link>
            )}
          </Box>

          {/* alert after liking the product */}
          <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              you booked this item!
            </Alert>
          </Snackbar>

          <hr />

          <Grid container>
            <Grid item xs={12} md={8} mb={'8px'}>
              <Typography variant='h6'>Description:</Typography>
              <Typography
                pr='30%'
                variant='body2'
                component='div'
                color='GrayText'
              >
                {productInfo.description ? productInfo.description : 'N/A'}
              </Typography>
              </Grid>
            </Grid>
            <Box justifyContent='flex-start'>
              <Link
                to='/productList'
                style={{
                  textDecoration: 'none',
                }}
              >
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={<ArrowBackIosIcon />}
                >
                  Back
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* recommendation for user */}
      {userId ? <RecommendSection /> : <UserProduct data={userDetails} />}
    </Box>
  )
}
