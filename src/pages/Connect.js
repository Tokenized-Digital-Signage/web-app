import React from 'react'
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

const Connect = () => {

  const { isConnected } = useAccount(); 
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const isDesktop = useResponsive('up', 'md');

  if(isConnected) {
    return <Navigate to="/mint" />
  }

  return (
    <Page title="Connect">
      <RootStyle>
        <Container>
          
        <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>


         
          <Typography variant="h3" >Connect Wallet</Typography>
          <Typography sx={{mb: 5}}>Choose how you want to connect</Typography>


            {error && 
                <Stack>
                <Alert severity="error">{error.message}</Alert>
                </Stack>
              }


           {connectors.map((connector) => (
                  <>
                  {!connector.ready ? 
                  <>
                  {isDesktop &&
                  <Button
                    key={connector.id}
                    // startIcon={<img alt="Metamask Icon" height={26} width={26} src={connector.name === 'MetaMask' ? "/icons/metamask.svg" : connector.name === 'WalletConnect' ? "/icons/walletconnect.svg" : connector.name === 'Coinbase Wallet' ? "/icons/coinbase.svg" : null} />} 
                    fullWidth size="large" variant='outlined'
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener"
                    sx={{mb: 1.5}}
                  >
                    Install {connector.name}
                  </Button>}
                  </>
                  
                  :
                  
                  <Button
                  key={connector.id}
                  // startIcon={<img alt="Metamask Icon" height={26} width={26} src={connector.name === 'MetaMask' ? "/icons/metamask.svg" : connector.name === 'WalletConnect' ? "/icons/walletconnect.svg" : connector.name === 'Coinbase Wallet' ? "/icons/coinbase.svg" : null} />} 
                  fullWidth size="large" variant='outlined'
                  onClick={() => connect({ connector })}
                  sx={{mb: 1.5}}
                >
                  {connector.name}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
                </Button>}
                  </>
                ))}

           </Box>
        </Container>
        </RootStyle>
    </Page>
  )
}

export default Connect