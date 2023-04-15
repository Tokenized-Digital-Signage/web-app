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
import ABIS2 from '../../abis/ABIS2.json';



const MintSignage = () => {

  const { isConnected, address } = useAccount(); 
  const [loading, setLoading] = useState(false);

  
  async function MintSig(e) {

    e.preventDefault();

    //-------------Id
    try {

      setLoading(true)

   const uniqueId = (length=16) => {
      return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }
    const uniqueID = uniqueId() 

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.REACT_APP_SIGNAGE_CONTRACT_ADDRESS_Owner, ABIS2, signer);
    const mintSig = await contract.mint(uniqueID, address); //mint function
    const receipt = await mintSig.wait();
    console.log(receipt);

    setLoading(false)
  } catch {
    console.log(e)
    setLoading(false)
  }
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

          <form onSubmit={MintSig}>
          <Button variant="outlined" size="large">Mint Signage</Button>
          </form>
           </Box>
        
    </Page>
  )
}

export default MintSignage