'use client'
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { }



export default function Button(props: Props) {
    return (
        <>
            <button
                className="border-2 border-solid border-orange-500 bg-orange-500 text-white py-3 px-6 rounded-md"
                {...props}
            ></button>
        </>
    )
}

export function BackButton( {path} : {path: string}) {
    const router = useRouter();
    const redirect = (path: string) => router.push(path);
    return (
        <div
            className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer gap-2"
            onClick={() => redirect(path)}
        >
            <ArrowLeftIcon className="size-5" /> 
            <p className="mr-4">Volver</p>
        </div>
    )
}