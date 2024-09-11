import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const inter = Inter({ subsets: ["latin"] });

export default function Alert() {
    return (
        <div
            className={`${inter.className} border-1 border-[#FFC806] bg-[#FFECA8] rounded-lg text-[18px] font-normal px-10 py-4 my-5`}
        >
            <p>
                <span className="font-semibold">Importante: Un adulto</span> quién será
                responsable administrativo del viaje y, con quién nos comunicaremos para
                actualizar sobre el estado del mismo.
            </p>
        </div>
    );
}
// Buena Noticia!Puedes responder los datos del resto de los pasajeros más tarde, si todos partirán desde una misma zona,por ejemplo C.A.B.A., pero deberán estar completos 48hs. antes de la hora de partida del viaje.

export function AlertPassengers() {
    return (
        <div className={`${inter.className} font-normal gap-2 w-full text-[18px] shadow-sm rounded-lg border border-[#4658DF] text-[#10004f] px-4 py-4 my-2 mt-5  `}>

            <div className="flex flex-row gap-2">

                <ExclamationCircleIcon className="size-12 text-[#4658DF] -mt-2" />
                <div>
                    <h1 className="text-2xl font-semibold">Buena Noticia!</h1>
                    <p>Puedes responder los datos del resto de los pasajeros más tarde, si todos partirán desde una misma zona, por ejemplo C.A.B.A., pero <strong>deberán estar completos 48 hs. previos al momento del viaje.</strong></p>
                </div>
            </div>
            <div className="flex flex-row justify-end gap-2 mt-5">
                <button 
                    className="bg-inherit px-3 text-orange-500 border-orange-500 border-2 focus:bg-orange-500 focus:text-white"
                    onClick={() => {}}
                >Completar Ahora</button>
                <button className="bg-inherit px-3 text-orange-500 border-orange-500 border-2"
                >En otro momento</button>
            </div> 
        </div>
    );
}

export function RedAlert({ children, className }: { children: ReactNode, className?: string }): any {
    return (
        <>
            <div
                className={`flex flex-row w-full items-center shadow-sm border rounded-lg border-red-500 bg-[#FFD0DD] text-red-500 px-4 py-4 my-2 ${inter.className} ${className}`}
            >
                <ExclamationCircleIcon className="size-6 mr-4" />
                <p>{children}</p>
            </div>
        </>
    );
}
