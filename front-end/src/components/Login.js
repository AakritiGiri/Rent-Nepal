import * as React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Footer from './Footer'

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formErrors, setFormErrors] = React.useState({})
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [serverAuthError, setServerAuthError] = React.useState('')

  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  
  const handleLogin = async () => {
    setFormErrors(validateForm(email, password))
    setIsSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          email,
          password,
        })

        if (response.status === 200) {
          if (response.data.user && response.data.auth) {
            localStorage.setItem('users', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.auth)
            navigate('/')
            console.log('login successful')
          } else {
            setServerAuthError(response.data)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  
  const validateForm = (email, password) => {
    const errors = {}
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Invalid email address'
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }
    return errors
  }
  
  React.useEffect(() => {
    const auth = localStorage.getItem('users')
    const adminAuth = localStorage.getItem('admin')
    if (auth || adminAuth) {
      navigate('/')
    }
    return () => {
      const isLogged = localStorage.getItem('users')
      if (isLogged) {
        console.log('Congratulations! You are logged in')
      }
    }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin()
  }
  
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', backgroundColor: '#E5EBEA', marginBottom:'-0.5%' }}>
        <Box
          component="form"
          sx={{
            maxWidth: '450px',
            width: '100%',
            padding: '30px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
            // borderRadius: '1px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginTop: '5%',
            marginBottom: '5%'
          
          }}
          onSubmit={handleSubmit}
        >

          
          <Typography variant='h6' align='center' fontWeight='bold'>
            SIGN IN
            <hr />
          </Typography>
        
          <FormControl fullWidth>
            <TextField
              id='email'
              label='Email'
              value={email}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email && formErrors.email}
            />
          </FormControl>


          <FormControl fullWidth>
            <TextField
              id='password'
              label='Password'
              value={password}
              type={showPassword ? 'text' : 'password'}
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
            Login
          </Button>
          <Typography variant='body2' align='center'>
            <Link to='/register' style={{ textDecoration: 'none', color: '#397168' }}>
              Don't have an account? Register here.
            </Link>
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
