'use client';
import React from 'react';
import { Box, Heading, Button, Text } from '@chakra-ui/react';
function Navbar() {
  return (
    <div>
      <Box display='flex' bg='slate.900' p={4} justifyContent='space-between'>
        <div>
          <Heading color='white' className='font-roboto_slab'>
            StreamChat
          </Heading>
          {/* <Text fontSize='sm' fontFamily='sans-serif' color='white'>
            Your legal help assistant
          </Text> */}
        </div>
        <div className='flex items-center'>
          <Button
            size='md'
            variant='unstyled'
            className='bg-violet-600 text-white p-3 flex items-center hover:bg-transparent hover:text-violet-600 border-2 border-violet-600 rounded-xl'
          >
            Connect Wallet
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Navbar;
