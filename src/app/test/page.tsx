'use client'
import { useSearchParams } from "next/navigation";

export default function Test() {
    const searchParams = useSearchParams();
    const paymentStatus = searchParams.get('status')
    console.log({paymentStatus})


    return (
        <div className="container items-center justify-between w-1/2 m-auto">
            <h1 className="font-bold text-3xl">Pagina para testeo de componentes y otros</h1>
        </div>
    )
}




