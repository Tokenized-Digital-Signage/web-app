import React, {useState} from 'react'
//Wagmi
import { useConnect, useAccount } from 'wagmi'

//components
import Page from '../../components/Page'
//hooks
import useResponsive from '../../hooks/useResponsive';
//mui
import { Container, Box, Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ethers } from "ethers";
//-------------ABIS
import ABIS from '../../abis/ABIS.json';


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const MintSignage = () => {

  const { isConnected, address } = useAccount(); 
  
  //Random Int

  
  async function MintSig(e, result) {

    e.preventDefault();

    //-------------Id
    
   const uniqueId = (length=16) => {
      return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }

    const uniqueID = uniqueId() 
 

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.REACT_APP_SIGNAGE_CONTRACT_ADDRESS_Owner, ABIS, signer);
    const mintSig = await contract.verifyAndExecute(uniqueID, address);
    const receipt = await mintSig.wait();
    console.log(receipt);
  }

  if (!isConnected) {
    return <Navigate to="/" />;
  }
  
  return (
    <Page title="Mint">
   
        <Typography variant="h4" component="h1" paragraph sx={{mb: 5}}>
          Mint an AD Spot
        </Typography>
          
          
        <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center' }}>


          <Button variant="outlined" size="large">Mint Signage</Button>

           </Box>
        
    </Page>
  )
}

export default MintSignage