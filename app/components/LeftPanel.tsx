import React from 'react';
import { Divider, Image } from '@chakra-ui/react';

const LeftPanel = () => {
  return (
    <div className='text-white rounded-lg'>
      <div className='mb-3 font-mono text-left text-2xl'>What do we do?</div>
      <div className='font-mono text-md flex flex-col mb-10'>
        <p>
          We make managing streams as easy as texting your grandma goodnight
        </p>
      </div>
      <Divider />
      <div className='mb-3 font-mono text-left text-2xl mt-10'>
        How do I get started?
      </div>
      <div className='font-mono text-md flex flex-col mb-10'>
        <p>
        It&apos;s as easy as &ldquo;Start me a stream to 0x... for x tokens per month&rdquo;
        </p>
        <br />
        <p>
          or
        </p>
        <br />
        <p>
          Just write "let it rain over me", and we'll send you some fDAIx to get you started

          (you could also ask normally but where's the fun in that?)
        </p>
      </div>
      <div className='justify-center'>
        <Image src={'lonely.png'} alt={'Lonely'} />
        <p>
          Your streams look empty, I can fix that
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
