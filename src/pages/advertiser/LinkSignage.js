import React from 'react'
//Wagmi
import { useConnect, useAccount } from 'wagmi'

//components
import Page from '../../components/Page'

//mui
import { Grid, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import LinkSignageForm from './LinkSignageForm';


const LinkSignage = () => {

  const { isConnected, address } = useAccount(); 


  if (!isConnected) {
    return <Navigate to="/" />;
  }
  
  return (
    <Page title="Mint">

    <Typography variant="h4" component="h1" paragraph>
        Link ADS Spot
    </Typography>
     
       <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item sx={{mt: 2}}>
               <LinkSignageForm />
            </Grid>
        </Grid>
      
    </Page>
  )
}

export default LinkSignage