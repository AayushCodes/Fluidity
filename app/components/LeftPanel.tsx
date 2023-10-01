/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import lonely from '../../public/lonely.png';
import { Divider } from '@chakra-ui/react';

const LeftPanel = () => {
  return (
    <div className='text-white rounded-lg h-full'>
      <div className='mb-3 font-mono font-semibold text-xl'>What do we do?</div>
      <div className='font-mono text-sm flex flex-col mb-5'>
        <p>
          We make managing streams as easy as texting your grandma goodnight
        </p>
      </div>
      <Divider />
      <div className='mb-3 font-mono text-xl mt-5 font-semibold'>
        How do I get started?
      </div>
      <div className='font-mono text-sm flex flex-col mb-5'>
        <p>
          It&apos;s as easy as &ldquo;
          <span className='font-bold underline'>
            Start me a stream to 0x... for x tokens per month
          </span>
          &rdquo;
        </p>
        <p className='font-bold my-5'>or</p>
        <p>
          Just write "
          <span className='font-bold underline'>let it rain over me</span>", and
          we'll send you some fDAIx to get you started
          <br />
          (you could also ask normally but where's the fun in that?)
        </p>
      </div>
      <div className='flex flex-col flex-wrap justify-center font-mono text-xs text-center'>
        <Image src={lonely} alt={'Lonely'} />

        <p>Your streams look empty, I can fix that</p>
      </div>
    </div>
  );
};

export default LeftPanel;
