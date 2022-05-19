import React from 'react';

import {
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const chatUsers = [
  'trpr.testnet',
  'adriano.testnet',
  'brooklyn.testnet',
  'cookiecake.testnet',
  'livia.testnet'
]

export default function Users() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        chatUsers.map((user, index) => {
          return (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText primary={user} />
            </ListItem>
          )
        })
      }
    </List>
  )
}
