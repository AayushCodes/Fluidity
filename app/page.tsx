import Image from 'next/image';
// import star from '../public/star.jpeg;';
import Chat from './components/Chat';
export default function Home() {
  return (
    <main className='bg-black h-screen flex justify-center'>
      <div className='my-2 w-4/12'>
        <Chat />
      </div>
    </main>
  );
}
