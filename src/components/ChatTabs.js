import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

import Chat from './Chat';
import Users from './Users';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2, height: '100%' }}>{children}</Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChatTabs() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='Chat tab'>
          <Tab
            sx={{ minHeight: 'fit-content' }}
            icon={<PeopleIcon />} iconPosition='start'
            label='Users'
            {...a11yProps(0)}
            wrapped
            disableRipple
          />
          <Tab
            sx={{ minHeight: 'fit-content' }}
            icon={<ChatIcon />} iconPosition='start'
            label='Chat'
            {...a11yProps(1)}
            wrapped
            disableRipple
          />
        </Tabs>
      </Box>
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        <TabPanel value={value} index={0}>
          <Users />
        </TabPanel>
        <TabPanel value={value} index={1} sx={{ height: '100%' }}>
          <Chat />
        </TabPanel>
      </Box>
    </Box>
  )
}