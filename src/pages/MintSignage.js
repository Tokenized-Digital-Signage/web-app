import React from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';
import Page from '../components/Page';

import { styled } from '@mui/material/styles';


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const MintSignage = () => {

  const { isConnected } = useAccount(); 

  if(!isConnected) {
    return <Navigate to="/" />
  }

  return (
   <Page>

    <RootStyle>

    </RootStyle>
    
   </Page>
  )
}

export default MintSignage