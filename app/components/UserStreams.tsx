/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
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

const streams = [
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
  {
    assest: 'fDAIx',
    balance: '12889.8',
    sr: '0x7637r8..683',
    IOF: '+5/mon',
  },
];

{
  /* <Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>; */
}

const displayStreams = streams.map((stream, index) => (
  <>
    <div key={index} className='flex gap-8 p-2 justify-around m-1 rounded-lg'>
      <div>{stream.assest}</div>
      <Popover>
        <PopoverTrigger>
          <div className='hover:text-purple-400 hover:cursor-pointer'>
            {stream.IOF}
          </div>
        </PopoverTrigger>
        <PopoverContent className='bg-black text-sm'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Sender/Receiver</PopoverHeader>
          <PopoverBody>
            <div>{stream.sr}</div>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <div>{stream.balance}</div>
    </div>
    {streams.length - 1 === index ? null : (
      <Divider orientation='horizontal' size='lg' colorScheme='gray' />
    )}
  </>
));

const UserStreams = () => {
  return (
    <div className='text-white h-full rounded-lg'>
      <div className='flex flex-col h-full'>
        <div className='mb-3 font-sans text-center text-2xl'>Assests</div>
        <div className='overflow-auto flex-col h-full'>
          <div className='font-sans text-md'>{displayStreams}</div>
        </div>
      </div>
    </div>
  );
};

export default UserStreams;
