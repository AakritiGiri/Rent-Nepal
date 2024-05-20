import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useNavigate } from 'react-router-dom'
import noPhoto from './Product/photos/noPhoto.jpg'
import Footer from './Footer'

export default function ValidationTextFields() {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    gender: '',
    photo: null,
  })
  const [isSubmit, setisSubmit] = useState(false)
  const [isChecked, setisChecked] = useState(false)
  const [formErrors, setformErrors] = useState({})
  const [serverAuthError, setserverAuthError] = React.useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setuserDetails({
      ...userDetails,
      [name]: value,
    })
    if (name.length > 1) {
      setformErrors({ name: null })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(userDetails))
    setisSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit && isChecked) {
      try {
        const formData = new FormData()
        formData.append('firstname', userDetails.firstname)
        formData.append('lastname', userDetails.lastname)
        formData.append('email', userDetails.email)
        formData.append('password', userDetails.password)
        formData.append('address', userDetails.address)
        formData.append('phone', userDetails.phone)
        formData.append('photo', userDetails.photo)
        formData.append('gender', userDetails.gender)

        const response = await axios.post(
          'http://localhost:8080/signup',
          formData
        )
        if (response.status === 200) {
          if (response.data.user && response.data.auth) {
            localStorage.setItem('users', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.auth)
            navigate('/')
            console.log(' registered succesfully')
          } else {
            setserverAuthError(response.data)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    const auth = localStorage.getItem('users')
    const adminAuth = localStorage.getItem('admin')
    if (auth || adminAuth) {
      navigate('/')
    }
  }, [])

  const validateForm = (values) => {
    const errors = {}
    if (!isChecked) {
      errors.checkbox = 'Please check the terms and conditions'
    }
    if (!values.photo) {
      errors.photo = '*Required'
    }
    if (!values.gender) {
      errors.gender = '*Required'
    }

    if (!/^(98|97)\d{8}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number'
    }
     // Regular expression to match alphabetic characters only
  const alphabeticRegex = /^[a-zA-Z]+$/;
 
  // Check if first name is empty or contains non-alphabetic characters
  if (!values.firstname || !alphabeticRegex.test(values.firstname)) {
    errors.firstname = '*Required';
  }

  // Check if last name is empty or contains non-alphabetic characters
  if (!values.lastname || !alphabeticRegex.test(values.lastname)) {
    errors.lastname = '*Required';
  }
  // Check if address is empty or contains non-alphabetic characters
  if (!values.address || !alphabeticRegex.test(values.address)) {
    errors.address = '*Required';
  }
  
    if (values.password.length < 6) {
      errors.password = '*Must be greater than 6 characters'
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = '*Required'
    }

    return errors
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
    // Set minimum height to occupy the full viewport height
        backgroundColor: '#E5EBEA',
        
      }}
    >
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 3, width: '90%' },
          backgroundColor: '#FFFFFF',
          padding: '3% 0.5%',
          width: '40%',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
          margin: 'auto',
          marginTop: '3%',
          marginBottom: '3%',
          textAlign: 'center',
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Typography variant='h6' align='center' fontWeight={'bold'}>
          REGISTER
        </Typography>
        <hr />
        <Grid container spacing={2}>
        <Grid item xs={12} style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
      <img
        src={userDetails.photo ? URL.createObjectURL(userDetails.photo) : noPhoto}
        alt='user'
        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
      />
    </Grid>
          <Grid item xs={12}>
            <Button
              variant='outlined'
              component='label'
              startIcon={<AddAPhotoIcon />}
              style={{ width: '90%' }} // Set the width of the button to match the text fields
            >
              Upload Photo
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={(e) => setuserDetails({ ...userDetails, photo: e.target.files[0] })}
              />
            </Button>
            {!!userDetails.photo ? '' : <p style={{ color: 'red' }}>{formErrors.photo}</p>}
          </Grid>
        </Grid>
        <TextField
          error={!!formErrors.firstname}
          value={userDetails.firstname}
          helperText={formErrors.firstname ? formErrors.firstname : ''}
          label='First Name'
          name='firstname'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          error={!!formErrors.lastname}
          value={userDetails.lastname}
          helperText={formErrors.lastname ? formErrors.lastname : ''}
          label='Last Name'
          name='lastname'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          error={!!formErrors.email}
          value={userDetails.email}
          label='Email'
          name='email'
          type='email'
          helperText={formErrors.email ? formErrors.email : ''}
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          error={!!formErrors.password}
          value={userDetails.password}
          label='Password'
          name='password'
          type='password'
          helperText={formErrors.password ? formErrors.password : ''}
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          error={!!formErrors.address}
          value={userDetails.address}
          helperText={formErrors.address ? formErrors.address : ''}
          label='Address'
          name='address'
          variant='outlined'
          onChange={handleChange}
        />
        <TextField
          error={!!formErrors.phone}
          value={userDetails.phone}
          label='Mobile No.'
          id='registerPhone'
          name='phone'
          type='tel'
          helperText={formErrors.phone ? formErrors.phone : ''}
          variant='outlined'
          onChange={handleChange}
        />
        <FormControl variant='outlined' sx={{ my: 2, width: '90%' }}>
          <InputLabel id='demo-simple-select-outlined-label'>Gender</InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            name='gender'
            value={userDetails.gender}
            onChange={handleChange}
            label='Gender'
            sx={{ textAlign: 'left' }} // Align text to the left
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
          <FormHelperText sx={{ color: 'red' }}>
            {formErrors.gender}
          </FormHelperText>
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          onChange={(e) => setisChecked(e.target.checked)}
          label='I accept the Terms Of Service and Privacy Policy'
        />
        {!isChecked && (
          <p style={{ color: '#d32f2f', margin: '0%' }}>
            {formErrors.checkbox}
          </p>
        )}
        {serverAuthError && (
          <Alert
            severity='warning'
            variant='outlined'
            sx={{
              width: '70%',
              justifyContent: 'center',
              margin: 'auto',
              marginBottom: '10px',
            }}
          >
            {serverAuthError}!
          </Alert>
        )}
        <Button
          type="submit"
          variant='contained'
          sx={{
            display: 'block',
            margin: 'auto',
            marginTop: '20px',
            width: '90%',
            color: 'white',
            backgroundColor: '#397168',
            '&:hover': {
              backgroundColor: '#28554E', // Changing the background color on hovering
            },
          }}
        >
          Register
        </Button>
      </Box>
      <Footer /> {/* Adjust width and margin-top */}
    </Box>
  )
}
