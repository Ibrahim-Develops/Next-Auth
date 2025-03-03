import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';

const page = async () => {
  const session = await getServerSession(authOptions)
  
  return (
    <div className='bg-white h-screen flex justify-center items-center'>
    <div className="flex flex-col items-center justify-center p-5 bg-gray-900 rounded-lg shadow-lg w-[300px]">
      <Image src={session?.user.image as string} width={100} height={100} alt="Profile Image" className="rounded-full border-2 border-white shadow-md" />
      <div className="mt-3 text-lg font-semibold text-white">ID: {session?.user.id}</div>
      <div className="text-gray-300">Username: {session?.user.username}</div>
      <div className="text-gray-400">Email: {session?.user.email}</div>
    </div>
  </div>
  
  )
}

export default page