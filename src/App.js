import React from "react";

import Header from './components/Header';
import Rooms from "./components/Rooms";

import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Header />
      <Box style={{margin: '4em 1em 0'}}>
        <Rooms />
      </Box>
    </div>
  );
}

export default App;
