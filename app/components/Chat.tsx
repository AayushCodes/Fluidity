/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { nanoid } from 'nanoid';
import useChatScroll from './ChatScroll';
import { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';
import { systemPrompt, systemFunctions } from '../constants';
import { useAccount } from 'wagmi';
import { startStream, deleteStream, updateStream, init, claim } from '../utils';
import OpenAI from 'openai';
require('dotenv').config();

interface ChatProps {
  is_user: boolean;
  text: string;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatProps[]>([]);
  const ref = useChatScroll(chats);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [messages, setMessages] = useState<any[]>([
    { role: 'system', content: systemPrompt },
  ]);
  const { address, isConnected } = useAccount();
  const [auth, setAuth] = useState<any>();
  const [initiated, setInitiated] = useState<any>();
  const [chain, setChain] = useState<Boolean>(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    setChats([
      {
        is_user: false,
        text: 'Greetings, fellow streamer.',
      },
      {
        is_user: false,
        text: 'I can tell you anything about streaming, or if your bags are jingling, get to managing some streams',
      },
      {
        is_user: false,
        text: 'All you gotta do is ask ;)',
      },
    ]);
  }, []);

  useEffect(() => {
    if (auth) {
      (async function () {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        console.log(chainId);
        if (chainId == '0x14a33') {
          setChain(true);
          setInitiated(await init());
        } else {
          setChain(false);
        }
      })();
    }
  }, [auth]);

  useEffect(() => {
    setAuth(isConnected);
  }, [isConnected]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  async function sendPrompt() {
    console.log(message);
    const newMess = [...messages, { role: 'user', content: message }];
    // setMessages((prevMessages) => [...prevMessages, { role: "user", content: message }]);
    setMessages(newMess);
    try {
      console.log(messages);
      const chatCompletion: any = await openai.chat.completions.create({
        messages: newMess,
        model: 'gpt-3.5-turbo-0613',
        functions: systemFunctions,
      });
      console.log(chatCompletion.choices);
      console.log(chatCompletion.choices[0].message.content);
      if (chatCompletion.choices[0].finish_reason == 'function_call') {
        const functionObject = JSON.parse(
          chatCompletion.choices[0].message.function_call.arguments
        );
        console.log(typeof functionObject);
        console.log(functionObject);
        console.log(chatCompletion.choices[0].message.function_call.name);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'system',
            content: `assistant called ${chatCompletion.choices[0].message.function_call.name} function`,
          },
        ]);
        // messages.push({
        //   role: "system",
        //   content: `assistant called ${chatCompletion.choices[0].message.function_call.name} function` ,
        // });
        if (
          chatCompletion.choices[0].message.function_call.name == 'startStream'
        ) {
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Approve Transaction in your wallet...`,
            },
          ]);
          await startStream(
            initiated,
            functionObject.address,
            functionObject.amountPerMonth,
            functionObject.token
          );
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Congratulations, you just started a stream for ${functionObject.amountPerMonth} ${functionObject.token} to ${functionObject.address}`,
            },
          ]);
        } else if (
          chatCompletion.choices[0].message.function_call.name == 'deleteStream'
        ) {
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Approve Transaction in your wallet...`,
            },
          ]);
          await deleteStream(
            initiated,
            functionObject.address,
            functionObject.token
          );
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Congratulations, you just deleted a ${functionObject.token} stream to ${functionObject.address}`,
            },
          ]);
        } else if (
          chatCompletion.choices[0].message.function_call.name == 'claim'
        ) {
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Approve Transaction in your wallet...`,
            },
          ]);
          await claim(initiated);
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: `Raining some DAI on you`,
            },
          ]);
        } else {
          console.log(chatCompletion);
          console.log(chatCompletion.choices[0].message.content);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              content: chatCompletion.choices[0].message.content,
            },
          ]);
          setChats((prevChats) => [
            ...prevChats,
            {
              is_user: false,
              text: chatCompletion.choices[0].message.content,
            },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSend() {
    setMessage('');
    setChats((prevChats) => [...prevChats, { is_user: true, text: message }]);
    await sendPrompt();
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
            ? // ? 'ml-auto mr-2 text-lg break-words shadow-md max-w-md w-fit py-2 px-4 bg-cyan-600 mb-6 mt-6 rounded-xl'
              // : 'w-fit py-2 px-4 break-words max-w-sm shadow-md text-lg bg-[#7C3AED] mb-1 ml-2 rounded-xl'
              'ml-auto mr-2 text-lg break-words shadow-md max-w-md w-fit py-2 px-4 mb-6 mt-6 border-cyan-600 border-2 rounded-xl border-dashed'
            : 'w-fit py-2 px-4 break-words max-w-sm shadow-md text-lg mb-1 ml-2 rounded-xl border-dashed border-2	border-[#7C3AED]'
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
        {/* <div className='mb-6 pl-2 font-roboto_slab text-left text-3xl '>
          StreamChat
        </div> */}
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
            disabled={!isConnected}
          />
          <button
            ref={buttonRef}
            className='text-3xl p-2 text-white hover:text-purple-400'
            onClick={handleSend}
            disabled={!isConnected}
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
