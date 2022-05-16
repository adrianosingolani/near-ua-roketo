import React, { useEffect, useState } from 'react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

import { login, logout } from "../utils";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material/';

export default function ButtonAppBar() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (window.accountId && window.wrapContract) {
      window.wrapContract.ft_balance_of({
        account_id: `${window.accountId}`,
      })
        .then(balance => {
          setBalance(balance);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Streaming for Ukraine
          </Typography>
          {account.accountId ? (
            <>
              <Box style={{display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                <Typography variant="subtitle2">
                  {account.accountId}
                </Typography>
                <Typography variant="subtitle2">
                  {formatNearAmount(balance, 4)} wNEAR
                </Typography>
              </Box>
              <Button sx={{ marginLeft: 2 }} variant="outlined" color="inherit" onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => login()}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}