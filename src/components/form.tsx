"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AVCounter, { IconType } from "./counter";
import { RadioButtonComponent } from "./radioButton";
import Select from "./select";
import Separator from "./separator";
import Image from "next/image";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import exclamation from "@/ui/icons/exclamation.svg";
import { useTrip } from "@/state/booking/TripContext";
import LabelInput from "./input";
import { RedAlert } from "./alert";
import { isError } from "./ErrorMessage";
import TextArea from "./textArea";
import { isValid, updateLocalStorage } from "@/utils/basics";
import { loadGoogleMaps } from "@/utils/loadGoogleMaps";
import SearchAddresses from "./PlacesAutocomplete";
import Spinner from "./Spinner";

const inter = Inter({ subsets: ["latin"] });

export default function AVForm() {
  const { trip, setTrip } = useTrip();
    // useState<google.maps.LatLngBounds | null>(null);
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const roundTrip: boolean = trip.tripType.roundTrip;
  const errorsInitialState: any = {
    globals: [],
    tripType: {
      transferType: "",
      roundTrip: "",
    },
    fullTime: "",
    departure: {
      address: "",
      date: "",
      time: "",
    },
    return: {
      address: "",
      date: "",
      time: "",
    },
    passengers: {
      adult: "",
      kid: "",
      baby: "",
      pets: {
        small: "",
        big: "",
      },
    },
    luggage: {
      carryOn: "",
      bag23: "",
      special: {
        quantity: "",
        detail: "",
      },
    },
  };

  const [errors, setErrors] = useState(errorsInitialState);

  function errorChecker(resObj: any) {
    const INCOMPLETE_FORM = "Hay datos incompletos en el formulario";
    const NO_ADULTS = "Debe haber al menos 1 pasajero adulto";
    const newErrors = { ...errors };

    if (resObj?.tripType?.transferType === "")
      newErrors.tripType.transferType = "Selecciona un tipo de traslado";

    if (resObj?.departure?.address === "")
      newErrors.departure.address = "Selecciona un origen";

    if (resObj?.departure?.date === "")
      newErrors.departure.date = "Selecciona una fecha de salida";

    if (resObj?.departure?.time === "")
      newErrors.departure.time = "Selecciona una hora de salida";

    if (resObj?.return?.address === "")
      newErrors.return.address = "Selecciona un destino";

    if (resObj?.tripType.roundTrip && resObj?.return?.date === "")
      newErrors.return.date = "Selecciona una fecha de regreso";

    if (resObj?.tripType.roundTrip && resObj?.return?.time === "")
      newErrors.return.time = "Selecciona una hora de regreso";

    if (resObj?.passengers?.adult === 0)
      newErrors.passengers.adult = "Debe haber al menos 1 pasajero adulto";

    if (
      resObj?.luggage?.special?.quantity > 0 &&
      resObj?.luggage?.special?.detail === ""
    )
      newErrors.luggage.special.detail = "Debes detallar tu equipaje";

    setErrors(newErrors);
  }

  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  let initialData = trip;
  useEffect(() => {
    loadGoogleMaps(() => {
      setMapsLoaded(true);
    });
    try {
      const form0Data = window.localStorage.getItem("form0");
      initialData = form0Data ? JSON.parse(form0Data) : trip;
    } catch (error) {
      console.log(error);
    }
    setTrip(initialData);
  }, []);

  const handleDepartureAddressSelected = (
    place: any,
    // place: google.maps.places.PlaceResult,
  ): void => {
    setTrip((trip) => ({
      ...trip,
      departure: {
        ...trip.departure,
        address: place?.formatted_address,
        googlePlace: {
          ...trip.departure.googlePlace,
          lat: place?.geometry.location.lat(),
          lng: place?.geometry.location.lng(),
        },
      },
    }));
  };
  const handleReturnAddressSelected = (
    place: any,
    // place: google.maps.places.PlaceResult,
  ): void => {
    setTrip((trip) => ({
      ...trip,
      return: {
        ...trip.return,
        address: place?.formatted_address,
        googlePlace: {
          ...trip.return.googlePlace,
          lat: place?.geometry.location.lat(),
          lng: place?.geometry.location.lng(),
        },
      },
    }));
  };

  if (!mapsLoaded) {
    return <Spinner/>;
  }

  const submitHandler = (e: any) => {
    e.preventDefault();
    errorChecker(trip);
    const persistedData = JSON.stringify(trip);
    updateLocalStorage("form0", persistedData);
    isValid(errors, errorsInitialState)
      ? redirect("/booking/passengers")
      : null;
  };

  return (
    <div
      className="bg-white rounded-md shadow-lg flex flex-col items-center h-full
          -mt-20 mb-10 border border-solid w-[1052px]"
    >
      <h3 className="font-bold text-[#10004F] text-[32px] my-6 w-10/12">
        Cotiza tu viaje ahora
      </h3>
      <form action="#" className="py-8 text-sm text-gray-500 font-bold w-11/12">
        {errors.globals.length > 0
          ? errors.globals.map((err: string, index: number) => (
              <RedAlert key={index}>{err}</RedAlert>
            ))
          : null}
        <Separator title="Tipo de viaje" />
        <div className="flex items-center">
          <div className="w-1/2">
            <Select
              errorField={errors.tripType.transferType}
              label="Tipo de traslado"
              value={trip.tripType.transferType}
              onChange={(e: any) => {
                if (isError(errors.tripType.transferType)) {
                  setErrors({
                    ...errors,
                    tripType: {
                      ...errors.tripType,
                      transferType: "",
                    },
                  });
                }
                setTrip({
                  ...trip,
                  tripType: {
                    ...trip.tripType,
                    transferType: e.currentTarget.value,
                  },
                });
              }}
            >
              <option value="" defaultValue="" disabled>
                Selecciona una opción
              </option>
              <option value="particular">Traslado Particular</option>
              <option value="corporative">Traslado Corporativo</option>
              <option value="nat_airport">Aeroportuario Nacional</option>
              <option value="int_airport">Aeroportuario Internacional</option>
            </Select>
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
                    label="Solo durante los tramos de ida y/o vuelta"
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
                    label="Quiero disponer del vehículo el 100% del tiempo (incluso durante mi estadía)"
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

        <Separator title="Salida" />
        <div className="flex flex-row">
          <div className="w-1/2 ml-2">
            <SearchAddresses
              label="Dirección"
              errorField={errors.departure.address}
              onPlaceSelected={handleDepartureAddressSelected}
              onChange={(e: any) => {
                if (isError(errors.departure.address)) {
                  setErrors((errors: any) => ({
                    ...errors,
                    departure: {
                      ...errors.departure,
                      address: "",
                    },
                  }));
                }
              }}
            />
          </div>
          <div className="w-1/4 mx-2">
            <LabelInput
              label=""
              type="date"
              placeholder="Fecha de partida"
              value={trip.departure.date}
              errorField={errors.departure.date}
              onChange={(e: any) => {
                if (isError(errors.departure.date)) {
                  setErrors({
                    ...errors,
                    departure: {
                      ...errors.departure,
                      date: "",
                    },
                  });
                }
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
          <div className="w-1/4 ml-2">
            <LabelInput
              type="time"
              label=""
              placeholder="Hora de partida"
              value={trip.departure.time}
              errorField={errors.departure.time}
              onChange={(e: any) => {
                if (isError(errors.departure.time)) {
                  setErrors({
                    ...errors,
                    departure: {
                      ...errors.departure,
                      time: "",
                    },
                  });
                }
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
        { roundTrip ? <Separator title="Destino y Regreso" /> : <Separator title="Destino" />}
        <div className="flex flex-row">
          <div className="w-1/2 ml-2">
            <SearchAddresses
              label="Dirección"
              errorField={errors.return.address}
              onPlaceSelected={handleReturnAddressSelected}
              onChange={(e: any) => {
                if (isError(errors.return.address)) {
                  setErrors((errors: any) => ({
                    ...errors,
                    return: {
                      ...errors.return,
                      address: "",
                    },
                  }));
                }
              }}
            />
          </div>
          {
            roundTrip && 
            <>
              <div className="w-1/4 mx-2">
                <LabelInput
                  type="date"
                  label=""
                  placeholder="Fecha de regreso"
                  errorField={errors.return.date}
                  value={trip.return.date}
                  onChange={(e: any) => {
                    if (isError(errors.return.date)) {
                      setErrors({
                        ...errors,
                        return: {
                          ...errors.return,
                          date: "",
                        },
                      });
                    }
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
              <div className="w-1/4 ml-2">
                <LabelInput
                  type="time"
                  label=""
                  placeholder="Hora de regreso"
                  value={trip.return.time}
                  errorField={errors.return.time}
                  onChange={(e: any) => {
                    if (isError(errors.return.time)) {
                      setErrors({
                        ...errors,
                        return: {
                          ...errors.return,
                          time: "",
                        },
                      });
                    }
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
            </>
          }
        </div>
        <Separator title="Pasajeros" />
        <div className="flex flex-row justify-left mt-4">
          <div className="w-1/3 mr-2">
            <AVCounter
              icon={"adult" as IconType}
              title="Adulto"
              subtitle="18 o más años"
              value={trip.passengers.adult}
              errorField={errors.passengers.adult}
              handleValue={(adult: number) => {
                if (isError(errors.passengers.adult)) {
                  setErrors({
                    ...errors,
                    passengers: {
                      ...errors.passengers,
                      adult: "",
                    },
                  });
                }
                setTrip({
                  ...trip,
                  passengers: {
                    ...trip.passengers,
                    adult,
                  },
                });
              }}
            />
          </div>
          <div className="w-1/3 mx-2">
            <AVCounter
              icon={"child" as IconType}
              title="Niño"
              subtitle="De 3 a 17 años"
              value={trip.passengers.kid}
              errorField={errors.passengers.kid}
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
          </div>
          <div className="w-1/3 ml-2">
            <AVCounter
              icon={"baby" as IconType}
              title="Bebé"
              subtitle="Hasta 3 años"
              value={trip.passengers.baby}
              errorField={errors.passengers.baby}
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
        </div>
        <div className="flex flex-row justify-left mt-4">
          <div className="w-1/3 mr-2">
            <AVCounter
              icon={"puppySmall" as IconType}
              title="Hasta 8kg"
              subtitle="Mascota en falda"
              value={trip.passengers.pets.small}
              errorField={errors.passengers.pets.small}
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
          </div>
          <div className="w-1/3 mx-2">
            <AVCounter
              icon={"puppyBig" as IconType}
              title="Más de 8kg"
              subtitle="Mascota en asiento"
              value={trip.passengers.pets.big}
              errorField={errors.passengers.pets.big}
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
          <div className="w-1/3 ml-2"></div>
        </div>

        <Separator title="Equipaje" />
        <div className="flex flex-row justify-between mt-4">
          <div className="w-1/3 mr-1">
            <AVCounter
              icon={"carry_1" as IconType}
              title="Carry-on 15kg"
              alert
              subtitle="El número de maletas definen el tipo de vehículo"
              value={trip.luggage.carryOn}
              errorField={errors.luggage.carryOn}
              handleValue={(carryOn: number) => {
                setTrip({
                  ...trip,
                  luggage: {
                    ...trip.luggage,
                    carryOn,
                  },
                });
              }}
            />
          </div>
          <div className="w-1/3 mx-2">
            <AVCounter
              icon={"bag_1" as IconType}
              title="Maleta 23kg"
              alert
              subtitle="El número de maletas definen el tipo de vehículo"
              value={trip.luggage.bag23}
              errorField={errors.luggage.bag23}
              handleValue={(bag23: number) => {
                setTrip({
                  ...trip,
                  luggage: {
                    ...trip.luggage,
                    bag23,
                  },
                });
              }}
            />
          </div>
          <div className="w-1/3 ml-1">
            <AVCounter
              icon={"special" as IconType}
              title="Equipaje especial"
              alert
              subtitle="Importante detallarlos, condicionan el tipo de vehículo"
              value={trip.luggage.special.quantity}
              errorField={errors.luggage.special.quantity}
              handleValue={(quantity: number) => {
                setTrip({
                  ...trip,
                  luggage: {
                    ...trip.luggage,
                    special: {
                      ...trip.luggage.special,
                      quantity,
                    },
                  },
                });
              }}
            />
          </div>
        </div>
        <div>
          {trip.luggage.special.quantity > 0 && (
            <>
              <TextArea
                placeholder="Describa, ej. Ski, bicicleta, instrumentos..."
                errorField={errors.luggage.special.detail}
                label="Detalle de equipajes especiales"
                onChange={(e: any) => {
                  if (isError(errors.luggage.special.detail)) {
                    setErrors({
                      ...errors,
                      luggage: {
                        ...errors.luggage,
                        special: {
                          ...errors.luggage.special,
                          detail: "",
                        },
                      },
                    });
                  }
                  setTrip({
                    ...trip,
                    luggage: {
                      ...trip.luggage,
                      special: {
                        ...trip.luggage.special,
                        detail: e.currentTarget.value,
                      },
                    },
                  });
                }}
              ></TextArea>
            </>
          )}
        </div>
        <div className="flex justify-end py-4">
          <button className="py-3 px-6" onClick={submitHandler}>
            Cotizar
          </button>
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
          <Image src={exclamation || ""} alt="exclamation" className="m-2" />
          <p>
            Si las necesidades del viaje excedieran este tope emitiremos una
            factura posterior con este detalle. El valor del km extra es de $300
          </p>
        </div>
      </div>
    </>
  );
}
