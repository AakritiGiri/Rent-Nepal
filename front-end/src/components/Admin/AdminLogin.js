// src/components/Admin/AdminLogin.js

import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';  // Update the import path to correctly reference Footer

export default function AdminLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [formErrors, setFormErrors] = React.useState({});
  const [serverAuthError, setServerAuthError] = React.useState('');

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const errors = validateForm(email, password);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8080/adminLogin', {
          email,
          password,
        });

        if (response.status === 200 && response.data.admin && response.data.auth) {
          localStorage.clear();
          localStorage.setItem('admin', JSON.stringify(response.data.admin));
          localStorage.setItem('token', response.data.auth);
          navigate('/admin');
          console.log('Admin login successful');
        }
      } catch (error) {
        setServerAuthError('Invalid credentials');
        console.error(error);
      }
    }
  };

  const validateForm = (email, password) => {
    const errors = {};
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          backgroundColor: '#E5EBEA',
        }}
      >
        <Box
          component="form"
          sx={{
            maxWidth: '450px',
            width: '100%',
            padding: '30px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginTop: '1%',
            marginBottom: '1%',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Typography variant='h6' align='center' fontWeight='bold'>
            ADMIN LOG IN
            <hr />
          </Typography>

          <FormControl fullWidth>
            <TextField
              id='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email && formErrors.email}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password && formErrors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </FormControl>

          {serverAuthError && (
            <Alert severity='error'>
              {serverAuthError}!
            </Alert>
          )}

          <Button
            type="submit"
            variant='contained'
            fullWidth
            sx={{ backgroundColor: '#397168', color: 'white', '&:hover': { backgroundColor: '#28554E' } }}
          >
            Login as Admin
          </Button>
        </Box>
      </Box>
      <Footer />  {/* Add the Footer component here */}
    </>
  );
}
