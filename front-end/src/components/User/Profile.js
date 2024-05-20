import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Snackbar, Button, Grid, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import noProfile from '../Product/photos/noProfile.png';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function ProfileForm() {
  const [open, setOpen] = React.useState(false);
  const params = useParams();

  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    photo: '',
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(
        `http://localhost:8080/getUserDetails/${params.id}`,
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
        setUserDetails(res.data);
        if (res.data.photo) {
          var photoName = res.data.photo.replace('public\\', '');
          photoName = `http://localhost:8080/${photoName}`;
          setProfilePic(photoName);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of profile.js');
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setFormErrors(validateForm(userDetails));
    setIsUpdate(true);
    if (Object.keys(formErrors).length === 0 && isUpdate) {
      try {
        const imageFile = uploadedFile ? uploadedFile : userDetails.photo;
        const formData = new FormData();
        formData.append('firstname', userDetails.firstname);
        formData.append('lastname', userDetails.lastname);
        formData.append('address', userDetails.address);
        formData.append('phone', userDetails.phone);
        formData.append('photo', imageFile);

        const response = await axios.patch(
          'http://localhost:8080/updateUserProfile/' + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 200) {
          setOpen(true);
          console.log('user updated successfully');
          setEditable(false); // Disable edit mode after update
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (values.phone.length !== 10) {
      errors.phone = 'Phone no. must be of 10 digits';
    }
    if (values.firstname.length < 1) {
      errors.firstname = '*Required';
    }
    if (values.lastname.length < 1) {
      errors.lastname = '*Required';
    }
    if (values.address.length < 1) {
      errors.address = '*Required';
    }

    return errors;
  };

  return (
    
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5EBEA' }}>
    <Box
    component="form"
    sx={{
      maxWidth: '500px',
      width: '100%',
      padding: '25px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      margin: 'auto', // Centering the form
      marginTop: '3%',
      marginBottom: '3%'
    }}
    noValidate
    autoComplete='off'
  >
    <Typography variant='h6' align='center' fontWeight='bold'>
      MY PROFILE
      <hr />
    </Typography>
  
    <Grid container justifyContent='center'>
    <Grid item xs={12} textAlign='center'>
      <div style={{ width: '350px', height: '350px', overflow: 'hidden', margin: '0 auto', marginTop:'-6%' }}>
        <img 
          src={profilePic ? profilePic : noProfile} 
          alt='Profile' 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      {!editable && (
        <Typography variant='h5' component='div' textAlign='center' fontWeight='bold'>
          {userDetails.firstname}
        </Typography>
      )}
    </Grid>
    </Grid>
  
    {editable ? (
      <>
        <TextField
          error={!!formErrors.firstname}
          value={userDetails.firstname}
          helperText={formErrors.firstname ? formErrors.firstname : ''}
          label='First Name'
          name='firstname'
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
  
        <TextField
          error={!!formErrors.lastname}
          value={userDetails.lastname}
          helperText={formErrors.lastname ? formErrors.lastname : ''}
          label='Last Name'
          name='lastname'
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
  
        <TextField
          error={!!formErrors.address}
          value={userDetails.address}
          helperText={formErrors.address ? formErrors.address : ''}
          label='Address'
          name='address'
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
  
        <TextField
          error={!!formErrors.phone}
          value={userDetails.phone}
          label='Phone No.'
          id='registerPhone'
          name='phone'
          type='number'
          helperText={formErrors.phone ? formErrors.phone : ''}
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
      </>
    ) : (
      <>
        <Typography variant='body1' align='left'>
          First Name: {userDetails.firstname}
        </Typography>
        <Typography variant='body1' align='left'>
          Last Name: {userDetails.lastname}
        </Typography>
        <Typography variant='body1' align='left'>
          Address: {userDetails.address}
        </Typography>
        <Typography variant='body1' align='left'>
          Phone No.: {userDetails.phone}
        </Typography>
      </>
    )}
  
    <Button
      component='label'
      startIcon={<AddAPhotoIcon />}
      variant='contained'
      color='primary'
      fullWidth
    >
      Change Profile Picture
      <input
        hidden
        accept='image/*'
        type='file'
        onChange={(e) => {
          setUploadedFile(e.target.files[0]);
          setProfilePic(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </Button>
  
    <Button
      variant='contained'
      color='primary'
      onClick={() => setEditable(!editable)}
      sx={{ backgroundColor: '#397168', color: 'white', '&:hover': { backgroundColor: '#28554E' } }}
    >
      {editable ? 'Save' : 'Edit'}
    </Button>
  
    <Button
      variant='contained'
      color='primary'
      sx={{ backgroundColor: '#397168', color: 'white', '&:hover': { backgroundColor: '#28554E' } }}
      onClick={handleUpdate}
    >
      UPDATE
    </Button>
  
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
        Profile updated successfully!
      </Alert>
    </Snackbar>
  </Box>
  </Box>
  );
}
