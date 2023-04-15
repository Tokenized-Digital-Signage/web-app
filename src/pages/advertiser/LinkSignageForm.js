import React, { useState } from 'react';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import { Button, Card, Typography, Stack, Grid, TextField  } from '@mui/material';

// ----------------------------------------------------------------------


export default function LinkSignageForm() {

    const [formData, setFormData] = useState({spot: '', content: ''});


    

 


  return (
    <Card sx={{ p: 3, boxShadow: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Link you Ads to Signage 
      </Typography>

      <form >
      <Stack spacing={3} sx={{mt: 2}}>
        
         <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField type="number" placeholder="Spot Token ID" id="spotId" label="Spot Token ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, spot: e.target.value})} value={formData.spot}/>
                </Grid>

                <Grid item xs={12} >
                  <TextField type="number" placeholder="Content Token ID" id="contentId" label="Content Token ID" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, content: e.target.value})} value={formData.content}/>
                </Grid>

               
        </Grid>

        <Stack direction="row" spacing={1.5}>
 
          <>
          <Button type="submit" fullWidth variant="contained" size="large">
            Link
          </Button>
          </>
          
        </Stack>
      </Stack>
      </form>
    </Card>
  );
}
