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
