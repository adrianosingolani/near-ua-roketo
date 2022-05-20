import React from 'react';

import {
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const chatUsers = [
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
