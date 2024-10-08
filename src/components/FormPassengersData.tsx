"use client";
import { useState, useEffect } from "react";
import FormPassenger from "@/components/booking/passengers/FormPassenger";
import Separator from "@/components/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePassengerData } from "@/state/booking/PassengerContext";
import { Passenger } from "@/state/Passenger.type";
import { RedAlert } from "./alert";
import { isError } from "./ErrorMessage";
import { isValid, isValidEmail, updateLocalStorage } from "@/utils/basics";
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

let errorInitialState = {
  passengers: [] as any[],
  termsCondition: "",
  newsletter: "",
  globals: [""],
};


export default function Passengers({
  passengers: amountPassegengers,
}: {
  passengers: number;
}) {

  const passengersInitialErrorState = Array.from(
    { length: amountPassegengers },
    (_) =>
    ({
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      identification: {
        type: "",
        number: "",
        country: "",
      },
      contact: {
        phoneCode: "",
        phoneNumber: "",
        email: "",
        address: {
          street: "",
          googlePlace: {
            lat: "",
            lng: "",
          }
        },
      },
    }),
  );

  const { passengerData, setPassengerData } = usePassengerData();
  const [errors, setErrors] = useState(errorInitialState);
  const [isDisabled, setIsDisabled] = useState(!passengerData.agreements.termsCondition);
  const [render, setRender] = useState(true);


  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const passengers: Passenger[] = Array.from(
      { length: amountPassegengers },
      (_) =>
        ({
          firstName: "",
          lastName: "",
          age: "",
          identification: {
            type: "",
            number: "",
            country: "",
          },
          contact: {
            phoneCode: "",
            phoneNumber: "",
            email: "",
            address: {
              street: "",
              other: "",
              googlePlace: {
                lat: "",
                lng: "",
              }
            },
          },
        }) as Passenger,
    );
    let initialData = { ...passengerData, passengers };



    errorInitialState = {
      ...errorInitialState,
      passengers: passengersInitialErrorState
    }

    try {
      const form1Data = window.localStorage.getItem("form1");
      initialData = form1Data ? JSON.parse(form1Data) : initialData;
    } catch (error) {
      console.log(error);
    }

    setPassengerData(initialData);

    const errorPassengers = passengers.map((_p) => ({
      firstName: "",
      lastName: "",
      gender: "",
      identification: {
        type: "",
        number: "",
        country: "",
      },
      age: "",
      contact: {
        phoneCode: "",
        phoneNumber: "",
        email: "",
        address: {
          street: "",
          googlePlace: {
            lat: "",
            lng: "",
          }
        },
      },
    }));

    errorInitialState = {
      ...errorInitialState,
      passengers: Array.from(
        { length: amountPassegengers },
        (_) =>
        ({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          identification: {
            type: "",
            number: "",
            country: "",
          },
          contact: {
            phoneCode: "",
            phoneNumber: "",
            email: "",
            address: {
              street: "",
              googlePlace: {
                lat: "",
                lng: "",
              }
            },
          },
        }),
      ),
    };

    const initialErrorData = {
      ...errorInitialState,
      passengers: errorPassengers,
    };

    setErrors(initialErrorData as any);
  }, []);

  const errorPassengerHandler = (errors: any, passenger: Passenger): any => {
    let temporalError = { ...errors };
    if (passenger.firstName === "") {
      temporalError = {
        ...temporalError,
        firstName: "Ingresa tu nombre",
      };
    }
    if (passenger.lastName === "") {
      temporalError = {
        ...temporalError,
        lastName: "Ingresa tu apellido",
      };
    }
    if (passenger.identification.type === "") {
      temporalError = {
        ...temporalError,
        identification: {
          ...temporalError.identification,
          type: "Selecciona el tipo de documento",
        },
      };
    }
    if (passenger.identification.number === "") {
      temporalError = {
        ...temporalError,
        identification: {
          ...temporalError.identification,
          number: "Ingresa el número de documento",
        },
      };
    }
    if (passenger.identification.country === "") {
      temporalError = {
        ...temporalError,
        identification: {
          ...temporalError.identification,
          country: "Ingresa el número de documento",
        },
      };
    }
    if (!isValidEmail(passenger.contact.email)) {
      temporalError = {
        ...temporalError,
        contact: {
          ...temporalError.contact,
          email: "Ingresa un e-mail válido",
        },
      };
    }
    if (passenger.contact.phoneCode === "") {
      temporalError = {
        ...temporalError,
        contact: {
          ...temporalError.contact,
          phoneCode: "Completar",
        },
      };
    }
    if (passenger.contact.phoneNumber === "") {
      temporalError = {
        ...temporalError,
        contact: {
          ...temporalError.contact,
          phoneNumber: "Ingresar un número de teléfono",
        },
      };
    }
    if (passenger.contact.address.street === "") {
      temporalError = {
        ...temporalError,
        contact: {
          ...temporalError.contact,
          address: {
            ...temporalError.contact.address,
            street: "Ingresa una dirección",
          },
        },
      };
    }
    if (!passenger.gender) {
      temporalError = {
        ...temporalError,
        gender: "Selecciona un género",
      };
    }
    console.log({ temporalError })
    return temporalError;
  };



  const errorHandler = async () => {
    const passengersErrors = await Promise.all(
      errors.passengers.map(async (oldError, i) => {
        if (i === 0) { // Solo controla el primer pasajero
          const passenger: Passenger = passengerData.passengers[i];
          const newError: any = await errorPassengerHandler(oldError, passenger);
          return newError;
        }
        return oldError; // Devolver los errores antiguos para otros pasajeros
      })
    );

    setErrors({
      ...errors,
      passengers: passengersErrors,
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!localStorage.getItem('form0')) {
      redirect('/booking');
    } else {
      await errorHandler(); // Espera a que errorHandler() termine

      // Usa una función en setErrors para asegurarte de que el estado se ha actualizado correctamente antes de validar
      setErrors(prevErrors => {
        const persistedData = JSON.stringify(passengerData);
        updateLocalStorage("form1", persistedData);

        console.log('validacion', isValid(prevErrors, errorInitialState));
        console.log({ prevErrors }, { errorInitialState });

        // Ahora realiza la validación final con el estado actualizado
        if (isValid(prevErrors, errorInitialState)) {
          redirect("/booking/travel_options");
        }

        return prevErrors; // Devuelve el estado sin cambios
      });
    }
  };

  useEffect(() => {
    setIsDisabled(!passengerData.agreements.termsCondition);
  }, [passengerData.agreements.termsCondition]);

  return (
    <form action="#" className="py-8 text-sm text-gray-500 font-bold w-10/12">
      {errors.globals.map(isError).reduce((x: boolean, y: boolean) => x || y)
        ? errors.globals.map((err: string, index: number) => (
          <RedAlert key={index}>{err}</RedAlert>
        ))
        : null}
      <div
        className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer gap-2"
        onClick={() => redirect("/booking")}
      >
        <ArrowLeftIcon className="size-5" /> <p className="mr-4">Volver</p>
        <h3 className="font-bold text-[#10004F] text-[32px] my-6 w-10/12">
          Datos de los pasajeros
        </h3>
      </div>
      {errors.passengers.length > 0 &&
        passengerData.passengers.map((passenger, index: number) => {
          return (
            index === 0 &&
            <div key={index}>
              <FormPassenger
                errors={errors.passengers[index]}
                setError={(newError: any) => {
                  const passengers: any = errors.passengers.map((oldError, i) =>
                    index === i ? newError : oldError,
                  );
                  setErrors({
                    ...errors,
                    passengers,
                  });
                }}
                key={index}
                passenger={passenger}
                setPassenger={(argP: Passenger | Function) => {
                  setPassengerData(passengerData => {
                    let newP = (typeof argP === "function")
                      ? argP(passengerData.passengers[index])
                      : argP

                    const passengers = passengerData.passengers.map((oldP, i) =>
                      index === i ? newP : oldP,
                    );
                    return {
                      ...passengerData,
                      passengers,
                    }
                  });
                }}
                index={index}
                responsiblePassenger={passengerData.passengers[0]}
                totalPassengers={passengerData.passengers.length}
              />
            </div>

          );
        })}


      {
        errors.passengers.length > 1 &&
        <>
          <div className={`${inter.className} font-normal gap-2 w-full text-[18px] shadow-sm rounded-lg border border-[#4658DF] text-[#10004f] px-4 py-4 my-2 mt-5`}>
            <div className="flex flex-row gap-2">
              <ExclamationCircleIcon className="size-12 text-[#4658DF] -mt-2" />
              <div>
                <h1 className="text-2xl font-semibold">¡Buena Noticia!</h1>
                <p>
                  Puedes responder los datos del resto de los pasajeros más tarde si todos partirán desde una misma zona, pero <strong>deberán estar completos 48 hs. antes del viaje.</strong>
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 mt-5">
              <div
                className="bg-inherit rounded px-3 py-1 shadow-none text-orange-500 hover:ring-orange-500 hover:ring-2 focus:bg-orange-500 focus:text-white duration-200 font-semibold cursor-pointer selection:bg-inherit"
                onClick={() => {
                  setRender(!render)
                }}
              >
                {render ? 'Completar en otro momento' : 'Completar Ahora'}
              </div>
            </div>
          </div>
        </>
      }

      {(errors.passengers.length > 0 && render) &&
        passengerData.passengers.map((passenger, index: number) => {
          return (
            (index > 0) &&
            <div key={index}>
              <FormPassenger
                errors={errors.passengers[index]}
                setError={(newError: any) => {
                  const passengers: any = errors.passengers.map((oldError, i) =>
                    index === i ? newError : oldError,
                  );
                  setErrors({
                    ...errors,
                    passengers,
                  });
                }}
                key={index}
                passenger={passenger}
                setPassenger={(argP: Passenger | Function) => {
                  setPassengerData(passengerData => {
                    let newP = (typeof argP === "function")
                      ? argP(passengerData.passengers[index])
                      : argP

                    const passengers = passengerData.passengers.map((oldP, i) =>
                      index === i ? newP : oldP,
                    );
                    return {
                      ...passengerData,
                      passengers,
                    }
                  });
                }}
                index={index}
                responsiblePassenger={passengerData.passengers[0]}
                totalPassengers={passengerData.passengers.length}
              />
            </div>

          );
        })}
      <Separator title="Otros" />
      <div className="flex items-center">
        <input
          type="checkbox"
          className="px-2 h-5 w-5 accent-orange-500 rounded-md border-1 border-orange-500
                    focus:outline-none duration-500 hover:shadow-md "
          checked={passengerData.agreements.termsCondition}
          onChange={() => {
            setPassengerData({
              ...passengerData,
              agreements: {
                ...passengerData.agreements,
                termsCondition: !passengerData.agreements.termsCondition,
              },
            })
          }}
        />
        <label className="text-black p-2">
          Al continuar con la cotización acepta los{" "}
          <Link href="#" className="text-orange-500 underline">
            Términos y Condiciones
          </Link>{" "}
          y{" "}
          <Link href="#" className="text-orange-500 underline">
            Politicas de Privacidad.
          </Link>
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="px-2 h-5 w-5 accent-orange-500 rounded-md border-1 border-orange-500
                    focus:outline-none duration-500 hover:shadow-md "
          checked={passengerData.agreements.newsletter}
          onChange={() =>
            setPassengerData({
              ...passengerData,
              agreements: {
                ...passengerData.agreements,
                newsletter: !passengerData.agreements.newsletter,
              },
            })
          }
        />
        <label className="text-black p-2">
          Deseo recibir ofertas y novedades de Turismo Ruggeri a mi correo.
        </label>
      </div>

      <div className="flex my-10 items-center justify-end">
        <div
          className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer gap-2"
          onClick={() => redirect("/booking")}
        >
          <ArrowLeftIcon className="size-5" /> <p className="mr-4">Volver</p>
        </div>
        <button
          type="button"
          className="bg-orange-500 text-white text-[18px] px-7 py-4 rounded-md
                    duration-500 hover:shadow-md"
          disabled={isDisabled}
          onClick={submitHandler}

        >
          Continuar
        </button>
      </div>
    </form>
  );
}
