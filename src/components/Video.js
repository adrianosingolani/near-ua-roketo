import React, { useRef, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import {
  Box,
  Grid,
} from '@mui/material';

const streamingUrl = 'https://76c240504080.us-east-1.playback.live-video.net/api/video/v1/us-east-1.395008664088.channel.wvTsdEmLB8rk.m3u8';

export default function Video() {
  // const playerRef = useRef();

  // useEffect(() => {
  //   function fireOnVideoError() {
  //     // Do some stuff when the video ends
  //     console.log('error');
  //   }

  //   playerRef.current.addEventListener('emptied', fireOnVideoError);

  //   return () => {
  //     playerRef.current.removeEventListener('emptied', fireOnVideoError);
  //   }
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            aspectRatio: '16 / 9'
          }}>
            <ReactHlsPlayer
              // playerRef={playerRef}
              src={streamingUrl}
              controls
              muted
              width="100%"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}