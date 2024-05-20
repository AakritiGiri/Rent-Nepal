import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function FormDialog({ data, checkBooking }) {
  const [open, setOpen] = useState(false);
  const [rentDays, setRentDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/sendEmailAndStoreRentalDetails',
        {
          userId: data.userId,
          productId: data.productId,
          receiverEmail: data.receiverEmail,
          rentDays,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const statusResponse = await axios.put(
        `http://localhost:8080/changeProductStatus/${data.productId}`,
        { status: 'Taken' },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200 && statusResponse.status === 200) {
        checkBooking(true);
        console.log('Email sent successfully, details stored, and product booked');
        setOpen(false);
      } else {
        setError('Failed to book the product. Please try again.');
      }
    } catch (err) {
      console.error('Error booking product:', err);
      setError('Failed to book the product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} component="span">
        Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle fontWeight={'bold'}>Send message to Owner</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the days of rent and notify the owner
          </DialogContentText>
          <TextField
            variant="standard"
            value={rentDays}
            type="number"
            id="rentDays"
            onChange={(e) => setRentDays(e.target.value)}
            sx={{ width: '10ch' }}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Typography mt={3} variant="body2">
            Note: Properly check the product before renting them
          </Typography>
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            size="small"
            onClick={handleBooking}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            disabled={rentDays < 1}
          >
            <span>Book</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
