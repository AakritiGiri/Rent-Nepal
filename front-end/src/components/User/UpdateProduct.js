import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import noPhoto from '../Product/photos/noPhoto.jpg';

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ValidationTextFields() {
  const params = useParams();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('users'))._id;
  const [productInfo, setproductInfo] = useState({
    name: '',
    type: '',
    size: '',
    price: '',
    location: '',
    photo: '',
  });
  const [uploadedFile, setuploadedFile] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
  const [isupdate, setisupdate] = useState(false);

  const [formErrors, setformErrors] = useState({});

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(
        `http://localhost:8080/getProductDetailById/${params.id}`,
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
        setproductInfo(res.data.productDetails);

        if (res.data.productDetails.photo) {
          var photoName = res.data.productDetails.photo.replace('public\\', '');
          photoName = `http://localhost:8080/${photoName}`;
          setprofilePic(photoName);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of updateProduct.js');
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setproductInfo({
      ...productInfo,
      [name]: value,
    });

    // var src = URL.createObjectURL(event.target.files[0]);
    // imgRef.current.src = src;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setformErrors(validateForm(productInfo));
    setisupdate(true);
    if (Object.keys(formErrors).length === 0 && isupdate) {
      try {
        const imageFile = uploadedFile ? uploadedFile : productInfo.photo;
        const formData = new FormData();
        formData.append('name', productInfo.name);
        formData.append('price', productInfo.price);
        formData.append('size', productInfo.size);
        formData.append('type', productInfo.type);
        formData.append('location', productInfo.location);

        formData.append('photo', imageFile);

        const response = await axios.put(
          'http://localhost:8080/updateProductById/' + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 200) {
          navigate('/user/dashboard/' + userId);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.photo) {
      errors.photo = '*required';
    }
    if (!values.type) {
      errors.type = '*required';
    }

    if (values.name.length < 1) {
      errors.name = '*required';
    }
    if (values.size.length < 1) {
      errors.size = '*required';
    }
    if (values.price.length < 1) {
      errors.price = '*required';
    }
    if (values.location.length < 1) {
      errors.location = '*required';
    }

    return errors;
  };
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
    marginTop: '1%',
    marginBottom: '1%',
    textAlign: 'center',
  }}
  noValidate
  autoComplete='off'
>
  <Typography variant='h5' align='center' fontWeight='bold'>
    Product Information
  </Typography>
  <hr style={{ marginBottom: '5%', border: '1px solid #999999' }} />

  <img
    src={profilePic ? profilePic : noPhoto}
    alt='Product'
    height='300px'
    width='350px'
    style={{ margin: 'auto', display: 'block', marginBottom: '5%', border: '1px solid #999999' }}
  />

  <TextField
    error={!!formErrors.name}
    value={productInfo.name}
    helperText={formErrors.name ? formErrors.name : ''}
    label='Name'
    name='name'
    variant='outlined'
    onChange={handleChange}
  />

  <FormControl variant='outlined' sx={{ m: 3, width: '90%', textAlign: 'left' }}>
    <InputLabel id='demo-simple-select-outlined-label'>Type</InputLabel>
    <Select
      labelId='demo-simple-select-outlined-label'
      id='demo-simple-select-outlined'
      name='type'
      value={productInfo.type}
      onChange={handleChange}
      label='Type'
    >
      <MenuItem value='trekking'>Bag</MenuItem>
      <MenuItem value='watch'>Cloth</MenuItem>
      <MenuItem value='coats'>Jewelry</MenuItem>
   
    </Select>
    <FormHelperText>
      <Typography color='error' variant='caption' component='span'>
        {formErrors.type}
      </Typography>
    </FormHelperText>
  </FormControl>

  <TextField
    error={!!formErrors.size}
    value={productInfo.size}
    helperText={formErrors.size ? formErrors.size : ''}
    label='Size'
    name='size'
    variant='outlined'
    onChange={handleChange}
  />

  <TextField
    error={!!formErrors.price}
    value={productInfo.price.toString()}
    label='Price/day'
    name='price'
    type='number'
    id='registerPhone'
    helperText={formErrors.price ? formErrors.price : ''}
    variant='outlined'
    onChange={handleChange}
  />

  <TextField
    error={!!formErrors.location}
    value={productInfo.location}
    helperText={formErrors.location ? formErrors.location : ''}
    label='Pickup Location'
    name='location'
    variant='outlined'
    onChange={handleChange}
  />

  <div style={{ textAlign: 'center' }}>
    <Button component='label' startIcon={<AddAPhotoIcon />} style={{ width: '90%', margin: 'auto', border: '1px solid #999999' }}>
      <input
        hidden
        accept='image/*'
        type='file'
        onChange={(e) => {
          setuploadedFile(e.target.files[0]);
          setprofilePic(URL.createObjectURL(e.target.files[0]));
        }}
      />
      Change Product Photo
    </Button>
  </div>

  <Button
    variant='contained'
    color='error'
    sx={{
      display: 'block',
      margin: 'auto',
      mt: 3,
      width: '90%', // Adjusted width to match text fields
      backgroundColor: '#397168',
      color: 'white',
      // fontWeight: 'bold',
      marginBottom: '-4%',
      border: '1px solid #999999',
      '&:hover': {
        backgroundColor: '#28554E', // Changing the background color on hovering
      },
    }}
    onClick={handleSubmit}
  >
    Update
  </Button>
</Box>

    </Box>
  );
}
