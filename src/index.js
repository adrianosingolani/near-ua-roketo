import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { initializeContract } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          margin: '8px',
        },
      },
    },
  },
});

window.nearInitPromise = initializeContract()
  .then(({ walletConnection, accountId, nearEnv, roketoContract, wrapContract, dappContract }) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App 
            walletConnection={walletConnection}
            accountId={accountId}
            nearEnv={nearEnv}
            roketoContract={roketoContract}
            wrapContract={wrapContract}
            dappContract={dappContract}
          />
        </ThemeProvider>
      </React.StrictMode>
    );
  })
  .catch(console.error);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();