'use client';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import UserStreams from './components/UserStreams';
import LeftPanel from './components/LeftPanel';
import { useAccount } from 'wagmi';
export default function Home() {
  const { address, isConnected } = useAccount();
  return (
    <main className='bg-black h-screen'>
      <Navbar />
      <div className='h-[calc(100vh-112px)] flex mt-3'>
        <div className='flex h-full w-1/4 justify-center'>
          <div className='mt-8 mx-3 ml-8 w-full'>
            <LeftPanel />
          </div>
        </div>
        <div className='flex h-full w-2/4 justify-center'>
          <div className='mt-2 w-3/4 shadow-2xl rounded-lg shadow-purple-800'>
            <Chat />
          </div>
        </div>
        <div className='flex flex-grow h-full w-1/4 justify-center'>
          <div className='mt-8 mx-3 mr-8 w-full h-5/6'>
            <UserStreams />
            <div className='text-white text-right text-sm font-mono'>
              Built with ❤️ by{' '}
              <a
                className='hover:underline hover:text-violet-500'
                href='https://twitter.com/AayushCodes'
              >
                Aayush
              </a>{' '}
              and{' '}
              <a
                className='hover:underline hover:text-violet-500'
                href='https://twitter.com/xinkin_'
              >
                Yash
              </a>
              <br />
              (DM either for feedback)
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
