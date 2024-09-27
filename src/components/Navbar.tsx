'use client'
import Image from "next/image"
import Link from "next/link"
import logo from "@/ui/icons/RT_Agencia_Logo.svg"
import userLogo from "@/ui/icons/orange_user.svg"
import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/16/solid"
import { useRouter } from "next/navigation"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"


function PortalNavBar({ src }: { src: string }) {
    const router = useRouter();
    const redirect = (path: string) => router.push(path);

    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <>
            <div className="flex items-center bg-[#123041] w-full h-[92px] px-10 justify-between relative select-none">
                <Image
                    src={logo}
                    alt="logoRuggeriAgencia"
                    className=""
                />
                <div className="flex items-center">
                    <div className="flex text-white font-bold"> {/* Servicios, tráfico, Flota, choferes, clientes, contable, staff*/}
                        <ul className="flex flex-row p-6 items-center justify-between">
                            <li className={`px-3 duration-300 hover:text-orange-500`}>
                                <Link href="/budget-services">Servicios</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Tráfico</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Flota</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Choferes</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Clientes</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Contable</Link>
                            </li>
                            <li className="px-3 opacity-30 duration-300">
                                <Link href="#" className="cursor-default">Staff</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="border-l-[#39647C] border-l-2 px-5 py-2 border-r-white border-r-2 cursor-pointer" onClick={() => redirect("/settings")}> {/* logo de settings*/}
                        <Cog6ToothIcon
                            className={`size-5  duration-300 text-white hover:text-orange-500`}
                        />
                    </div>
                    <div onClick={() => setShowDropDown(!showDropDown)}>
                            <div
                                className={`flex items-center w-[200px] duration-200 justify-center ml-5 cursor-pointer  ${showDropDown ? "bg-white rounded-t-md ": "hover:bg-white hover:rounded-md"}`}
                            >
                                <Image
                                    src={userLogo}
                                    alt="user logo"
                                    width={50}
                                />
                                <h1 className="text-orange-500 font-bold  duration-300  ">Mariano R.</h1>
                                <span><ChevronDownIcon className={`text-orange-500 size-8 duration-200 ${showDropDown ? "rotate-180 " : null}`} /></span>
                            </div>
                        {showDropDown ? <DropDown /> : null
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

const DropDown = () => {
    const router = useRouter();
    const redirect = (path: string) => router.push(path);
    return (
        <div className="bg-white w-[200px] rounded-b-md shadow-md mx-2 top-19 right-8 absolute z-10">
            <div className="px-2 grid grid-rows-3 mx-2 items-center">
                <p className="p-2 rounded-md hover:bg-orange-200 hover:font-semibold cursor-pointer">Mi cuenta</p>
                <p 
                    className="p-2 rounded-md hover:bg-orange-200 hover:font-semibold cursor-pointer"
                    onClick={()=> {redirect("/settings")}}
                >Ajustes</p>
                <div 
                    className="flex items-center gap-2 p-2 rounded-md mb-2 hover:bg-orange-200 hover:font-semibold cursor-pointer"
                    onClick={()=> redirect("/login")}
                >
                    <ArrowRightStartOnRectangleIcon className="size-6" />
                    <p>Cerrar sesión</p>
                </div>

            </div>
        </div>
    )
}

export { PortalNavBar }