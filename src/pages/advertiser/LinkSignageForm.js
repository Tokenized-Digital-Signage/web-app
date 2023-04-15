import React, { useState } from 'react';

// @mui
import { Button, Card, Typography, Stack, Grid, TextField  } from '@mui/material';

// ----------------------------------------------------------------------
import { ethers } from "ethers";
//-------------ABIS
import ABIS2 from '../../abis/ABIS2.json';


export default function LinkSignageForm() {


    const [formData, setFormData] = useState({spot: '', content: ''});
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);


    async function LinkSig(e) {

        e.preventDefault();
    
        //-------------Id
        try {
    
        setLoading(true)
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract('0x06C96F03934c7799FEae82f62F887BdC9dD5f1fE', ABIS2, signer);
        const mintSig = await contract.linkAdsSpotToContent(formData.spot, formData.content); //link spot content id
        const receipt = await mintSig.wait();
        if (receipt) {
          setLoading(false);
          setSuccess(true)
        }
    
        
      } catch {
        console.log(e)
        setLoading(false)
        setFormData({spot: '', content: ''})
      }
      }

 


  return (
    <Card sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Link you Ads to Signage 
      </Typography>

      {success === true ? 

  <Typography variant="h4" component="h1" paragraph sx={{mb: 5}}>
      Linked Content ID: {formData.content} to AD Spot with ID: {formData.spot}
  </Typography>

  :

      <form onSubmit={LinkSig}>
      <Stack spacing={3} sx={{mt: 2}}>
        
         <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField type="number" placeholder="AD Spot Token ID" id="spotId" label="Spot Token ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, spot: e.target.value})} value={formData.spot}/>
                </Grid>

                <Grid item xs={12} >
                  <TextField type="number" placeholder="Content Token ID" id="contentId" label="Content Token ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, content: e.target.value})} value={formData.content}/>
                </Grid>

               
        </Grid>

        <Stack direction="row" spacing={1.5}>
 
          <>
          {loading === true ? 
          <Button disabled fullWidth variant="contained" size="large">
            Linking...
          </Button>
          :
          <Button type="submit" fullWidth variant="contained" size="large">
          Link
        </Button>

        }
          </>
          
        </Stack>
      </Stack>
      </form>
    }
    </Card>
  );
}
