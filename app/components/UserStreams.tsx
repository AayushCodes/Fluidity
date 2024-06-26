/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { sepolia, useAccount } from 'wagmi';
import { init } from '../utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Divider,
} from '@chakra-ui/react';

const UserStreams = () => {
  const [initiated, setInitiated] = useState<any>();
  const [inflow, setInflow] = useState([]);
  const [outflow, setOutflow] = useState([]);
  const { address, isConnected } = useAccount();
  const [auth, setAuth] = useState<any>();
  const [chain, setChain] = useState<any>();
  const [streams, setStreams] = useState<any>([]);
  console.log(address);
  useEffect(() => {
    setAuth(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (auth) {
      (async function () {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        if (chainId == sepolia.id) {
          setChain(true);
          setInitiated(await init());
        } else {
          setChain(false);
        }
      })();
    }
  }, [auth]);
  const streamData = async (type: any, address: any) => {
    const checkStream = (stream: any) => {
      return stream.currentFlowRate != 0;
    };

    const query = `
    {
      streams(where: {${type}: "${address.toLowerCase()}"}) {
        currentFlowRate
        token {
          symbol
        }
        sender {
          id
        }
        receiver {
          id
        }
      }
    }
`;
    const data = await (
      await fetch('https://eth-sepolia.subgraph.x.superfluid.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
        }),
      })
    ).json();
    console.log(data.data.streams.filter(checkStream));
    return data.data.streams.filter(checkStream);
  };
  useEffect(() => {
    (async () => {
      if (initiated) {
        const address = initiated[3];
        console.log(address);
        const outflows = await streamData('sender', address);
        const inflows = await streamData('receiver', address);
        // setOutflow(await streamData('sender', address));
        // setInflow(await streamData('receiver', address));
        console.log(inflows);
        console.log(outflows);
        setStreams([...inflows, ...outflows]);
      }
    })();
  }, [initiated]);
  const displayStreams = streams.map((stream: any, index: any) => (
    <>
      <div key={index} className='flex py-2 justify-between my-1 rounded-lg'>
        <div>{stream.token.symbol}</div>
        <div>
          {stream?.sender?.id == address?.toLowerCase() ? '-' : '+'}
          {Math.round((stream.currentFlowRate * 30 * 24 * 60 * 60) / 1e16) /
            100}
          /mo
        </div>
        <div>
          {stream.sender.id == address}
          {stream.sender.id.substring(0, 4)}...{stream.sender.id.substring(38)}
        </div>
      </div>
      {streams.length - 1 === index ? null : (
        <Divider orientation='horizontal' size='lg' colorScheme='gray' />
      )}
    </>
  ));
  return (
    isConnected && (
      <div className='text-white h-full rounded-lg'>
        <div className='flex flex-col h-full'>
          <div className='mb-3 font-mono text-left font-semibold text-2xl'>
            My Streams
          </div>
          <div className='flex justify-between mb-2 font-mono font-semibold'>
            <span>Asset</span>
            <span className='mr-4'>Amount</span>
            <span>Address</span>
          </div>
          <Divider orientation='horizontal' size='lg' colorScheme='gray' />
          <div className='overflow-auto flex-col h-full'>
            <div className='font-sans text-md'>{displayStreams}</div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserStreams;
