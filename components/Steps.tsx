"use client"

import React, { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from 'react-hook-form'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Data {
    name: string,
    lastname: string,
    fathername: string,
    contact: string,
    email: string,
    postal: string,
    city: string,
    province: string,
    country: string,
}

const Steps = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Data>();
    const [formdata, setFormdata] = useState<Data>({} as Data)
    const [userdata, setuserData] = useState<Data>()
    const [step, setStep] = useState(1)

    const onSubmit = async (data: Data) => {
        setFormdata((prev) => ({ ...prev, ...data }))
        console.log({ ...formdata, ...data });

        if (step < 3) {
            setStep(step + 1)
            reset()
        } 
        else {
            setuserData(formdata)
            setStep(1);
            reset()
        }
    }

    return (
        <div className='text-black flex flex-col justify-center items-center px-20 py-20 overflow-y-scroll'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-1/2 w-1/3 gap-4 border-2 px-10 py-10'>
                <h1 className='font-bold text-2xl'>{step === 1 ? 'First Step' : step === 2 ? "Second Step" : step === 3 ? "Third Step" : ""}</h1>
                <Input {...register(step === 1 ? 'name' : step === 2 ? "contact" : step === 3 ? "city" : "name")} placeholder={step === 1 ? 'Enter Name' : step === 2 ? "Enter Contact" : step === 3 ? "Enter City" : ""} />
                {(errors.name || errors.contact || errors.city) && <p className="text-red-500 text-sm">{errors.name?.message || errors.contact?.message || errors.city?.message}</p>}
                <Input {...register(step === 1 ? 'lastname' : step === 2 ? "email" : step === 3 ? "province" : "lastname")} placeholder={step === 1 ? 'Enter Last Name' : step === 2 ? "Enter Email" : step === 3 ? "Enter Province" : ""} />
                <Input {...register(step === 1 ? 'fathername' : step === 2 ? "postal" : step === 3 ? "country" : "fathername")} placeholder={step === 1 ? 'Enter Father Name' : step === 2 ? "Enter Postal" : step === 3 ? "Enter Province" : ""} />
                <Button type='submit' className='w-full'>Next</Button>
            </form>

            <Table className='mt-20 h-fu'>
                <TableHeader className='bg-yellow-500 hover:bg-yellow-600'>
                    <TableRow>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className='text-white'>Last Name</TableHead>
                        <TableHead className='text-white'>Father Name</TableHead>
                        <TableHead className='text-white'>Conatct</TableHead>
                        <TableHead className='text-white'>Email</TableHead>
                        <TableHead className='text-white'>Postal</TableHead>
                        <TableHead className='text-white'>City</TableHead>
                        <TableHead className='text-white'>Province</TableHead>
                        <TableHead className='text-white'>Country</TableHead>
                    </TableRow>
                </TableHeader>
                {userdata ? (
                    <TableBody className=''>
                        {Object.entries(formdata).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell className="font-medium">{key}</TableCell>
                                {/* <TableCell>{value}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableCaption className="text-lg font-bold">User Information</TableCaption>
                )}
            </Table>

        </div>
    )
}

export default Steps