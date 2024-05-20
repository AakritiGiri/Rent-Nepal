import React from 'react'
import Shoe from '../Product/Shoe'
import { Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

const RecommendSection = () => {
  const [products, setproducts] = useState([])
  var cancelToken
  const userId = JSON.parse(localStorage.getItem('users'))._id

  useEffect(() => {
    fetchData()

    return () => {
      if (cancelToken) {
        cancelToken('Cleanup function called before request completion.')
      }
    }
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getRecommendedProducts/${userId}`,
        {
          cancelToken: new axios.CancelToken((token) => (cancelToken = token)),
        }
      )
      setproducts(response.data)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('fetch cancelled for cleanup of product.js')
      }
    }
  }

  return (
    <>
      <Typography variant='h4' gutterBottom my={5} textAlign='center' fontWeight={'Bold'}>
        Recommended
      </Typography>
      {products.length > 0 ? (
        <Grid container spacing={7} rowSpacing={5}>
          {products.map((item) => {
            return <Shoe key={item._id} data={item} />
          })}
        </Grid>
      ) : (
        <Typography
          mb={3}
          mt={1}
          variant='button'
          component='h6'
          fontSize={20}
          textAlign='center'
        >
          Oops! no product found..
        </Typography>
      )}
    </>
  )
}

export default RecommendSection
