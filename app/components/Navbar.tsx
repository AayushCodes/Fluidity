'use client';
import React from 'react';
import { Box, Heading, Button, Text, Image } from '@chakra-ui/react';
import { ConnectBtn } from '../components/customButton';
// import Image from 'next/image';
// import logo from '../public/favicon.png';
function Navbar() {
  return (
    <div>
      <Box display='flex' bg='slate.900' p={4} justifyContent='space-between' justifyItems='center'>
        {/* <div className='flex'> */}
        {/* <Image src={'favicon.png'} alt='logos' sizes='sm' /> */}
        <div className='ml-3'>
          <Heading color='white' className='font-roboto_slab'>
            Fluidity
          </Heading>
          <Text fontSize='sm' fontFamily='sans-serif' color='white'>
            Your Personal Streaming Assistant
          </Text>
        </div>
        {/* </div> */}
        <div className='flex items-center'>
          {/* <Button
            size='md'
            variant='unstyled'
            className='hover:bg-violet-600 hover:text-white p-3 flex items-center bg-transparent text-violet-600 border-2 border-violet-600 rounded-xl'
          >
            Connect Wallet
          </Button> */}
          <ConnectBtn />
        </div>
      </Box>
    </div>
  );
}

export default Navbar;
