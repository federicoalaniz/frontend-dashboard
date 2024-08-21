"use client";

import { PortalNavBar } from "@/components/Navbar";
import { ArrowLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import logo from "@/ui/img/Logo.png"
import Image from "next/image";
import adultIcon from "@/ui/icons/adult.svg"
import { TravelCard, PassengerCard } from "@/components/budget-services/Cards";
import { formatDateDDMMYYY, idTypeDetail, transferTypeDescription } from "@/utils/basics";
import { MapIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import Spinner from "@/components/Spinner";

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

function DetailsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const router = useRouter();
    const redirect = (path: string) => {
        router.push(path);
    };

    const [data, setData] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${APIBASE}/api/products/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer zxcvbnm",
                },
            });
            const json = await result.json();
            setData(json.data);

        };

        fetchData().catch(console.log);
    }, []);

    if (!data) {
        return <Spinner />;
    }

    const tripData = data?.form0;
    const passengersData = data?.form1?.passengers;
    const totalCost = data.form2.totalCost;
    const partiallyPaid = 86000;
    return (
        <>
            <PortalNavBar />
            <div className="px-10 py-3 bg-gray-100">
                <div className="flex flex-row">
                    <p className="font-semibold"><span className="text-orange-500 underline">Viajes exclusivos</span> {" > "} {`VE${data._id.substring(0, 6)}`}</p>
                </div>
                <div className="flex flex-row mt-10 items-center justify-between">
                    <div className="flex">
                        <div 
                            className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer"
                            onClick={() => redirect("/budget-services")}
                        >
                            <ArrowLeftIcon className="size-4 mr-2" /> <p>Volver</p>
                        </div>
                        <div className="flex text-3xl">
                            <p className="font-bold">SERVICIO {`VE${data._id.substring(0, 6)}`} <span className="font-light">| {"15/02/2024"}</span> </p>
                        </div>
                        <QrCodeIcon className="flex mx-2 size-8 items-center" />
                    </div>
                    <div className="flex items-center">
                        <button className="px-3 flex items-center" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                            A Cotizar
                        </button>
                        <EllipsisVerticalIcon className="size-6 text-orange-500 mx-4 opacity-30 duration-300 cursor-default" />
                    </div>
                </div>
                <div className="bg-white mt-5 mb-10 rounded-md p-4 shadow-lg">
                    <div className="flex flex-row justify-between text-gray-500 font-semibold">
                        <div className="">
                            <p><span>RECURRENTE - </span> Lunes a viernes</p>
                        </div>
                        <div>
                            <p>Fecha inicio: {formatDateDDMMYYY(new Date(tripData.departure.date))}   {data.form0.tripType.roundTrip && `|  Fecha término: ${formatDateDDMMYYY(new Date(tripData.return.date))}`} </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between text-gray-500 text-sm mt-2 mb-10">
                        <p>{transferTypeDescription(tripData)}</p>
                        <p>{tripData.tripType.roundTrip ? "IDA y VUELTA" : "IDA"}

                            {tripData.fullTime && <span className="bg-[#2174A6] text-white rounded-full px-2 py-1 ml-2">{"Disponibilidad 100%"}</span>}
                        </p>

                    </div>
                    <TravelCard id={`VE${data._id.substring(0, 6)}`} tripData={tripData} departure travelDuration={data?.form2.vehicleTravelDuration} />
                    {
                        tripData.tripType.roundTrip &&
                        <>
                            <div className="border-2 border-gray-400"></div>
                            <TravelCard id={`VE${data._id.substring(0, 6)}`} tripData={tripData} departure={false} travelDuration={data?.form2.vehicleTravelDuration} />
                        </>
                    }
                    <div className="flex flex-row mt-10 gap-4 items-center">
                        <Image src={logo || ""} alt="" className="h-8 w-[100px]" />
                        <p>Cta. Cte.: Web</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex">
                            <p>{`${"Mercado Pago"} - ${"Tarjeta de crédito"} ${"**** **** **** 5678"} | `}</p>
                            <Link href={"#"} className="font-semibold ml-2 cursor-pointer underline text-orange-500">Factura A 12812323</Link>
                        </div>
                        <div className="flex text-3xl font-semibold">
                            <p>{`${partiallyPaid.toLocaleString("es-AR", { style: "currency", currency: "ARS", })} / `}<span className="text-gray-400">{totalCost.toLocaleString("es-AR", { style: "currency", currency: "ARS", })}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 text-[#10004F]">
                        <div className="flex flex-col">
                            <div className="flex font-bold">
                                <Image src={adultIcon || ""} alt="" />
                            </div>

                        </div>
                        <div className="flex flex-col">
                            <div className="flex font-bold gap-2">
                                <p>{`${passengersData[0].firstName} ${passengersData[0].lastName}`}</p>
                            </div>
                            <p>{`${idTypeDetail(passengersData[0].identification.type)}: ${Number(passengersData[0].identification.number).toLocaleString('es-AR')} | ${passengersData[0].contact.phoneCode} ${passengersData[0].contact.phoneNumber} | `}<span className="font-bold">{passengersData[0].contact.email}</span></p>

                        </div>
                    </div>
                </div>
                <div className="bg-white mt-5 mb-10 rounded-md p-4 shadow-lg">
                    <h1 className="text-3xl font-semibold text-[#10004F]">Info pasajeros</h1>
                    <div className="flex flex-row mt-10 mb-4 justify-between items-center opacity-30">
                        <div className="flex text-orange-500 font-semibold underline gap-3 ">
                            <Link href={"#"} className="cursor-default">Enviar lista a CNRT</Link>
                            <span className="text-gray-300">|</span>
                            <Link href={"#"} className="cursor-default">Exportar</Link>
                            <span className="text-gray-300">|</span>
                            <Link href={"#"} className="cursor-default">Copiar Lista</Link>
                        </div>
                        <div className="flex font-semibold text-gray-500 gap-2 cursor-default hover:opacity-80 duration-300">
                            <MapIcon className="size-5" />
                            <p>Map View</p>
                        </div>
                    </div>
                    {passengersData.map((passenger: any, index: number) => {
                        return (
                            <PassengerCard
                                passenger={passengersData[index]}
                                index={index}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default function Details() {
    return (
        <Suspense fallback={<Spinner />}>
            <DetailsContent />
        </Suspense>
    );
}
