"use client"

import React, { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useFieldArray, useForm } from 'react-hook-form'
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
    additionalFields: { value: string }[];
}

const Steps = () => {
    const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<Data>({
        defaultValues: {
            additionalFields: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "additionalFields"
    });


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
        <div className='text-black flex flex-col justify-center items-center px-20 py-20 overflow-y-scroll rounded'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center h-1/2 w-1/3 gap-4 border-2 rounded-lg px-10 py-10'>
                <h1 className='font-bold text-2xl'>{step === 1 ? 'First Step' : step === 2 ? "Second Step" : step === 3 ? "Third Step" : ""}</h1>
                <div className='w-full flex gap-5 flex-col'>
                    <div className='flex gap-5'>
                        <div className='w-full'>
                            <Input {...register(step === 1 ? 'name' : step === 2 ? "contact" : step === 3 ? "city" : "name", { required: step === 1 ? 'Name is Required' : step === 2 ? "Contact is Required" : step === 3 ? "City is Required" : "Name is Required" })}
                                placeholder={step === 1 ? 'Enter Name' : step === 2 ? "Enter Contact" : step === 3 ? "Enter City" : ""} />
                            {errors.name || errors.contact || errors.city ? <p className="mt-1 text-red-500 text-sm">{errors.name?.message || errors.contact?.message || errors.city?.message}</p> : null}
                        </div>
                        {step === 1 && (<Button onClick={() => append({ value: "" })}>+</Button>)}
                    </div>
                    
                    {step === 1 && (
                        <div className='mt-[-15px]'>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-center mt-2">
                                    <Input {...register(`additionalFields.${index}.value` as const, { required: "Field is required" })} />
                                    <Button type="button" onClick={() => remove(index)} className='bg-red-500 hover:bg-red-600'>-</Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-full'>
                    <Input {...register(step === 1 ? 'lastname' : step === 2 ? "email" : step === 3 ? "province" : "lastname", { required: step === 1 ? 'Last Name is Required' : step === 2 ? "Email is Required" : step === 3 ? "Province is Required" : "Last Name is Required" })}
                        placeholder={step === 1 ? 'Enter Last Name' : step === 2 ? "Enter Email" : step === 3 ? "Enter Province" : ""} />
                    {errors.lastname || errors.email || errors.province ? <p className="mt-1 text-red-500 text-sm">{errors.lastname?.message || errors.email?.message || errors.province?.message}</p> : null}
                </div>

                <div className='w-full'>
                    <Input {...register(step === 1 ? 'fathername' : step === 2 ? "postal" : step === 3 ? "country" : "fathername", { required: step === 1 ? 'Father Name is Required' : step === 2 ? "Postal Code is Required" : step === 3 ? "Country is Required" : "Father Name is Required" })}
                        placeholder={step === 1 ? 'Enter Father Name' : step === 2 ? "Enter Postal Code" : step === 3 ? "Enter Country" : ""} />
                    {errors.fathername || errors.postal || errors.country ? <p className="mt-1 text-red-500 text-sm">{errors.fathername?.message || errors.postal?.message || errors.country?.message}</p> : null}
                </div>

                <Button type='submit' className='w-full'>Next</Button>
            </form>

            <Table className='mt-10 w-full max-w-full border rounded-lg shadow-lg'>
                <TableHeader className='bg-yellow-600 hover:bg-yellow-600'>
                    <TableRow>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className='text-white'>Last Name</TableHead>
                        <TableHead className='text-white'>Father Name</TableHead>
                        <TableHead className='text-white'>Contact</TableHead>
                        <TableHead className='text-white'>Email</TableHead>
                        <TableHead className='text-white'>Postal</TableHead>
                        <TableHead className='text-white'>City</TableHead>
                        <TableHead className='text-white'>Province</TableHead>
                        <TableHead className='text-white'>Country</TableHead>
                    </TableRow>
                </TableHeader>
                {userdata && (
                    <TableBody>
                        <TableRow>
                            <TableCell>{userdata.name}</TableCell>
                            <TableCell>{userdata.lastname}</TableCell>
                            <TableCell>{userdata.fathername}</TableCell>
                            <TableCell>{userdata.contact}</TableCell>
                            <TableCell>{userdata.email}</TableCell>
                            <TableCell>{userdata.postal}</TableCell>
                            <TableCell>{userdata.city}</TableCell>
                            <TableCell>{userdata.province}</TableCell>
                            <TableCell>{userdata.country}</TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>

        </div>
    )
}

export default Steps