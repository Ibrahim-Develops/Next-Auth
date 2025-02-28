"use client"

import { useForm } from "react-hook-form";
import Image from "next/image"
import Hero from "../assets/login.png"
import Logo from "../assets/logo.png"
import Link from "next/link";

interface Signup {
    image: string,
    email: string,
    pass: string
}

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } ,reset } = useForm<Signup>();
    const onSubmit = async (data: Signup) => {
        reset()
    }

    return (
        <>
            <div className="bg-[#f9e6e6] w-full h-screen text-black flex justify-center items-center gap-10">
                <form onSubmit={handleSubmit(onSubmit)} className='w-[30%]'>
                    <div className="flex justify-center items-center pb-5 flex-col border-b-[1px] border-gray-400">
                        <Image src={Logo} alt="Logo" width={200} />
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <label className="font-bold">Email</label>
                        <input {...register("email", { required: "Please Enter The Email" })} type="text" className=" outline-none border-none bg-pink-200 py-[10px] rounded px-2" />
                        {errors.email &&  <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <label className="font-bold">Password</label>
                        <input {...register("pass", { required: "Please Enter The Password" })} type="text" className=" outline-none border-none bg-pink-200 py-[10px] rounded px-2" />
                        {errors.pass &&  <p className="text-red-500 text-sm">{errors.pass.message}</p>}
                    </div>
                    <button type="submit" className="bg-[#474BCA] text-white w-full py-[10px] mt-8 rounded cursor-pointer">Signup</button>
                </form>
                <div className="flex flex-col items-end">
                    <Link href="/login" className="bg-[#474BCA] mb-5 text-white text-sm py-2 rounded w-1/3 text-center">Login</Link>
                    <Image src={Hero} alt="Logo" width={450} />
                </div>
                
            </div>
        </>
    )
}

export default Login