import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import {
  Box,
  Grid,
  Stack,
  IconButton,
} from '@mui/material';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MicIcon from '@mui/icons-material/Mic';
import MonitorIcon from '@mui/icons-material/Monitor';
import LogoutIcon from '@mui/icons-material/Logout';

const streamingUrl = 'https://76c240504080.us-east-1.playback.live-video.net/api/video/v1/us-east-1.395008664088.channel.wvTsdEmLB8rk.m3u8';

export default function Video() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            backgroundColor: 'black',
            color: 'black',
            aspectRatio: '16 / 9'
          }}>
            <ReactHlsPlayer
              src={streamingUrl}
              autoPlay
              controls
              muted
              width="100%"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' spacing={1}>
            <IconButton onClick={() => console.log('camera')} aria-label='camera'>
              <PhotoCameraIcon />
            </IconButton>
            <IconButton onClick={() => console.log('mic')} aria-label='mic'>
              <MicIcon />
            </IconButton>
            <IconButton onClick={() => console.log('share screen')} aria-label='share screen'>
              <MonitorIcon />
            </IconButton>
            <IconButton onClick={() => console.log('exit')} aria-label='exit'>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}