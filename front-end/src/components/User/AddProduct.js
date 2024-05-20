import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Alert } from '@mui/material'
import axios from 'axios'
import noPhoto from '../Product/photos/noPhoto.jpg'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'; 

export default function ValidationTextFields() {
  const navigate = useNavigate()
  const [sameProduct, setsameProduct] = useState('')
  const [productInfo, setproductInfo] = useState({
    productName: '',
    type: '',
    size: '',
    price: '',
    location: '',
    status: 'available',
    description: '',
    photo: null,
  })

  const [isSubmit, setisSubmit] = useState(false)
  const [formErrors, setformErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setproductInfo({
      ...productInfo,
      [name]: value,
    })
    if (name.length > 1) {
      setformErrors({ name: null })
    }

    // var src = URL.createObjectURL(event.target.files[0]);
    // imgRef.current.src = src;
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(productInfo))
    setisSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const userId = JSON.parse(localStorage.getItem('users'))._id
        if (userId) {
          const formData = new FormData()
          formData.append('name', productInfo.productName)
          formData.append('price', productInfo.price)
          formData.append('size', productInfo.size)
          formData.append('type', productInfo.type)
          formData.append('userId', userId)
          formData.append('location', productInfo.location)
          formData.append('photo', productInfo.photo)
          formData.append('status', productInfo.status)
          formData.append('description', productInfo.description)

          const response = await axios.post(
            'http://localhost:8080/addProduct',
            formData,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem('token')}`,
              },
            }
          )

          if (response.status === 201) {
            console.log('uploaded succesfully')
            navigate('/user/dashboard/' + userId)
          }
          if (response.status === 200) {
            setsameProduct(response.data)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.photo) {
      errors.photo = '*required'
    }
    if (!values.type) {
      errors.type = '*required'
    }

    if (values.productName.length < 1) {
      errors.productName = '*required'
    }
    if (values.size.length < 1) {
      errors.size = '*required'
    }
    if (values.price.length < 1) {
      errors.price = '*required'
    }
    if (values.location.length < 1) {
      errors.location = '*required'
    }

    return errors
  }
  return (
    <Box
    sx={{
      backgroundColor: '#E5EBEA',
      padding: '2% 2%',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
      margin: 'auto',
    }}
  >
 <Box
  component='form'
  sx={{
    '& .MuiTextField-root': { m: 3, width: '90%' },
    backgroundColor: '#FFFFFF',
    padding: '4% 5%',
    width: '45%',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
    margin: 'auto',
    marginTop: '3%',
    marginBottom: '3%',
    textAlign: 'center',
  }}
  noValidate
  autoComplete='off'
>
  <Typography variant='h5' align='center' fontWeight='bold'>
    Product Details
  </Typography>
  <hr />

  <Grid container spacing={0} direction="column">
  <Grid item xs={12} style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '350px', height: '300px', overflow: 'hidden', position: 'relative' }}>
      <img
        src={productInfo.photo ? URL.createObjectURL(productInfo.photo) : noPhoto}
        alt='productPhoto'
        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 , border: '1px solid #999999' }}
      />
    </div>
  </Grid>


    <Grid item xs={12} >
      <Button
        variant='outlined'
        component='label'
        startIcon={<AddAPhotoIcon />}
        style={{ width: '90%', margin: '0 auto' }}
      >
        Upload Photo
        <input
          type='file'
          hidden
          accept='image/*'
          onChange={(e) => setproductInfo({ ...productInfo, photo: e.target.files[0] })}
        />
      </Button>
      {!!productInfo.photo ? '' : <p style={{ color: 'red' }}>{formErrors.photo}</p>}
    </Grid>
    <Grid item xs={12} style={{ marginBottom: '25px' }}>
      <TextField
        error={!!formErrors.productName}
        value={productInfo.productName}
        helperText={formErrors.productName ? formErrors.productName : ''}
        label='Name'
        name='productName'
        variant='outlined'
        onChange={handleChange}
      />
    </Grid>

    <Grid item xs={12} style={{ marginBottom: '20px' }}>
      <FormControl variant='outlined' sx={{ width: '90%', textAlign: 'left' }}>
        <InputLabel id='demo-simple-select-outlined-label'>Type</InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          name='type'
          value={productInfo.type}
          onChange={handleChange}
          label='Type'
          MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, getContentAnchorEl: null }}
        >
          <MenuItem value='handbags'>Bag</MenuItem>
          <MenuItem value='earrings'>Jewelry</MenuItem>
          <MenuItem value='necklace' >Cloth</MenuItem>
        </Select>

        <FormHelperText>
          <Typography color='error' variant='caption' component='span'>
            {formErrors.type}
          </Typography>
        </FormHelperText>
      </FormControl>
    </Grid>
    
    <Grid item xs={12} >
      <TextField
        error={!!formErrors.size}
        value={productInfo.size}
        helperText={formErrors.size ? formErrors.size : ''}
        label='Size'
        name='size'
        variant='outlined'
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        error={!!formErrors.price}
        value={productInfo.price}
        label='Price/day'
        name='price'
        type='number'
        id='registerPhone'
        helperText={formErrors.price ? formErrors.price : ''}
        variant='outlined'
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} >
      <TextField
        error={!!formErrors.location}
        value={productInfo.location}
        helperText={formErrors.location ? formErrors.location : ''}
        label='Pickup location'
        name='location'
        variant='outlined'
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} >
      <TextField
        id='outlined-multiline-static'
        label='More Description'
        variant='outlined'
        value={productInfo.description}
        name='description'
        multiline
        maxRows={5}
        inputProps={{ maxLength: 300 }}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
      <br />
      {sameProduct ? (
        <Alert
          severity='warning'
          variant='outlined'
          sx={{ width: '70%', justifyContent: 'center', margin: 'auto' }}
        >
          {sameProduct}!
        </Alert>
      ) : (
        ''
      )}
      <Button
        variant='contained'
        color='error'
        sx={{
          display: 'block',
          margin: 'auto',
          // mt: 2,
          width: '90%', // Adjusted width to match text fields
          fontFamily: 'Lora',
          backgroundColor: '#397168',
          color: 'white',
          fontWeight: 'bold',
      
          '&:hover': {
            backgroundColor: '#28554E', // Changing the background color on hovering
          },
        }}
        onClick={handleSubmit}
      >
        Upload
      </Button>
    </Grid>
  </Grid>
</Box>

<Footer />

  </Box>
  

  )
}
