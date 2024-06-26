"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AVCounter, { IconType } from "./counter";
import { LabelInput } from "./input";
import { RadioButtonComponent } from "./radioButton";
import Select from "./select";
import Separator from "./separator";
import TextArea from "./textArea";
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import exclamation from "@/ui/icons/exclamation.svg";
import { useTrip } from "@/state/booking/TripContext";

const inter = Inter({ subsets: ["latin"] });

export default function AVForm() {
  const { trip, setTrip } = useTrip();
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  let initialData = trip;
  useEffect(() => {
    try {
      const form0Data = window.localStorage.getItem("form0");
      initialData = form0Data ? JSON.parse(form0Data) : trip;
      console.log(initialData);
    } catch (error) {
      console.log(error);
    }
    setTrip(initialData);
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log("AVFORM >> SubmitHandler");
    console.log(trip);

    const persistedData = JSON.stringify(trip);
    window.localStorage.setItem("form0", persistedData);
    redirect("/booking/passengers");
  };

  return (
    <div
      className="bg-white rounded-md shadow-lg flex flex-col items-center 
          -m-20 border border-solid w-[1052px]"
    >
      <h3 className="font-bold text-[#10004F] text-[32px] my-6 w-10/12">
        Cotiza tu viaje ahora
      </h3>
      <form action="#" className="py-8 text-sm text-gray-500 font-bold w-11/12">
        <Separator title="Tipo de viaje" />
        <div className="flex items-center">
          <div className="w-1/2">
            <div>
              <div className="relative font-semibold">
                <select
                  name="travel_type"
                  id="travel_type"
                  className="w-full rounded-md shadow-sm border border-gray-300
                    text-[16x] hover:shadow-md focus:shadow-md focus:border-gray-500
                    focus:border-1 px-4 py-3 my-5 duration-200 outline-none 
                    bg-inherit"
                  value={trip.tripType.transferType}
                  onChange={(e: any) => {
                    setTrip({
                      ...trip,
                      tripType: {
                        ...trip.tripType,
                        transferType: e.currentTarget.value,
                      },
                    });
                  }}
                >
                  <option value="particular" label="Traslado Particular" />
                  <option value="corporative" label="Traslado Corporativo" />
                  <option value="nat_airport" label="Aeroportuario Nacional" />
                  <option
                    value="int_airport"
                    label="Aeroportuario Internacional"
                  />
                </select>
                <span
                  className="absolute left-0 top-3 bg-white mx-3 px-2
                    peer focus:text-gray-300 duration-200 text-[16px]
                    text-xs font-normal"
                >
                  Tipo de traslado
                </span>
              </div>
            </div>
          </div>
          <div className="flex">
            <RadioButtonComponent
              name="type"
              label="Ida y vuelta"
              value="true"
              checked={trip.tripType.roundTrip}
              onChange={() => {
                setTrip({
                  ...trip,
                  tripType: {
                    ...trip.tripType,
                    roundTrip: true,
                  },
                });
              }}
            />
            <RadioButtonComponent
              name="type"
              label="Solo ida"
              value="false"
              checked={!trip.tripType.roundTrip}
              onChange={() => {
                setTrip({
                  ...trip,
                  tripType: {
                    ...trip.tripType,
                    roundTrip: false,
                  },
                });
              }}
            />
          </div>
        </div>

        {trip.tripType.roundTrip && (
          <>
            <div>
              <Separator title="Disponibilidad de vehículos" />
              <div className="py-6">
                <div className="flex">
                  <RadioButtonComponent
                    name="disp"
                    label="Solo durante la ida/vuelta"
                    value="false"
                    checked={!trip.fullTime}
                    onChange={() => {
                      setTrip({
                        ...trip,
                        fullTime: false,
                      });
                    }}
                  />
                  <RadioButtonComponent
                    name="disp"
                    label="100% del tiempo"
                    value="true"
                    checked={trip.fullTime}
                    onChange={() => {
                      setTrip({
                        ...trip,
                        fullTime: true,
                      });
                    }}
                  />
                </div>
              </div>
              {trip.fullTime && <FullTimeMessage />}
            </div>
          </>
        )}

        <Separator title="Salida / Regreso" />
        <div className="flex flex-row pr-4 pt-3">
          <div className="w-1/2 mr-2">
            <LabelInput
              type="search"
              placeholder="Salida"
              value={trip.departure.city}
              onChange={(e: any) => {
                setTrip({
                  ...trip,
                  departure: {
                    ...trip.departure,
                    city: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
          <div className="w-1/2 ml-2">
            <LabelInput
              type="search"
              placeholder="Destino"
              value={trip.return.city}
              onChange={(e: any) => {
                setTrip({
                  ...trip,
                  return: {
                    ...trip.return,
                    city: e.currentTarget.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 flex flex-col pr-4 pt-1">
            <div>
              <LabelInput
                type="date"
                placeholder="Fecha de partida"
                value={trip.departure.date}
                onChange={(e: any) => {
                  setTrip({
                    ...trip,
                    departure: {
                      ...trip.departure,
                      date: e.currentTarget.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col pr-4 pt-1">
            <div>
              <LabelInput
                type="time"
                placeholder="Hora de partida"
                value={trip.departure.time}
                onChange={(e: any) => {
                  setTrip({
                    ...trip,
                    departure: {
                      ...trip.departure,
                      time: e.currentTarget.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col pr-4 pt-1">
            <div>
              <LabelInput
                type="date"
                placeholder="Fecha de regreso"
                value={trip.return.date}
                onChange={(e: any) => {
                  setTrip({
                    ...trip,
                    return: {
                      ...trip.return,
                      date: e.currentTarget.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="w-1/4 flex flex-col pr-4 pt-1">
            <div>
              <LabelInput
                type="time"
                placeholder="Hora de regreso"
                value={trip.return.time}
                onChange={(e: any) => {
                  setTrip({
                    ...trip,
                    return: {
                      ...trip.return,
                      time: e.currentTarget.value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>

        <Separator title="Pasajeros" />
        <div className="flex flex-column justify-left">
          <AVCounter
            icon={"adult" as IconType}
            title="Adulto"
            subtitle="18 o más años"
            value={trip.passengers.adult}
            handleValue={(adult: number) => {
              setTrip({
                ...trip,
                passengers: {
                  ...trip.passengers,
                  adult,
                },
              });
            }}
          />
          <AVCounter
            icon={"child" as IconType}
            title="Niño"
            subtitle="De 3 a 17 años"
            value={trip.passengers.kid}
            handleValue={(kid: number) => {
              setTrip({
                ...trip,
                passengers: {
                  ...trip.passengers,
                  kid,
                },
              });
            }}
          />
          <AVCounter
            icon={"baby" as IconType}
            title="Bebé"
            subtitle="Hasta 3 años"
            value={trip.passengers.baby}
            handleValue={(baby: number) => {
              setTrip({
                ...trip,
                passengers: {
                  ...trip.passengers,
                  baby,
                },
              });
            }}
          />
        </div>
        <div className="flex flex-column justify-left my-4">
          <AVCounter
            icon={"puppySmall" as IconType}
            title="Hasta 8kg"
            subtitle="Mascota en falda"
            value={trip.passengers.pets.small}
            handleValue={(small: number) => {
              setTrip({
                ...trip,
                passengers: {
                  ...trip.passengers,
                  pets: {
                    ...trip.passengers.pets,
                    small,
                  },
                },
              });
            }}
          />
          <AVCounter
            icon={"puppyBig" as IconType}
            title="Mas de 8kg"
            subtitle="Mascota en asiento"
            value={trip.passengers.pets.big}
            handleValue={(big: number) => {
              setTrip({
                ...trip,
                passengers: {
                  ...trip.passengers,
                  pets: {
                    ...trip.passengers.pets,
                    big,
                  },
                },
              });
            }}
          />
        </div>

        {/*
        <Separator title="Equipaje" />
        <div className="flex flex-column justify-left">
          <AVCounter
            icon={"carry_1" as IconType}
            title="Carry-on 15kg"
            alert
            subtitle="El número de maletas definen el tipo de vehículo"
            value={carryOn}
            handleValue={setCarryOn}
          />
          <AVCounter
            icon={"bag_1" as IconType}
            title="Maleta 23kg"
            alert
            subtitle="El número de maletas definen el tipo de vehículo"
            value={bag23}
            handleValue={setBag23}
          />
          <AVCounter
            icon={"special" as IconType}
            title="Equipaje especial"
            alert
            subtitle="Importante detallarlos, condicionan el tipo de vehículo"
            value={specialQuantity}
            handleValue={setSpecialQuantity}
          />
        </div>
        <div>
          {specialQuantity > 0 && (
            <>
              <label className="relative font-semibold">
                <textarea
                  name="description"
                  id=""
                  placeholder="Describa, ej. Ski, bicicleta, instrumentos..."
                  className="border border-1 border-gray-300 w-full p-5 h-[200px] my-10 rounded-md placeholder:font-normal
                          hover:shadow-md duration-500 focus:border-gray-500 focus:shadow-md focus:duration-500 outline-none"
                  onChange={(e: any) => {
                    setSpecialDetail(e.currentTarget.value);
                  }}
                ></textarea>
                <span
                  className="absolute left-5 -top-[235px] px-2 font-normal text-opacity-80 bg-white
                          text-xs"
                >
                  Detalle de equipajes especiales
                </span>
              </label>
            </>
          )}
        </div>
        */}
        <div className="flex justify-end py-4">
          <input
            type="button"
            value="Cotizar"
            className="border-2 border-solid border-orange-500 bg-orange-500 text-white py-3 px-6 rounded-md"
            onClick={submitHandler}
          />
        </div>
      </form>
    </div>
  );
}

function ShowDisponibility() {
  const [fullTime, setFullTime] = useState(true);

  return (
    <>
      <div>
        <Separator title="Disponibilidad de vehículos" />
        <div className="py-6">
          <div className="flex">
            <RadioButtonComponent
              name="disp"
              label="Solo durante la ida/vuelta"
              value="false"
              checked={!fullTime}
              onChange={(e: any) => {
                setFullTime(false);
              }}
            />
            <RadioButtonComponent
              name="disp"
              label="100% del tiempo"
              value="true"
              checked={fullTime}
              onChange={(e: any) => {
                setFullTime(true);
              }}
            />
          </div>
        </div>
        {fullTime && <FullTimeMessage />}
      </div>
    </>
  );
}

function FullTimeMessage() {
  return (
    <>
      <div
        className={`${inter.className} border border-[#4658DF] text-[#10004f] rounded-lg px-4 py-6 text-[16px] font-normal`}
      >
        <p className="text-[18px] font-bold ">Importante:</p>
        <p className="mt-2 ">
          El o los vehículos y sus condutores estarán a disposición durante todo
          el viaje, incluyendo hasta 50km de recorrido libre sin cargo por hora
          esperada (no inlcuye posibles peajes u otros cargos)
        </p>

        <div className="border border-[#4658DF] rounded-lg bg-[#D9DDF8] mt-4 p-2 flex flex-row">
          <Image src={exclamation} alt="exclamation" className="m-2" />
          <p>
            Si las necesidades del viaje excedieran este tope emitiremos una
            factura posterior con este detalle. El valor del km extra es de $300
          </p>
        </div>
      </div>
    </>
  );
}
