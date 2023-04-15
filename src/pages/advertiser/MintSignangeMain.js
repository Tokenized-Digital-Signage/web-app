import React from 'react'
import useSettings from '../../hooks/useSettings'
//components
import Page from '../components/Page'
import { Container, Grid} from '@mui/material';
import MintSignageContent from './MintSignageContent';
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
  }));

const MintSignangeMain = () => {

    const { themeStretch } = useSettings();

  return (
    <Page title="Connect">
       
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item sx={{mt: 2}}>
            <MintSignageContent />
            </Grid>
        </Grid>
        </Container>
        
    </Page>
      
  )
}

export default MintSignangeMain