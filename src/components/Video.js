import React, { useRef, useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import Big from 'big.js';

import {
  Box,
  Grid,
  Modal,
  Typography,
  Button
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 10,
};

const streamingUrl = 'https://76c240504080.us-east-1.playback.live-video.net/api/video/v1/us-east-1.395008664088.channel.wvTsdEmLB8rk.m3u8';

export default function Video({ wrapContract, roketoContract, dappContract, accountId }) {
  const [videoReady, setVideoReady] = useState(false);
  const [paymentStream, setPaymentStream] = useState(null);

  //modal
  const [open, setOpen] = React.useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = (e, r) => {
  //   console.log(r);

  //   setOpen(false);
  // }

  const playerRef = useRef();

  const createStream = (settings) => {
    const pricePerHour = parseNearAmount(settings.price.toString());
    const pricePerMinute = Big(pricePerHour).div(60).toFixed(0);
    const pricePerSecond = Big(pricePerHour).div(3600).toFixed(0);

    const amountToPay = Big(pricePerMinute).times(settings.minutes).toFixed(0);

    const args = {
      receiver_id: roketoContract,
      amount: amountToPay,
      memo: 'memo',
      msg: JSON.stringify({
        Create: {
          request: {
            owner_id: accountId,
            receiver_id: dappContract,
            tokens_per_sec: parseInt(pricePerSecond),
            description: ''
          },
        },
      })
    }

    wrapContract.ft_transfer_call(
      args,
      300000000000000,
      1
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //canplay
  function fireOnVideoCanPlay() {
    console.log('canplay');

    setVideoReady(true);
  }

  //stalled
  function fireOnVideoStalled() {
    console.log('stalled');

    setVideoReady(false);
    fireOnVideoEnded();
  }

  //play
  function fireOnVideoPlay() {
    console.log('play');
  }

  //pause
  function fireOnVideoPause() {
    console.log('pause');
  }

  //ended
  function fireOnVideoEnded() {
    console.log('ended');
  }

  useEffect(() => {
    const player = playerRef;

    player.current.addEventListener('canplay', fireOnVideoCanPlay);
    player.current.addEventListener('stalled', fireOnVideoStalled);

    player.current.addEventListener('play', fireOnVideoPlay);
    player.current.addEventListener('pause', fireOnVideoPause);
    player.current.addEventListener('ended', fireOnVideoEnded);

    return () => {
      player.current.removeEventListener('canplay', fireOnVideoCanPlay);
      player.current.removeEventListener('stalled', fireOnVideoStalled);

      player.current.removeEventListener('play', fireOnVideoPlay);
      player.current.removeEventListener('pause', fireOnVideoPause);
      player.current.removeEventListener('ended', fireOnVideoEnded);
    }
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{
              display: 'flex',
              aspectRatio: '16 / 9'
            }}>
              <ReactHlsPlayer
                playerRef={playerRef}
                src={streamingUrl}
                controls
                muted
                width="100%"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        // onClose={(e, r) => handleClose(e, r)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <Box sx={modalStyle}>
          {
            videoReady ? (
              <Box sx={{ display: 'flex', flexDirection:'column' }}>
                <Typography id="modal-modal-title" variant="h6">
                  Streaming is live!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} paragraph>
                  If you want to watch and donate, click on the button bellow and you will be asked to approve the payment.
                </Typography>
                <Typography variant="subtitle2" paragraph>
                  * You will need wNEAR for it.
                </Typography>
                <Button 
                  variant='contained'
                  // onClick={() => createStream({
                  //   price: 3,
                  //   minutes: 1
                  // })}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Watch and donate
                </Button>
              </Box>
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Waiting for the streaming to be ready.
                </Typography>
              </>
            )
          }
        </Box>
      </Modal>
    </>
  )
}