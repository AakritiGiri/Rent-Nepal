import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../helper'; // Ensure this path is correct
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RentalHistory = () => {
  const [rows, setRows] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchRentalHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getRentalHistoryOfSpecificUser/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
          cancelToken: cancelToken.token,
        });
        setRows(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Fetch cancelled for cleanup of RentalHistory.js');
        } else {
          console.error('Error fetching rental history:', error);
        }
      }
    };

    fetchRentalHistory();

    return () => {
      cancelToken.cancel();
    };
  }, [id]);

  return (
    <>
      <Typography variant='h5' my={3} textAlign='center'>
        YOUR RENTAL HISTORY
      </Typography>
      {Array.isArray(rows) && rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead sx={{ backgroundColor: 'ButtonFace' }}>
              <TableRow>
                <TableCell align='center'>S.N</TableCell>
                <TableCell align='center'>Owner</TableCell>
                <TableCell align='center'>Product Name</TableCell>
                <TableCell align='center'>Category</TableCell>
                <TableCell align='center'>Price/day</TableCell>
                <TableCell align='center'>Location</TableCell>
                <TableCell align='center'>Booked date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{row.ownerName}</TableCell>
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.type}</TableCell>
                  <TableCell align='center'>{row.price}</TableCell>
                  <TableCell align='center'>{row.location}</TableCell>
                  <TableCell align='center'>{dateExtractor(row.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography mb={2} mt={3} variant='button' component='h6' fontSize={22} textAlign='center'>
          Oops! you don't have any rental history
        </Typography>
      )}
    </>
  );
};

const dateExtractor = (dateString) => {
  return dateString.split('T')[0];
};

export default RentalHistory;
