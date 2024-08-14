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
import { isValid } from "@/utils/basics";

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
  const { passengerData, setPassengerData } = usePassengerData();
  const [errors, setError] = useState(errorInitialState);
  const [isDisabled, setIsDisabled] = useState(!passengerData.agreements.termsCondition)

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



    const initialErrorData = {
      ...errorInitialState,
      passengers: errorPassengers,
    };

    setError(initialErrorData as any);
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
    if (passenger.contact.email === "") {
      temporalError = {
        ...temporalError,
        contact: {
          ...temporalError.contact,
          email: "Ingresa un e-mail",
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
    // if (passenger.contact.address.city === "") {
    //   temporalError = {
    //     ...temporalError,
    //     contact: {
    //       ...temporalError.contact,
    //       address: {
    //         ...temporalError.contact.address,
    //         city: "Selecciona una ciudad",
    //       },
    //     },
    //   };
    // }
    // if (passenger.contact.address.number === "") {
    //   temporalError = {
    //     ...temporalError,
    //     contact: {
    //       ...temporalError.contact,
    //       address: {
    //         ...temporalError.contact.address,
    //         number: "Indica un número de calle",
    //       },
    //     },
    //   };
    // }
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
    return temporalError;
  };


  const errorHandler = () => {

    const passengersErrors = errors.passengers.map((oldError, i) => {
      const passenger: Passenger = passengerData.passengers[i];
      const newError: any = errorPassengerHandler(oldError, passenger);
      return newError;
    });
    setError({
      ...errors,
      passengers: passengersErrors,
    });

  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    errorHandler();
    const persistedData = JSON.stringify(passengerData);
    window.localStorage.setItem("form1", persistedData);
    console.log('passengerData', passengerData)
    console.log('Pasa revision de errores: ', isValid(errors, errorInitialState))
    console.log('Errors: ', errors)
    isValid(errors, errorInitialState) ? redirect("/booking/travel_options"): null;
  };

  return (
    <form action="#" className="py-8 text-sm text-gray-500 font-bold w-10/12">
      {errors.globals.map(isError).reduce((x: boolean, y: boolean) => x || y)
        ? errors.globals.map((err: string, index: number) => (
          <RedAlert key={index}>{err}</RedAlert>
        ))
        : null}

      {errors.passengers.length > 0 &&
        passengerData.passengers.map((passenger, index: number) => {
          return (
            <FormPassenger
              errors={errors.passengers[index]}
              setError={(newError: any) => {
                const passengers: any = errors.passengers.map((oldError, i) =>
                  index === i ? newError : oldError,
                );
                setError({
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
            />
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
            setIsDisabled(passengerData.agreements.termsCondition)
            console.log('Disabled?:', isDisabled)
            console.log('TyC?:', passengerData.agreements.termsCondition)
          }
          }
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
