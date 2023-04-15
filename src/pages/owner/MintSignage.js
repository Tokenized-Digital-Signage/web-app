import React, {useState} from 'react'
//Wagmi
import { useConnect, useAccount } from 'wagmi'

//components
import Page from '../../components/Page'
//hooks
import useResponsive from '../../hooks/useResponsive';
//mui
import { Card, Box, Button, Typography, TextField, Grid, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

//-------------ABIS
import ABIS2 from '../../abis/ABIS2.json';



const MintSignage = () => {

  const { isConnected, address } = useAccount(); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newReceipt, setNewReceipt] = useState(null);
  const [formData, setFormData] = useState({tokenId: ''});

  
  
  async function mintSig(e) {

    e.preventDefault();

    //-------------Id
    try {

    setLoading(true)

    const Ethers = require("ethers");
    const provider = new Ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new Ethers.Contract('0x06C96F03934c7799FEae82f62F887BdC9dD5f1fE', ABIS2, signer);
    const mintSig = await contract.mint(address, formData.tokenId); //mint function
    const receipt = await mintSig.wait();
    if (receipt) {
      setNewReceipt(receipt)
      setLoading(false);
      setSuccess(true)
    }

  } catch (e) {
    console.log(e)
    setLoading(false)
    setSuccess(false)
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
          
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid item sx={{mt: 2}}>

        {success === true ? 

          <Typography variant="h4" component="h1" paragraph sx={{mb: 5}}>
              Minted Successfully! Your AD Spot ID is: {formData.tokenId}
          </Typography>
        
         :       
        <Card sx={{ p: 3, boxShadow: 3 }}>

          

           <Stack spacing={3} sx={{mt: 2}}>
        
        <form onSubmit={mintSig}>
          
             
            <Grid container spacing={2} sx={{mb: 2}}>
                <Grid item xs={12} >
                    <TextField type="number" placeholder="10" id="tokenId" label="Token ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, tokenId: e.target.value})} value={formData.tokenId}/>
                  </Grid>
            </Grid>
           
          
          <Stack direction="row" spacing={1.5}>
   
            <>
            {loading === true ? 
            <Button variant="outlined" disabled size="large">Minting...</Button>
          :   <Button variant="outlined" type="submit" size="large" >Mint Signage</Button>}
            </>
          </Stack>
          </form>
          
        </Stack>
        
        </Card>
        }
        </Grid>
        </Grid>
        
    </Page>
  )
}

export default MintSignage