"use client";
import Image from "next/image";
import handBag from "@/ui/icons/handBag.svg";
import bag from "@/ui/icons/bigBag.svg";
import police from "@/ui/icons/police.svg";
import flame from "@/ui/icons/flame.svg";
import snow_tv from "@/ui/icons/snow-tv.svg";
import abs from "@/ui/icons/abs.svg";
import confort_seat from "@/ui/icons/confort_seat.svg";
import mic from "@/ui/icons/mic.svg";
import light from "@/ui/icons/light.svg";

import vehicles from "@/ui/img/vehicles/index";
import logos from "@/ui/icons/index";
import { Ruda } from "next/font/google";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

import { Tooltip } from 'react-tooltip';

const ruda = Ruda({ subsets: ["latin"] });

enum ImgIconType {
  Sharan = "sharan",
  Cronos = "cronos",
  Sprinter = "sprinter",
  Bus45 = "bus45",
  Bus60 = "bus60",
  Iveco = "iveco24"
}

enum LogoIconType {
  card = "card",
  MercadoPago = "mp",
}

export type IconType = ImgIconType | LogoIconType;

function Icon({
  icon,
  className = "",
}: {
  icon: IconType;
  className?: string;
}) {
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

function IconLogos({
  icon,
  className = "",
}: {
  icon: IconType;
  className?: string;
}) {
  return (
    <Image
      src={logos[icon as string]}
      alt={icon as string}
      width={30}
      className={`p-1 ${className}`}
    />
  );
}

interface Vehicle {
  id: string
  name: string
  car_img: IconType
  seats: number
  cant_handBag: number
  cant_bag: number
  cant_littleBag: number
  cant_special: number
  quantity: number
  price_less_15: number,
  price_15_to_50: number,
  price_50_to_100: number,
  price_100_to_600: number,
  price_more_600: number,
  nominal_data: any
}

export default function CardOption(props: {
  setVehicle: Function;
  vehicle: Vehicle;
  totalSeatsNeeded: number;
  setTotalSeatsNeeded: Function;
  bigBagsNeeded: number;
  setBigBagsNeeded: Function;
  littleBagsNeeded: number;
  setLittleBagsNeeded: Function;
  specialLuggageNeeded: number;
  setSpecialLuggageNeeded: Function;
}) {
  const [open, setOpen] = useState(false);
  const openAccordion = (e: any) => {
    e.preventDefault();
    setOpen(!open);
  };

  const {
    
    setVehicle,
    vehicle,
    totalSeatsNeeded,
    setTotalSeatsNeeded,
    bigBagsNeeded,
    setBigBagsNeeded,
    littleBagsNeeded,
    setLittleBagsNeeded,
    specialLuggageNeeded,
    setSpecialLuggageNeeded,
  } = props;

  const {
    id,
    name,
    car_img,
    cant_handBag,
    cant_bag,
    cant_littleBag,
    price_less_15,
    price_15_to_50,
    price_50_to_100,
    price_100_to_600,
    price_more_600,
  } = vehicle
  return (
    <>
      <div className="shadow-lg my-5 hover:ring-2 hover:ring-orange-500 duration-300">
        <div className="bg-white w-[814px]  rounded-t-lg px-6 pb-3">
          <div className="flex justify-between ">
            <div className="flex flex-row">
              <Icon icon={car_img} />
              <div className="mt-5 ">
                <h4 className="font-bold text-[20px]">
                  {name} 
                </h4>
                <h4 className={`${ruda.className} font-semibold text-[16px]`}>
                  {vehicle.nominal_data.seats} asientos útiles + 1 chofer calificado
                </h4>
                <div>

                <Luggage cant_handBag={vehicle.nominal_data.seats} cant_bag={vehicle.nominal_data.cant_bag} cant_littleBag={vehicle.nominal_data.cant_littleBag} />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <a
                href="#"
                className="font-semibold text-orange-500"
                onClick={openAccordion}
              >
                {open ? <>Cerrar</> : <>Detalle</>}
              </a>
            </div>
          </div>
          
        </div>
        {open && <Accordion {...props} />}
        <div className="flex flex-row items-center font-bold border-t-2 border-gray-300 rounded-b-lg w-[814px] bg-white justify-between">
          <div className="flex items-center mx-10 my-1 text-gray-500">
            <p>Seleccionar cantidad</p>
            <button 
              className="flex items-center p-2 m-2 w-7 h-7 rounded-full hover:opacity-80 duration-300"
              onClick={(e)=> {
                e.preventDefault()
                setVehicle({
                  ...vehicle,
                  quantity: vehicle.quantity > 0 ? vehicle.quantity - 1 : vehicle.quantity
                })
                setTotalSeatsNeeded(totalSeatsNeeded + vehicle.seats)
                setBigBagsNeeded(bigBagsNeeded + vehicle.cant_bag)
                setLittleBagsNeeded(littleBagsNeeded + vehicle.cant_littleBag)
                setSpecialLuggageNeeded(specialLuggageNeeded + vehicle.cant_special)
              }}
              disabled={vehicle.quantity === 0}
            >-</button>
            <p className="text-xl">{vehicle.quantity}</p>
            <button 
              className="flex items-center p-2 m-2 w-7 h-7 rounded-full hover:opacity-80 duration-300"
              onClick={(e)=> {
                e.preventDefault()
                setVehicle({
                  ...vehicle,
                  quantity: vehicle.quantity + 1
                })
                setTotalSeatsNeeded(totalSeatsNeeded - vehicle.seats )
                setBigBagsNeeded(bigBagsNeeded - vehicle.cant_bag)
                setLittleBagsNeeded(littleBagsNeeded - vehicle.cant_littleBag)
                setSpecialLuggageNeeded(specialLuggageNeeded - vehicle.cant_special)
              }}
              disabled={ totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0 && specialLuggageNeeded <= 0 }
            >+</button>
          </div>
          <div className="text-gray-500 text-xs flex mr-10">
            <p>* Los equipajes excedentes ocuparán asientos</p>
            <ExclamationCircleIcon 
              className="size-4 mx-1"
              data-tooltip-id="important-tooltip"
              data-tooltip-place="right"
            />
            <Tooltip id="important-tooltip" className="bg-white" style={{ backgroundColor: "rgb(107, 114, 128)", color: "#ffffff" }}>
              <p>En un asiento entran 1 valija grande ó 2 chicas</p>
              <p>El equipaje especial ocupa 2 asientos</p>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

function Luggage({
  cant_handBag,
  cant_bag,
  cant_littleBag
}: {
  cant_handBag: number;
  cant_bag: number;
  cant_littleBag: number;
}) {
  return (
    <>
      <div className="bg-white w-full   flex items-center mt-5">
        <div className="flex flex-row items-center">
          <Image src={handBag} alt="handBag" />
          <p className="text-[14px] text-[#10004f] font-bold px-3">
            {cant_handBag === 1 ? `${cant_handBag} Bolso de mano` : `${cant_handBag} Bolsos de mano` }
          </p>
        </div>
        <div className="flex flex-row items-center ml-3">
          <Image src={bag} alt="carry" />
          <p className="text-[14px] text-[#10004f] font-bold px-3">
            {cant_bag === 1 ? `${cant_bag} Valija grande o ${cant_littleBag} pequeñas` : `${cant_bag} Valijas grandes o ${cant_littleBag} pequeñas` }
          </p>
        </div>
      </div>
    </>
  );
}
export function CardPaymentMethod({
  icon,
  title,
  subtitle,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="cardPaymentMethod 
            flex flex-row h-[82px] border border-gray-300 rounded-lg my-4
            hover:shadow-md duration-300"
    >
      <div
        className="iconCard 
                w-2/6 flex items-center justify-center"
      >
        <IconLogos icon={icon} />
      </div>
      <div className="flex items-center w-full">
        <div className="">
          <div className="flex">
            <p className="font-bold text-left">{title}</p>
          </div>
          <div className="flex">
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Accordion(props: any) {
  
  return (
    <>
      <div className="">
        <div
          className={`${ruda.className} option__accordion text-[16px] bg-white  w-[814px] px-6 pt-6`}
        >
          <div>
            <p>Los horarios son referenciales y aproximados</p>
            <p>Salidas desde Av. Rivadavia, Saavedra y Liniers.</p>
            <p>
              Las mascotas sobre el asiento deben ir sobre una manta provista
              por su dueño o tutor.
            </p>
          </div>
          <div className="font-bold py-3">
            <ul className="list-disc px-6">
              <li>1 Bolso o mochila pequeña</li>
              <li>1 Equipaje mediano (70x40 cm)</li>
              <li>1 Mascota en Asiento (menos de 8kg)</li>
              <li>1 Parada (opcional)</li>
            </ul>
          </div>
          <div className="flex flex-row py-3">
            <Image src={police || ""} alt="police" className="mr-1  h-auto w-auto" />
            <Image src={flame || ""} alt="flame" className="mx-1 h-auto w-auto" />
            <Image src={snow_tv || ""} alt="snow_tv" className="mx-1 h-auto w-auto" />
            <Image src={abs || ""} alt="abs" className="mx-1 h-auto w-auto" />
            <Image src={confort_seat || ""} alt="confort_seat" className="mx-1 h-auto w-auto" />
            <Image src={mic || ""} alt="mic" className="mx-1 h-auto w-auto" />
            <Image src={light || ""} alt="light" className="mx-1 h-auto w-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
