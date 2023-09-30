/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { nanoid } from 'nanoid';
import useChatScroll from './ChatScroll';
import { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';

const Manualchats = [
  <>
    <div className='w-fit py-2 px-3 break-normal max-w-xs shadow-md text-md bg-gray-800 mb-1 ml-2 rounded-xl'>
      Greetings. Cosmic Explorer.
    </div>
    <div className='w-fit py-2 px-3 break-normal max-w-xs shadow-md text-md bg-gray-800 mb-1 ml-2 rounded-xl'>
      I'm Stella.
    </div>
    <div className='w-fit py-2 px-3 break-normal max-w-xs shadow-md text-md bg-gray-800 mb-1 ml-2 rounded-xl'>
      You're about to embark on an enchanting journey through the Solana Galaxy.
      <br />
      <br />
      With wonders of Jupiter, you'll experience the future of finance!
    </div>
    <div className='w-fit py-2 px-3 break-normal max-w-xs shadow-md text-md bg-gray-800 mb-6 ml-2 rounded-xl'>
      You ready for this adventure?
    </div>
    <div className='ml-auto mr-2 text-md break-normal shadow-md max-w-sm w-fit py-2 px-3 bg-slate-600 mb-4 rounded-xl'>
      Lets do this!
    </div>
    {/* <div className='w-fit break-normal max-w-xl shadow-lg shadow-[#64CCC533] p-3 text-lg bg-[#64CCC5] mb-4 rounded-xl'>
      In nunc velit, dapibus non mauris a, commodo semper lorem. Sed malesuada
      sagittis felis eu lobortis. Vivamus interdum tempus ex, vitae congue ipsum
      convallis sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
      ultrices posuere cubilia curae; Sed vel purus vel orci dictum tempor.
      Etiam fringilla porta elit ac hendrerit. In aliquet, elit a sollicitudin
      tincidunt, est velit molestie tortor, non mattis leo velit in risus.
    </div>
    <div className='ml-auto w-fit text-lg break-normal shadow-lg shadow-[#176B8733] max-w-xl p-3 bg-[#176B87] mb-4 rounded-xl'>
      Praesent pellentesque tristique ultrices. Suspendisse quis urna a metus
      placerat lacinia sed ac lacus. Aenean eleifend tincidunt ante in sagittis.
      Nullam dapibus arcu a enim luctus, in interdum dui molestie.
    </div>
    <div className='w-fit p-3 bg-[#64CCC5] shadow-lg shadow-[#64CCC533] break-normal max-w-xl text-lg mb-4 rounded-xl'>
      Quisque aliquet orci odio, eu efficitur nunc interdum in. Aenean sem arcu,
      feugiat id aliquet rutrum, imperdiet vitae lorem. Duis sed euismod erat.
      Aliquam tristique ullamcorper dictum. In mollis dolor et nibh feugiat
      convallis. Aenean at feugiat augue, vitae ultrices.
    </div>
    <div className='ml-auto w-fit break-normal max-w-xl shadow-lg shadow-[#176B8733] p-3 bg-[#176B87] text-lg mb-4 rounded-xl'>
      Aliquam erat volutpat. In et consequat ligula, in finibus nisl. Donec at
      condimentum velit. Donec ac consectetur dolor, vitae pharetra tortor. Sed
      et venenatis ipsum, ut auctor justo. Nulla nec varius odio. Curabitur
      eleifend eget arcu et ultrices. Cras hendrerit.
    </div>
    <div className='w-fit p-3 bg-[#64CCC5] shadow-lg shadow-[#64CCC533] break-normal max-w-xl text-lg mb-4 rounded-xl'>
      Ut mattis pretium augue in venenatis. Nunc et nunc ut metus fermentum
      tempus. Sed at eros eu felis maximus hendrerit.
    </div>
    <div className='ml-auto w-fit break-normal max-w-xl shadow-lg shadow-[#176B8733] p-3 bg-[#176B87] text-lg mb-4 rounded-xl'>
      Maecenas viverra interdum laoreet. Morbi tellus nisi, pulvinar nec
      egestas.
    </div>
    <div className='w-fit p-3 bg-[#64CCC5] shadow-lg shadow-[#64CCC533] break-normal max-w-xl text-lg mb-4 rounded-xl'>
      Curabitur ut erat ac velit ultrices mattis. Fusce vel elementum nunc.
      Vestibulum mi enim, elementum quis leo eu, bibendum efficitur risus.
      Suspendisse luctus imperdiet purus, vitae dapibus velit malesuada dictum.
      Mauris suscipit viverra massa, at pellentesque augue feugiat eget. Ut
      consectetur nunc vitae massa tempus, eget mollis ex lobortis. Vivamus a
      congue est, ut vulputate velit. Nam pellentesque vestibulum purus nec
      tristique. In accumsan dui vel dui tempus dictum. Nulla sit amet elementum
      lacus. Sed leo mauris, molestie ac urna sed, efficitur sollicitudin massa.
      Donec interdum egestas iaculis.
    </div> */}
  </>,
];

// {
//   loading ? (
//     <div className='justify-center h-3/5 items-center flex'>
//       {/* <ReactLoading type='spin' color='white' /> */}
//       loading...
//     </div>
//   ) : (
//     <div className='font-sans'>{Manualchats}</div>
//   );
// }

interface ChatProps {
  is_user: boolean;
  text: string;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatProps[]>([]);
  const ref = useChatScroll(chats);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setChats([
      {
        is_user: false,
        text: 'Greetings. Cosmic Explorer.',
      },
      {
        is_user: false,
        text: "I'm Stella.",
      },
      {
        is_user: false,
        text: "You're about to embark on an enchanting journey through the Solana Galaxy.With wonders of Jupiter, you'll experience the future of finance!",
      },
      {
        is_user: false,
        text: 'You ready for this adventure?',
      },
      {
        is_user: true,
        text: 'Lets do this!',
      },
    ]);
  }, []);

  async function handleSend() {
    setChats((prevChats) => [...prevChats, { is_user: true, text: message }]);
    setMessage('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  function handleChange(event: any) {
    setMessage(event.target.value);
  }

  // bg-gradient-to-tl from-blue-600 to-violet-600
  // bg-gradient-to-tr from-cyan-500 to-blue-500
  const displayChats = chats.map((chat: any) => {
    return (
      <div
        key={nanoid()}
        className={`${
          chat.is_user
            ? 'ml-auto mr-2 text-lg break-normal shadow-md max-w-md w-fit py-2 px-4 bg-cyan-600 mt-6 mb-6 rounded-xl'
            : 'w-fit py-2 px-4 break-normal max-w-sm shadow-md text-lg bg-[#7C3AED] mb-1 ml-2 rounded-xl'
        }`}
      >
        {chat.text}
      </div>
    );
  });

  //bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-neutral-700

  return (
    <div className='text-white h-full p-2'>
      <div className='flex flex-col h-full'>
        <div className='mb-6 pl-2 font-roboto_slab text-left text-3xl '>
          Alfred
        </div>
        <div ref={ref} className='overflow-auto flex-col h-full'>
          <div className='font-sans'>{displayChats}</div>
        </div>
        <div className='flex py-2 pl-2'>
          <input
            type='text'
            placeholder='What do you want to say?'
            className='p-2 rounded-xl w-full bg-slate-600'
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            ref={buttonRef}
            className='text-3xl p-2 text-white hover:text-purple-400'
            onClick={handleSend}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
