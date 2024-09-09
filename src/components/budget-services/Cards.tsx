"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import minibus from "@/ui/icons/minibus2.svg"
import driver from "@/ui/icons/police.svg"
import Image from "next/image";
import { Ruda } from "next/font/google";
import { CheckCircleIcon, DocumentDuplicateIcon, EnvelopeIcon, PencilIcon } from "@heroicons/react/24/outline";
import doubleCheck from "@/ui/icons/doubleCheck.svg"
import adultIcon from "@/ui/icons/adult.svg"
import kidIcon from "@/ui/icons/child.svg"
import babyIcon from "@/ui/icons/baby.svg"
import { ageDetail, calcularFechaLlegada, formatAddress, formatDate, idTypeDetail, sumarDuracion } from "@/utils/basics";
import { TripDataForm1 } from "@/state/Trip.type";
import { useState } from "react";

const ruda = Ruda({ subsets: ["latin"] });




function TravelCard ( 
    {
        id,
        tripData,
        departure,
        travelDuration
    }:{
        id: string,
        tripData:TripDataForm1,
        departure: boolean,
        travelDuration: number,
    }) 
    {
        const [departureCity, setDepartureCity] = useState(tripData.departure.address.split(",").slice(1, 3).join(", "))
        const [returnCity, setReturnCity] = useState(tripData.return.address.split(",").slice(1, 3).join(", "))
        const [departureDate, setDepatureDate] = useState(tripData.departure.date)
        const [departureTime, setDepatureTime] = useState(tripData.departure.time)

        const fechaSalidaDeparture = departureDate
        const horaSalidaDeparture = tripData.departure.time
        const duracionViaje = travelDuration /60/60
        const fechaSalidaReturn = tripData.tripType.roundTrip ? tripData.return.date : 'null'
        const horaSalidaReturn = tripData.tripType.roundTrip ? tripData.return.time : 'null'

        const fechaLlegadaDeparture = calcularFechaLlegada(departureDate, departureTime, duracionViaje)
        const fechaLlegadaReturn = calcularFechaLlegada(fechaSalidaReturn, horaSalidaReturn, duracionViaje)

    return (
        <div className="flex flex-row mt-4 mb-4">
                    <div className="flex flex-col bg-[#2174A6] text-white items-center justify-center w-8">
                        <p className="-rotate-90 font-semibold">
                            {departure ? "IDA" : "VUELTA"}
                        </p>
                    </div>
                    <div className="flex flex-col ml-4 w-full">
                        <div className="flex text-[#10004F] text-3xl my-2">
                            <div>
                                <p>
                                    <span className="font-bold mr-2">
                                        {departure ? tripData.departure.time : tripData.return.time}
                                    </span>
                                    {
                                        departure 
                                        ? formatAddress(tripData.departure.address)
                                        : formatAddress(tripData.return.address)
                                    }
                                </p>
                                <p className="text-sm text-gray-500 font-semibold">
                                    {departure ? formatDate(new Date(tripData.departure.date + 'T00:00:00')) : formatDate(new Date(tripData.return.date + 'T00:00:00'))}
                                </p>
                            </div>
                            <span className="mx-3">-</span>
                            <div>
                                <p>
                                    <span className="font-bold mr-2">{departure ? sumarDuracion(tripData.departure.time, travelDuration) : sumarDuracion(tripData.return.time, travelDuration)}</span>
                                    {
                                        departure 
                                        ? formatAddress(tripData.return.address)
                                        : formatAddress(tripData.departure.address)
                                    }
                                </p>
                                <p className="text-sm text-gray-500 font-semibold">
                                    { 
                                        departure ? fechaLlegadaDeparture : fechaLlegadaReturn
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row border-t-2 border-gray-300 mt-5 items-center justify-between">
                            <div className={`${ruda.className} flex flex-row my-2 font-semibold`}>
                                <p>ID: {id}</p>

                                {/* <Image src={minibus} alt="" className="text-black mx-4 h-6 w-8"/>
                                <div className="flex">
                                    <p className="mx-2">
                                        <span className="mr-2">{"1"}</span>
                                        <span className="mr-2">{"HSC369"}</span>
                                        <span>{"Ruggeri"}</span>
                                    </p>
                                    <ChevronDownIcon className="size-5"/>
                                </div>
                                <div className="flex mx-4  border-l-2 border-gray-300">
                                    <Image src={driver} alt="" className="ml-4 h-6 w-8"/>
                                    <div className="flex">
                                        <p className="mx-2">{"Cesar Astudillo"}</p>
                                        <ChevronDownIcon className="size-5"/>
                                        <CheckCircleIcon className="text-green-600 size-6 mx-1"/>
                                    </div>
                                    <div className="flex mx-4 ">
                                        <p className="mx-2">{"Cesar Astudillo"}</p>
                                        <ChevronDownIcon className="size-5"/>
                                        <Image src={doubleCheck} alt="" className="mx-1 h-6 w-6"/>
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex gap-2">
                                <p>
                                    <span className="font-bold mx-1">{tripData.passengers.adult}</span>
                                    {"Adultos"}
                                    <span className="ml-2">-</span>
                                </p>
                                {
                                    tripData.passengers.kid > 0 &&
                                    <p>
                                    <span className="font-bold mx-1">{tripData.passengers.kid}</span>
                                    {"Niños"}
                                    <span className="ml-2">-</span>
                                </p>
                                }
                                {
                                    tripData.passengers.baby > 0 &&
                                    <p>
                                    <span className="font-bold mx-1">{tripData.passengers.baby}</span>
                                    {"Bebés"}
                                </p>
                                }
                                {
                                    (tripData.luggage.bag23 + tripData.luggage.carryOn) > 0 &&
                                    <>
                                        <span className="ml-2">|</span>
                                        <p>
                                            <span className="font-bold mx-1">{(tripData.luggage.bag23 + tripData.luggage.carryOn)}</span>
                                            {"Maletas"}
                                            <span className="ml-2">-</span>
                                        </p>
                                    </>
                                }
                                {
                                    tripData.luggage.special.quantity > 0 &&
                                    <p>
                                        <span className="font-bold mx-1">{tripData.luggage.special.quantity}</span>
                                        {"Equip. Esp."}
                                    </p>
                                }
                                {
                                    (tripData.passengers.pets.big + tripData.passengers.pets.small) > 0 &&
                                    <>
                                        <span className="ml-2">|</span>
                                        <p>
                                            <span className="font-bold mx-1">{tripData.passengers.pets.big + tripData.passengers.pets.small}</span>
                                            {"Mascotas"}
                                        </p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
    )
}



function PassengerCard ( {passenger, index}:{passenger: any, index:number}) {
    console.log('firstname',typeof(passenger.firstName))
    console.log('lastname',typeof(passenger.lastName))


    return (
        <div className="flex flex-row border-t w-full border-gray-300 py-4 justify-between opacity-80 hover:opacity-100 bg-gray-100 hover:bg-white duration-200">
            <div className="flex gap-5 text-[#10004F]">
                <div className="flex flex-col w-[150px]">
                    <div className="flex font-bold">
                        { 
                            passenger.age?.includes("adult") || !passenger.age
                            ? 
                            <Image src={adultIcon} alt="" />
                            : passenger.age.includes("child") 
                                ? <Image src={kidIcon} alt="" />
                                : <Image src={babyIcon} alt="" />
                                
                        }
                    <p>{passenger.age ? `${ageDetail(passenger.age)} ${index+1}`: `Pasajero ${index+1}`}</p>
                    </div>

                </div>
                <div className="flex flex-col">
                    <p className="font-bold">{(passenger.firstName && passenger.lastName) && `${passenger.firstName} ${passenger.lastName}`}</p>

                    <p>
                        {passenger.identification.type && `${idTypeDetail(passenger.identification.type)}: ${Number(passenger.identification.number).toLocaleString('es-AR')}`} 
                        {(passenger.contact.phoneCode && passenger.contact.phoneNumber) && `| ${passenger.contact.phoneCode} ${passenger.contact.phoneNumber} | `} {passenger.contact.email && <span className="font-bold">{passenger.contact.email}</span>}
                    </p>
                    <p>{`Dirección: ${passenger.contact.address.street}`}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center opacity-30">
                <div className="flex flex-row items-center text-orange-500 gap-3">
                    <EnvelopeIcon className="size-6 cursor-default duration-200" />
                    <span className="text-gray-300">|</span>
                    <DocumentDuplicateIcon className="size-6 cursor-default duration-200" />
                    <span className="text-gray-300">|</span>
                    <PencilIcon className="size-6 cursor-default duration-200" />
                </div>
            </div>
        </div>
    )
}

export { TravelCard, PassengerCard }