import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Footer from './Footer' // Import the Footer component

export default function Types() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#EDF3F2',
        color: 'black',

      }}
    >
      <Box padding={'3%'}>

      <Typography variant='overline' gutterBottom mb={4} fontSize={25} fontWeight={'bold'} >
        TERMS OF SERVICE
      </Typography>

      <Typography variant='h6' fontWeight={'bold'} >About us:</Typography >

      <Typography variant='body2' gutterBottom >
        RentNepal is an online platform that allows users to register and login
        to upload information about their products and rent them to others, as
        well as rent products from others that have been uploaded to the
        website. Transactions and payments are completed offline. By using the
        RentNepal website, you agree to be bound by these terms of service.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'}  >
        User Account:
      </Typography>

      <Typography variant='body2' gutterBottom >
        To use the RentNepal website, you must create an account. You are
        responsible for maintaining the confidentiality of your account
        information and for any and all activity that occurs under your account.
        You agree to immediately notify RentNepal of any unauthorized use of
        your account or any other breach of security.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Uploading Content:
      </Typography>

      <Typography variant='body1' gutterBottom >
        By uploading content to the RentNepal website, you represent and warrant
        that you have the right to do so and that the content does not infringe
        on any intellectual property rights or other rights of any third party.
        You also grant RentNepal a non-exclusive, royalty-free, worldwide
        license to use, reproduce, display, and distribute the content you
        upload.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Renting products:
      </Typography>

      <Typography variant='body1' gutterBottom >
        Renting products through RentNepal is a transaction between the product
        owner and the renter. RentNepal is not responsible for any disputes or
        issues that may arise between the two parties. RentNepal is not
        responsible for the condition of the products and it is the
        responsibility of the renter to inspect the products before renting
        them.
      </Typography>

      <Typography variant='h6' mt={2}fontWeight={'bold'}  >
        Limitation of Liability:
      </Typography>

      <Typography variant='body1' gutterBottom>
        RentNepal will not be liable for any damages of any kind arising from
        the use of the website, including but not limited to direct, indirect,
        incidental, punitive, and consequential damages.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Changes to the Terms of Service:
      </Typography>

      <Typography variant='body2' gutterBottom >
        RentNepal reserves the right to update or change these terms of service
        at any time and your continued use of the website following any changes
        indicates your acceptance of the new terms.
      </Typography>
      <br />
      <hr />

      <Typography variant='overline' gutterBottom mb={5} fontSize={25} fontWeight={'bold'} >
        privacy policy
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Introduction:
      </Typography>

      <Typography variant='body2' gutterBottom  >
        RentNepal is committed to protecting the privacy of its users. This
        privacy policy explains how we collect, use, and disclose personal
        information. By using the RentNepal website, you agree to the terms of
        this privacy policy.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Information Collection:
      </Typography>

      <Typography variant='body1' gutterBottom >
        We collect personal information when you create an account on the
        RentNepal website, such as your name, email address, and phone number.
        We may also collect information about your use of the website, including
        the pages you visit and the actions you take.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Use of Information:
      </Typography>
      
      <Typography variant='body2' gutterBottom >
        We use the information we collect to provide and improve the RentNepal
        website, to communicate with you, and to conduct research and analysis.
        We may also use the information for marketing and advertising purposes.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Disclosure of Information:
      </Typography>

      <Typography variant='body2' gutterBottom >
        We may disclose your personal information to third parties for the
        purposes of providing the RentNepal website, as well as for legal and
        compliance reasons. We may also share your personal information with
        third-party service providers for the purpose of conducting research and
        analysis.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Data Security:
      </Typography>

      <Typography variant='body2' gutterBottom >
        We take reasonable measure to protect the security of your personal
        information. However, we cannot guarantee that your personal information
        will always be secure.
      </Typography>

      <Typography variant='h6' mt={2} fontWeight={'bold'} >
        Changes to the Privacy Policy:
      </Typography>

      <Typography variant='body2' gutterBottom >
        RentNepal reserves the right to update or change this privacy policy at
        any time and your continued use of the website following any changes
        indicates your acceptance of the new privacy policy.
      </Typography>

      </Box>

      <Footer /> {/* Add the footer component here */}
    </Box>
  )
}
