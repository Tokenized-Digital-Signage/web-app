import React, {useState} from 'react'
import { useConnect, useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom';
import Page from '../../components/Page';

//---------------------WorldCoin
import { CredentialType, IDKitWidget } from "@worldcoin/idkit"
import { ethers } from "ethers";
import ABIS from '../../abis/ABIS.json';

//@mui  
import { Card, TextField, Typography, Stack, Grid, Button, Box } from '@mui/material';



const MintSignageContent = () => {

  const { isConnected, address } = useAccount(); 
  const [formData, setFormData] = useState({uri: ''});
  const [data, setData] = useState(null);


  const handleProof = result => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 3000)
    })
  }

  const onSuccess = result => {
    console.log(result)
    if(result !== null){
      setData(result)
    }
    console.log(data)
  }

  async function Mint(e, result) {

    e.preventDefault();
    
    const decodedProof = ethers.utils.defaultAbiCoder.decode(["uint256[8]"], result.proof)[0];
    const signal = process.env.REACT_APP_WORLD_COIN_SIGNAL;
    const root = result.merkle_root;
    const nullifierHash = result.nullifier_hash;
    const userAddress = address;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.REACT_APP_SIGNAGE_CONTRACT_ADDRESS, ABIS, signer);
    const verifyAndExecute = await contract.verifyAndExecute(signal, root, nullifierHash, decodedProof, userAddress, formData.uri);
    const receipt = await verifyAndExecute.wait();
    console.log(receipt);
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
   
    <Card>
      <Typography variant="subtitle1" gutterBottom>
        Verfiy and Upload Content
      </Typography>


      
      <IDKitWidget
        action={action}
        signal={process.env.REACT_APP_WORLD_COIN_SIGNAL}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id={app_id}
        credential_types={credential_types}
      >
        {({ open }) => <Button variant="outlined" onClick={open}>Verify</Button>}
      </IDKitWidget>
     

      {data && data !== null ?
      <>
      <Stack spacing={3} sx={{mt: 2}}>
        
      <form onSubmit={Mint}>
          <Box >
           
          <Grid container spacing={2} >
              <Grid item xs={6} >
                  <TextField placeholder="Metadata URL" id="metadata" label="Metadata URL" variant="outlined" fullWidth required autoComplete='off' onChange={e => setFormData({...formData, uri: e.target.value})} value={formData.uri}/>
                </Grid>
          </Grid>
         
          </Box>

        <Stack direction="row" spacing={1.5}>
 
          <>
            <Button variant="outlined" type="submit">Mint</Button>
          </>
        </Stack>
        </form>
      </Stack>
      </>
      :null
      }
    </Card>
   
  )
}

export default MintSignageContent