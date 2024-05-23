import Image from "next/image"
import sprinter from "@/ui/img/vehicles/Sprinter_Minibus_17_1_PPD 1.png"
import sharan from "@/ui/img/vehicles/Sharan.png"
import cronos from "@/ui/img/vehicles/fiat_cronos_versiones 1.png"
import carry from "@/ui/icons/carry_1.svg"
import bag from "@/ui/icons/bag_1.svg"
import police from "@/ui/icons/police.svg"
import flame from "@/ui/icons/flame.svg"
import snow_tv from "@/ui/icons/snow-tv.svg"
import abs from "@/ui/icons/abs.svg"
import confort_seat from "@/ui/icons/confort_seat.svg"
import mic from "@/ui/icons/mic.svg"
import light from "@/ui/icons/light.svg"
import Link from "next/link"
import { Ruda } from "next/font/google"
import vehicles from "@/ui/img/vehicles/index"

const ruda = Ruda({ subsets: ["latin"] });

enum ImgIconType {
    Sharan = "sharan",
    Cronos = "cronos",
    Sprinter = "sprinter"
}

export type IconType = ImgIconType

function CarIcon({icon, className = ''}: {icon: IconType, className?: string}) {
    return (
      <Image 
        src={vehicles[icon as string]} 
        alt={icon as string} 
        width={160} 
        height={124}
        className={`p-1 ${className}`}
      />
    );
}

export default function CardOption (
    {
        id,
        origin,
        destiny,
        init_time,
        final_time,
        cant_car,
        car,
        car_img,
        seats,
        cant_carry, 
        cant_bag,
        price
    }:{
        id:string,
        origin: string,
        destiny: string,
        init_time: string,
        final_time: string,
        cant_car: string,
        car: string,
        car_img: IconType,
        seats: string,
        cant_carry: string,
        cant_bag: string,
        price:string
    }) {
        return(
            <>
                <div className="shadow-lg m-5 opacity-50 hover:opacity-100 duration-300">
                    <div className="bg-white w-[814px] h-[162px] rounded-t-lg px-6">
                        <div className="flex justify-between ">
                            <div className="flex flex-row">
                                <CarIcon icon={car_img} />
                                {/* <Image src={sprinter} alt="sprinter" /> */}
                                <div className="mt-5 ">
                                    <h4 className="font-bold text-[20px]">{cant_car} x {car}</h4>
                                    <h4 className={`${ruda.className} font-semibold text-[16px]`}>{seats} asientos</h4>
                                </div>

                            </div>
                            <div className="mt-5">
                                <Link href="#" className="font-semibold text-orange-500">Detalle</Link>
                            </div>
                        </div> 
                        <div className="flex flex-row text-[26px] text-[#10004F] justify-between">
                            <div >
                                <p><strong>{init_time}</strong> {origin}<strong> - {final_time}</strong> {destiny}</p>
                            </div>
                            <div>
                                <h4><strong>${price}</strong></h4>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white w-[814px] h-[76px] rounded-b-lg border-t border-gray-200 flex items-center px-6">
                        <div className="flex flex-row items-center">
                            <Image src={carry} alt="carry" />
                            <p className="text-[14px] text-[#10004f] font-bold px-3">{cant_carry} Bolso de mano o mochila</p>
                        </div>
                        <div className="flex flex-row items-center ml-3">
                            <Image src={bag} alt="carry" />
                            <p className="text-[14px] text-[#10004f] font-bold px-3">{cant_bag} Valija mediana (70x40)</p>
                        </div>
                    </div>
                </div>
                <Accordion />
            </>
        )
}

function Accordion () {
    return (
        <>
            <div className="">
                <div 
                    className={`${ruda.className} option__accordion 
                    text-[16px] bg-white  w-[814px] px-6 pt-6`}>
                    <div >
                        <p>Los horarios son referenciales y aproximados</p>
                        <p>Salidas desde Av. Rivadavia, Saavedra y Liniers.</p>
                        <p>Las mascotas sobre el asiento deben ir sobre una manta provista por su dueño o tutor.</p>
                    </div>
                    <div className="font-bold py-3">
                        <ul className="list-disc px-6">
                            <li>1 Bolso o mochila pequeña</li>
                            <li>1 Equipaje mediano (70x40 cm)</li>
                            <li>1 Mascota en Asiento (menos de 8kg)</li>
                            <li>1 Parada (opcional)</li>
                        </ul>s
                    </div>
                    <div className="flex flex-row py-3">
                        <Image src={police} alt="police"  className="mr-1"/>
                        <Image src={flame} alt="flame"  className="mx-1"/>
                        <Image src={snow_tv} alt="snow_tv"  className="mx-1"/>
                        <Image src={abs} alt="abs"  className="mx-1"/>
                        <Image src={confort_seat} alt="confort_seat"  className="mx-1"/>
                        <Image src={mic} alt="mic" className="mx-1" />
                        <Image src={light} alt="light" className="mx-1" />
                    </div>
                </div>
                <div 
                    className="bg-orange-500 w-[814px] h-[54px] rounded-b-lg
                    text-white text-[18px] font-bold 
                    flex justify-center items-center">
                    <button>Seleccionar</button>
                </div>
            </div>
        </>
    )
}


function openAccordion() {

}