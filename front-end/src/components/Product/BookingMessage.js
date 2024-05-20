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

export default function OwnerResponse({ data }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [reason, setReason] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAcceptBooking = async () => {
    setLoading(true);
    // Send the booking acceptance to the backend
    try {
      const response = await axios.post(
        `http://localhost:8080/acceptBooking/${data.bookingId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setOpen(false);
        console.log('Booking accepted successfully');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCancelBooking = async () => {
    setLoading(true);
    // Send the booking cancellation with reason to the backend
    try {
      const response = await axios.post(
        `http://localhost:8080/cancelBooking/${data.bookingId}`,
        { reason },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setOpen(false);
        console.log('Booking cancelled successfully');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen} component='span'>
        Respond to Booking
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Owner Response</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Do you want to accept or cancel the booking request?
          </DialogContentText>

          <TextField
            fullWidth
            multiline
            rows={3}
            variant='standard'
            label='Reason for cancellation'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <LoadingButton
            size='small'
            onClick={handleAcceptBooking}
            loading={loading}
            loadingPosition='end'
            variant='outlined'
            startIcon={<SendIcon />}
          >
            Accept Booking
          </LoadingButton>

          <Button onClick={handleClose}>Cancel</Button>

          <LoadingButton
            size='small'
            onClick={handleCancelBooking}
            loading={loading}
            loadingPosition='end'
            variant='outlined'
            startIcon={<SendIcon />}
          >
            Cancel Booking
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
