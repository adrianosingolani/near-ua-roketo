import React from "react";

import Header from './components/Header';
import Room from "./components/Room";

import { Box } from "@mui/material";

function App({ walletConnection, accountId, nearEnv, roketoContract, wrapContract, dappContract }) {
  return (
    <Box className="App" sx={{ height: '100%' }}>
      <Header
        walletConnection={walletConnection}
        accountId={accountId}
        wrapContract={wrapContract}
      />
      <Box style={{ paddingTop: '4em', height: '100%' }}>
        <Room 
          walletConnection={walletConnection}
          dappContract={dappContract}
        />
      </Box>
    </Box>
  );
}

export default App;