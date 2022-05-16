import React, { useEffect, useState } from 'react';
import getNearEnv from '../nearEnv';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import Big from 'big.js';

import {
  Box,
  Button,
} from '@mui/material';

const nearEnv = getNearEnv('testnet');

function Rooms() {
  const [disableButtons, setDisableButtons] = useState(true);
  const [outgoingStreams, setOutgoingStreams] = useState([]);

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
      receiver_id: nearEnv.roketoAccount,
      amount: amountToPay,
      memo: 'memo',
      msg: JSON.stringify({
        Create: {
          request: {
            owner_id: window.accountId,
            receiver_id: nearEnv.dappAccount,
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
      account_id: nearEnv.dappAccount,
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
          return stream.receiver_id === nearEnv.dappAccount
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
    <Box>
        <Button
          disabled={disableButtons}
          variant='contained'
          onClick={() => createStream({
            price: 3,
            minutes: 1
          })}
        >
          Create stream
        </Button>

        <Button disabled={disableButtons} variant='contained' onClick={() => nearDeposit()}>{`Wrap (1 NEAR -> 1 wNEAR)`}</Button>
        <Button disabled={disableButtons} variant='contained' onClick={() => getAccountIncomingStreams()}>Get incoming streams (dApp)</Button>
        <Button disabled={disableButtons} variant='contained' onClick={() => getAccountOutgoingStreams()}>Get outgoing streams (User)</Button>
    </Box>
  )
}

export default Rooms;