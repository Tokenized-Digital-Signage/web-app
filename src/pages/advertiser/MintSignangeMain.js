import React from 'react'
import useSettings from '../../hooks/useSettings'
//components
import Page from '../../components/Page'
import { Typography, Grid} from '@mui/material';
import MintSignageContent from './MintSignageContent';
import { styled } from '@mui/material/styles';


const MintSignangeMain = () => {

    const { themeStretch } = useSettings();

  return (
    <Page title="Connect">

  <Typography variant="h4" component="h1" paragraph>
       Mint Signage Contents
    </Typography>
     
       
       <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item sx={{mt: 2}}>
              <MintSignageContent />
            </Grid>
        </Grid>
       
    </Page>
      
  )
}

export default MintSignangeMain