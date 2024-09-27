'use client'
import { useState } from "react";
import { PortalNavBar } from "@/components/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

let initialOptions = [
    {
        id: "cronos4",
        cant_handBag: 4,
        cant_bag: 2,
        cant_littleBag: 3,
        cant_special: 1,
        name: "Fiat Cronos",
        seats: 3,
        price_less_15: 9000,
        price_15_to_50: 600,
        price_50_to_100: 500,
        price_100_to_600: 450,
        price_more_600: 450,
        driverFee: 10,
        quantity: 0,
        nominal_data: {
            cant_handBag: 4,
            cant_bag: 2,
            cant_littleBag: 3,
            name: "Fiat Cronos",
            seats: 3,
        }
    },
    {
        id: "sharan7",
        cant_handBag: 7,
        cant_bag: 3,
        cant_littleBag: 6,
        cant_special: 1,
        name: "Volkswagen Sharan",
        seats: 6,
        price_less_15: 20000,
        price_15_to_50: 900,
        price_50_to_100: 800,
        price_100_to_600: 700,
        price_more_600: 700,
        driverFee: 12,
        quantity: 0,
        nominal_data: {
            cant_handBag: 7,
            cant_bag: 3,
            cant_littleBag: 6,
            name: "Volkswagen Sharan",
            seats: 6,
        }
    },
    {
        id: "sprinter19",
        cant_handBag: 19,
        cant_bag: 15,
        cant_littleBag: 15,
        cant_special: 1,
        name: "Mercedes Benz Sprinter",
        seats: 19,
        price_less_15: 60000,
        price_15_to_50: 3000,
        price_50_to_100: 3000,
        price_100_to_600: 2200,
        price_more_600: 2200,
        driverFee: 20,
        quantity: 0,
        nominal_data: {
            cant_handBag: 19,
            cant_bag: 15,
            cant_littleBag: 15,
            name: "Mercedes Benz Sprinter",
            seats: 19,
        }
    },
    {
        id: "iveco24",
        cant_handBag: 24,
        cant_bag: 15,
        cant_littleBag: 24,
        cant_special: 1,
        name: "Iveco",
        seats: 24,
        price_less_15: 90000,
        price_15_to_50: 4000,
        price_50_to_100: 3500,
        price_100_to_600: 2800,
        price_more_600: 2600,
        driverFee: 22,
        quantity: 0,
        nominal_data: {
            cant_handBag: 24,
            cant_bag: 15,
            cant_littleBag: 24,
            name: "Iveco",
            seats: 24,
        }
    },
    {
        id: "bus45",
        cant_handBag: 45,
        cant_bag: 45,
        cant_littleBag: 90,
        cant_special: 1,
        name: "Bus 45",
        seats: 45,
        price_less_15: 220000,
        price_15_to_50: 6000,
        price_50_to_100: 4000,
        price_100_to_600: 3800,
        price_more_600: 3600,
        driverFee: 30,
        quantity: 0,
        nominal_data: {
            cant_handBag: 45,
            cant_bag: 45,
            cant_littleBag: 90,
            name: "Bus 45",
            seats: 45,
        }
    },
    {
        id: "bus60",
        cant_handBag: 60,
        cant_bag: 60,
        cant_littleBag: 120,
        cant_special: 1,
        name: "Bus 60",
        seats: 60,
        price_less_15: 280000,
        price_15_to_50: 8000,
        price_50_to_100: 7000,
        price_100_to_600: 4200,
        price_more_600: 4000,
        driverFee: 35,
        quantity: 0,
        nominal_data: {
            cant_handBag: 60,
            cant_bag: 60,
            cant_littleBag: 120,
            name: "Bus 60",
            seats: 60,
        }
    },
];

export default function ExcTravelsCarSettings() {
    const [options, setOptions] = useState(initialOptions);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const newOptions = [...options];
        newOptions[index] = {
            ...newOptions[index],
            [field]: e.target.value // Actualiza el campo dinámicamente
        };
        setOptions(newOptions);
    };

    const inputStyle = "appareance-none block w-full rounded-md shadow-sm border border-gray-300 font-normal text-[16px] hover:shadow-md focus:shadow-md focus:border-orange-400 disabled:bg-gray-200 focus:ring-1 focus:ring-orange-500 px-4 py-3 duration-200 outline-none bg-white"
    return (
        <div className="bg-gray-100 ">
            <PortalNavBar src="/settings/exclusive-travels/vehicles"/>
            <div className="px-10">
                <div className="flex flex-row items-center my-5 gap-3">
                    <p className="font-semibold text-orange-500 underline cursor-pointer">Ajustes</p>
                    <p className="text-[#10004f] font-semibold">{`> Viajes exclusivos / `}<span className="font-bold">Precio por Vehículo</span></p>
                </div>
                <div className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer gap-2">
                    <ArrowLeftIcon className="size-5 none" /> <p className="mr-4">Volver</p>
                    <h1 className="text-[36px] text-black font-normal">
                        Ajustes Viajes Exclusivos | <strong>Precio por Vehículo</strong>
                    </h1>
                </div>
                <section className="bg-white my-10 rounded-lg p-10">
                    <h1 className="font-semibold text-3xl">Cómo se calcula</h1>
                    <div className="flex justify-end">
                        <button className="px-8">Aplicar</button>

                    </div>
                    <div className="my-10">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="text-left bg-orange-200">
                                    <th className="w-1/6 px-2">TIPO DE VEHICULO</th>
                                    <th className="w-1/6 px-4">{`< 15 km`}</th>
                                    <th className="w-1/6 px-4">{`16 a 50 km`}</th>
                                    <th className="w-1/6 px-4">{`51 a 100 km`}</th>
                                    <th className="w-1/6 px-4">{`101 a 600 km`}</th>
                                    <th className="w-1/6 px-4">{`> 600 km`}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {options.map((vehicle, index) => (
                                    <tr key={index} className="hover:bg-orange-100">
                                        <td className="align-middle">{`${vehicle.name} (${vehicle.seats} Pax)`}</td>
                                        <td className="align-middle text-center hover:bg-orange-200 duration-200">
                                            <input
                                                className={inputStyle}
                                                value={vehicle.price_less_15}
                                                onChange={(e) => handleInputChange(e, index, 'price_less_15')}
                                            />
                                        </td>
                                        <td className="align-middle text-center hover:bg-orange-200 duration-200">
                                            <input
                                                className={inputStyle}
                                                value={vehicle.price_15_to_50}
                                                onChange={(e) => handleInputChange(e, index, 'price_15_to_50')}
                                            />
                                        </td>
                                        <td className="align-middle text-center hover:bg-orange-200 duration-200">
                                            <input
                                                className={inputStyle}
                                                value={vehicle.price_50_to_100}
                                                onChange={(e) => handleInputChange(e, index, 'price_50_to_100')}
                                            />
                                        </td>
                                        <td className="align-middle text-center hover:bg-orange-200 duration-200">
                                            <input
                                                className={inputStyle}
                                                value={vehicle.price_100_to_600}
                                                onChange={(e) => handleInputChange(e, index, 'price_100_to_600')}
                                            />
                                        </td>
                                        <td className="align-middle text-center hover:bg-orange-200 duration-200">
                                            <input
                                                className={inputStyle}
                                                value={vehicle.price_more_600}
                                                onChange={(e) => handleInputChange(e, index, 'price_more_600')}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
