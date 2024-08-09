import Image from "next/image"
import Link from "next/link"
import logo from "@/ui/icons/RT_Agencia_Logo.svg"
import userLogo from "@/ui/icons/orange_user.svg"
import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/16/solid"


function PortalNavBar () {
    return (
        <>
            <div className="flex items-center bg-[#123041] w-full h-[92px] px-10 justify-between">
                <Image 
                    src={logo} 
                    alt="logoRuggeriAgencia"
                    className="" 
                />
                <div className="flex items-center">
                <div className="flex text-white font-bold"> {/* Servicios, tráfico, Flota, choferes, clientes, contable, staff*/}
                    <ul className="flex flex-row p-6 items-center justify-between">
                        <li className="px-3 hover:text-orange-500 duration-300">
                            <Link href="#">Servicios</Link>
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
                
                    <div className="border-l-[#39647C] border-l-2 px-5 py-2 border-r-white border-r-2"> {/* logo de settings*/}
                        <Cog6ToothIcon 
                            className="size-5 text-white opacity-30 duration-300" 
                        />
                    </div>
                    <div> {/* user*/}
                        <div className="flex items-center ml-5 cursor-pointer opacity-30 cursor-default">
                            <Image 
                                src={userLogo} 
                                alt="user logo"
                                width={50}
                            />
                            <h1 className="text-orange-500 font-bold  duration-300  ">Mariano R.</h1>
                            <span><ChevronDownIcon className="text-orange-500 size-8" /></span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export {PortalNavBar}