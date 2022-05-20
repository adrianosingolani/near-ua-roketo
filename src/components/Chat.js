import React, { useRef, useEffect, useState } from 'react';
import Big from 'big.js';

import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField
} from '@mui/material';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default function Chat({ dappContract }) {
  const chatBottom = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = (message) => {

    dappContract.sendMessage(
      { message: message },
      BOATLOAD_OF_GAS,
      '0'
    )
      .then(() => {
        getMessages();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getMessages = () => {
    dappContract.getMessages()
      .then(messages => {
        setChatMessages([...messages]);

        chatBottom.current.scrollIntoView();
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getMessages();
  }, [])

  useEffect(() => {
    chatBottom.current.scrollIntoView();
  }, [chatMessages])

  return (
    <Box sx={
      {
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: '4px',
        padding: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    }>
      <List sx={{ overflow: 'scroll', padding: 0 }}>
        {
          chatMessages.map((message, index) => {
            return (
              <ListItem key={index} alignItems='flex-start' sx={{ padding: '0 8px 16px' }}>
                <ListItemAvatar>
                  <Avatar alt={message.user} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='subtitle2'>
                      {message.user}
                    </Typography>
                  }
                  secondary={
                    <Typography variant='body2'>
                      {message.message}
                    </Typography>
                  }
                />
              </ListItem>
            )
          })
        }
        <ListItem ref={chatBottom} />
      </List>
      <TextField
        variant='outlined'
        placeholder='Type your message'
        autoFocus
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = '';
          }
        }}
        sx={{ marginTop: 'auto' }}
      />
    </Box>
  )
}