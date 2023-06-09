import React, {useState} from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';


//---------------------WorldCoin
import { CredentialType, IDKitWidget } from "@worldcoin/idkit"
import ABIS from '../../abis/ABIS.json';

//@mui  
import { Card, TextField, Typography, Stack, Grid, Button, Box } from '@mui/material';




const MintSignageContent = () => {

  const ethers = require("ethers");

  const { isConnected, address } = useAccount(); 
  const [formData, setFormData] = useState({uri: ''});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleProof = result => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 3000)
    })
  }

  const onSuccess = result => {
    const resultUpdate = result
    if(resultUpdate !==null) {
      setData(resultUpdate)
    }
    
  }


  //------------------------------------

  
 
  async function Mint(e) {

    e.preventDefault();
    console.log(data)
    
    try{

    setLoading(true)

    
   
    const userAddress = address;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract('0xf70B47083c49F192e8DBe9c2612dc9cFE77830BB', ABIS, signer);

    const verifyAndExecute = await contract.safeMintForDebugging(userAddress, formData.uri);
    const receipt = await verifyAndExecute.wait();
    
    if (receipt) {
      setLoading(false);
      setSuccess(true);
      setFormData({uri: ''})
    }

  } catch (e) {
    console.log(e)
    setLoading(false)
    setFormData({uri: ''})
  }
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const credential_types = urlParams.get("credential_types")?.split(",") || [
    CredentialType.Orb,
    CredentialType.Phone
  ];

  const action = urlParams.get("action") || process.env.REACT_APP_WORLD_COIN_ACTION;
  const app_id = urlParams.get("app_id") || process.env.REACT_APP_WORLD__COIN_APP_ID;

  if (!isConnected) {
    return <Navigate to="/" />;
  }

  return (
   
    <Card sx={{ p: 3, boxShadow: 3 }}>

      {success === true ? 
      <>
      <Typography variant="subtitle1" gutterBottom>
        Successfully Minted Signage Content !!
      </Typography>
      </> 
      :
      <>
      <Typography variant="subtitle1" gutterBottom>
        {data !== null ? <>Mint your Content for Signage</> : <>Please Verfiy to Upload Content</>}
      </Typography>


      {data === null ?
      <IDKitWidget
        style={{zIndex: 9999}}
        action={action}
        signal={process.env.REACT_APP_WORLD_COIN_SIGNAL}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id={app_id}
        credential_types={credential_types}
      >
        {({ open }) => <Button variant="outlined" onClick={open}>Verify</Button>}
      </IDKitWidget>
      :
      null}
     

      {data && data !== null ?
      <>
      <Stack spacing={3} sx={{mt: 2}}>
        
      <form onSubmit={Mint}>
          <Box sx={{mb: 3}}>
           
          <Grid container spacing={2} >
              <Grid item xs={12} >
                  <TextField placeholder="Metadata URL" id="metadata" label="Metadata URL" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, uri: e.target.value})} value={formData.uri}/>
                </Grid>
          </Grid>
         
          </Box>

        <Stack direction="row" spacing={1.5}>
 
          <>
          {loading === true ? <> <Button variant="contained" size="large" disabled>Minting...</Button></> : 
            <Button  variant="contained" size="large" type="submit">Mint</Button> }
          </>
        </Stack>
        </form>
      </Stack>
      </>
      :null
      }
      </>
    }
    </Card>
   
  )
}

export default MintSignageContent