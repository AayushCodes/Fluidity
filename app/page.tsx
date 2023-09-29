// import star from '../public/star.jpeg;';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import UserStreams from './components/UserStreams';
import LeftPanel from './components/LeftPanel';
export default function Home() {
  return (
    <main className='bg-black h-screen'>
      <Navbar />
      <div className='h-[calc(100vh-88px)] flex mt-3'>
        <div className='flex h-full w-1/4 justify-center'>
          <div className='mt-2 mx-3 w-full'>
            <LeftPanel />
          </div>
        </div>
        <div className='flex h-full w-2/4 justify-center'>
          <div className='mt-2 w-3/4 shadow-2xl rounded-lg shadow-purple-800'>
            <Chat />
          </div>
        </div>
        <div className='flex flex-grow h-full w-1/4 justify-center'>
          <div className='mt-2 mx-3 mr-8 w-full'>
            <UserStreams />
          </div>
        </div>
      </div>
    </main>
  );
}
