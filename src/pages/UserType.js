import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
//Wagmi
import { useConnect, useAccount } from 'wagmi'

//components
import Page from '../components/Page'
//hooks
import useResponsive from '../hooks/useResponsive';
//mui
import { Container, Box, Button, Alert, Stack, Typography} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const UserType = () => {

  const { isConnected } = useAccount(); 
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const isDesktop = useResponsive('up', 'md');

 

  return (
    <Page title="UserType">
      <RootStyle>
        <Container>
          
        <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>

          <Typography variant="h3" sx={{mb: 5, color: '#ff3c4b'}}>AdTokenVerse</Typography>
         
          <Typography variant="h3" >I am </Typography>
          <Typography sx={{mb: 5}}>(Choose your role to connect)</Typography>

              <Button component={RouterLink} variant="outlined" size="large" sx={{mr: 2}} to="/advertiser">
                An Advertiser
              </Button>

              <Button component={RouterLink} variant="outlined" size="large" sx={{mr: 2}} to="/owner">
                A Signage Owner
              </Button>

           </Box>
        </Container>
        </RootStyle>
    </Page>
  )
}

export default UserType