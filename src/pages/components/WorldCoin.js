import { CredentialType, IDKitWidget } from "@worldcoin/idkit"

import { Button } from '@mui/material';
import { ethers } from "ethers";
import ABIS from '../../abis/ABIS.json';

export default function WorldCoin() {
    
  const handleProof = result => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 3000)
    })
  }

  const onSuccess = result => {
    console.log(result)
    console.log(
      ethers.utils.defaultAbiCoder.decode(["uint256[8]"], result.proof)[0]
    )
    Verify();
  }

  async function Verify() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(process.env.REACT_APP_SIGNAGE_CONTRACT_ADDRESS, ABIS, signer);
    let verifyAndExecute =  await contract.verifyAndExecute();
    const receipt = await verifyAndExecute.wait();
   
  }

  const urlParams = new URLSearchParams(window.location.search)
  const credential_types = urlParams.get("credential_types")?.split(",") ?? [
    CredentialType.Orb,
    CredentialType.Phone
  ]

  const action = urlParams.get("action") ?? process.env.REACT_APP_WORLD_COIN_ACTION
  const app_id = urlParams.get("app_id") ?? process.env.REACT_APP_WORLD__COIN_APP_ID

  return (
    <div
      className="WorldCoin"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <IDKitWidget
        action={action}
        signal={process.env.REACT_APP_WORLD_COIN_SIGNAL}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id={app_id}
        // walletConnectProjectId="get_this_from_walletconnect_portal"
        credential_types={credential_types}
      >
        {({ open }) => <Button variant="outlined" onClick={open}>Connect</Button>}
      </IDKitWidget>
    </div>
  )
}

