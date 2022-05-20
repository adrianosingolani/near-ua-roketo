import React from 'react';

import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper
} from '@mui/material';

import Video from './Video';
import ChatTabs from './ChatTabs';

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid #EEE'
}));

function Room({ wrapContract, dappContract, roketoContract, accountId }) {
  return (
    <Box sx={{ height: '100%' }}>
      <Grid container spacing={2} sx={{ height: '100%', padding: '16px 16px 0' }}>
        <Grid item xs={8}>
          <GridItem>
            <Video

            />
          </GridItem>
        </Grid>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <GridItem sx={{ height: '100%' }}>
            <ChatTabs
              dappContract={dappContract}
              roketoContract={roketoContract}
              accountId={accountId}
              wrapContract={wrapContract}
            />
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Room;