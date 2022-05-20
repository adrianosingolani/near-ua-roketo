import React, { useEffect, useState } from 'react';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import Big from 'big.js';

import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Modal,
  Typography
} from '@mui/material';

const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(0),
  '&:last-child': {
    marginRight: 0
  }
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function ActionBar() {
  const [disableButtons, setDisableButtons] = useState(true);
  const [outgoingStreams, setOutgoingStreams] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (window.accountId) setDisableButtons(false);
    else setDisableButtons(true);

    getAccountOutgoingStreams();
  }, []);

  useEffect(() => {
    console.log(outgoingStreams);
  }, [outgoingStreams])

  const createStream = (settings) => {
    const pricePerHour = parseNearAmount(settings.price.toString());
    const pricePerMinute = Big(pricePerHour).div(60).toFixed(0);
    const pricePerSecond = Big(pricePerHour).div(3600).toFixed(0);

    const amountToPay = Big(pricePerMinute).times(settings.minutes).toFixed(0);

    const args = {
      receiver_id: nearEnv.roketoContract,
      amount: amountToPay,
      memo: 'memo',
      msg: JSON.stringify({
        Create: {
          request: {
            owner_id: window.accountId,
            receiver_id: nearEnv.dappContract,
            tokens_per_sec: parseInt(pricePerSecond),
            description: ''
          },
        },
      })
    }

    window.wrapContract.ft_transfer_call(
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

  const nearDeposit = () => {
    // console.log('nearDeposit');

    window.wrapContract.near_deposit(
      {},
      300000000000000,
      parseNearAmount('1')
    )
  }

  const getAccountIncomingStreams = () => {
    window.roketoContract.get_account_incoming_streams({
      account_id: nearEnv.dappContract,
      from: 0,
      limit: 10,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getAccountOutgoingStreams = () => {
    window.roketoContract.get_account_outgoing_streams({
      account_id: window.accountId,
      from: 0,
      limit: 10,
    })
      .then(res => {
        // console.log(res);

        const streams = res.filter(stream => {
          return stream.receiver_id === nearEnv.dappContract
        }).map(stream => {
          return stream;
        })

        setOutgoingStreams(streams);
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <>
      <Box sx={{backgroundColor: '#F55'}}>
        <ActionButton
          disabled={disableButtons}
          variant='contained'
          onClick={() => createStream({
            price: 3,
            minutes: 1
          })}
        >
          Create stream
        </ActionButton>

        <ActionButton disabled={disableButtons} variant='contained' onClick={() => nearDeposit()}>{`Wrap (1 NEAR -> 1 wNEAR)`}</ActionButton>
        <ActionButton disabled={disableButtons} variant='contained' onClick={() => getAccountIncomingStreams()}>Get incoming streams (dApp)</ActionButton>
        <ActionButton disabled={disableButtons} variant='contained' onClick={() => getAccountOutgoingStreams()}>Get outgoing streams (User)</ActionButton>
        <ActionButton disabled={disableButtons} variant='contained' onClick={handleOpen}>Create/Join room</ActionButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default ActionBar;