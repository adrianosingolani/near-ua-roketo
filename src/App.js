import React from "react";

import Header from './components/Header';
import ActionBar from "./components/ActionBar";
import Room from "./components/Room";

import { Box } from "@mui/material";

function App() {
  return (
    <Box className="App" sx={{height: '100%'}}>
      <Header />
      <Box style={{paddingTop: '4em', height: '100%'}}>
        {/* <ActionBar /> */}
        <Room />
      </Box>
    </Box>
  );
}

export default App;
