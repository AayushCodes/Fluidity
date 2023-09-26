import Image from 'next/image';
// import star from '../public/star.jpeg;';
import Chat from './components/Chat';
import UserStreams from './components/UserStreams';
export default function Home() {
  return (
    <main className='bg-[#35155D] h-screen flex'>
      <div className='flex h-screen w-1/2 justify-center'>
        <div className='my-2 w-3/4'>
          <Chat />
        </div>
      </div>
      <div className='flex h-screen w-1/2 justify-center'>
        <UserStreams />
      </div>
    </main>
  );
}
