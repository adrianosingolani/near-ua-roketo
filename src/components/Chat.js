import React from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material';

const chatMessages = [
  {
    user: 'trpr.testnet',
    message: 'Ut nostrud eiusmod dolor quis et aliqua commodo ipsum officia incididunt occaecat id nostrud irure.'
  },
  {
    user: 'brooklyn.testnet',
    message: 'Nisi Lorem eu magna duis ullamco velit veniam. In labore elit qui do sunt cillum. Laborum duis quis laborum laborum sit pariatur reprehenderit sint Lorem enim tempor. Ullamco Lorem eu laboris mollit ad. Minim enim exercitation enim id aute sit enim dolor cillum. Nisi eu anim aute irure proident veniam sunt quis eiusmod.'
  },
  {
    user: 'trpr.testnet',
    message: 'Est duis sint labore consequat enim ipsum sint cillum sint.'
  },
  {
    user: 'trpr.testnet',
    message: 'Excepteur proident quis elit adipisicing incididunt pariatur eu velit eu elit commodo exercitation ea. Sint qui duis dolor enim voluptate eiusmod ex. Excepteur aliqua reprehenderit est duis ad fugiat proident. Nisi mollit sit duis adipisicing est et sint. Elit sint duis sunt ex duis incididunt voluptate et consequat cupidatat aliquip sint.'
  },
  {
    user: 'brooklyn.testnet',
    message: 'Reprehenderit proident excepteur irure minim officia. Tempor eiusmod id enim velit sint minim nostrud aliquip do voluptate. Aute occaecat veniam laborum fugiat non nisi incididunt est pariatur anim. Dolore esse enim mollit eu. Est amet et amet fugiat aute irure elit. Proident ullamco labore commodo veniam ut.'
  },
  {
    user: 'trpr.testnet',
    message: 'Labore reprehenderit laborum adipisicing irure nostrud irure.'
  },
  {
    user: 'cookiecake.testnet',
    message: 'Ad elit eu commodo consequat ad aute eu do eu.'
  },
  {
    user: 'trpr.testnet',
    message: 'Qui aliqua ipsum non id veniam non sunt. Reprehenderit ex commodo tempor dolore eiusmod voluptate. Pariatur consequat esse officia occaecat pariatur eu incididunt est officia nisi proident nostrud tempor laborum. Sit incididunt fugiat laboris dolore anim consectetur. Cupidatat qui culpa aute enim ad adipisicing aliquip.'
  },
  {
    user: 'brooklyn.testnet',
    message: 'Magna nisi non amet nulla dolore culpa occaecat labore aliqua nisi et. Culpa eu fugiat consequat ut nisi magna magna ut ad commodo sunt fugiat fugiat ea. Lorem tempor adipisicing et nisi tempor ad. Incididunt ullamco nisi laborum reprehenderit commodo. Anim est consectetur est velit Lorem elit quis consequat commodo duis duis. Sint ullamco laborum ea aute quis. Consequat anim magna dolore nisi excepteur nostrud irure labore deserunt culpa sit ex.'
  }
]

export default function Chat() {
  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', borderRadius: '4px', padding: 1 }}>
      <List sx={{ height: '100%', overflow: 'scroll', padding: 0 }}>
        {
          chatMessages.map((message, index) => {
            return (
              <ListItem key={index} alignItems="flex-start" sx={{ padding: '0 8px 16px'}}>
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
      </List>
    </Box>
  )
}
