import React from 'react'
//Wagmi
import { useConnect, useAccount } from 'wagmi'

//components
import Page from '../../components/Page'
//hooks
import useResponsive from '../../hooks/useResponsive';
//mui
import { Container, Box, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const MintSignage = () => {

  const { isConnected, address } = useAccount(); 

  if (!isConnected) {
    return <Navigate to="/" />;
  }
  
  return (
    <Page title="Mint">
      <RootStyle>
        <Container>
          
          
        <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>


          <Button variant="outlined" size="large">Mint Signage</Button>

           </Box>
        </Container>
        </RootStyle>
    </Page>
  )
}

export default MintSignage