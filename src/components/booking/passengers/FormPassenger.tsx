"use client";
import Separator from "@/components/separator";
import LabelInput from "@/components/input";
import React, { useEffect, useState } from "react";
import { Passenger, Gender } from "@/state/Passenger.type";
import { ErrorMessage, isError } from "@/components/ErrorMessage";
import Select from "@/components/select";
import Accordion from "@/components/Accordion";
import SearchAddresses from "@/components/PlacesAutocomplete";
import Image from "next/image";
import adultIcon from "@/ui/icons/adultBold.svg"
import Alert from "@/components/alert";

export default function PassengerForm({
  errors,
  setError,
  passenger,
  setPassenger,
  index,
  responsiblePassenger,
}: {
  errors: any;
  setError: (error: any) => void;
  passenger: Passenger;
  setPassenger: Function;
  index: number;
  responsiblePassenger: Passenger;
}) {
  const [sameAddress, setSameAddress] = useState(true);

  const handleSameAddress = (e: any) => {
    const isChecked = e.currentTarget.checked;
    setSameAddress(isChecked);

    // Si está marcado y no es el responsable, copiar la dirección
    if (isChecked && responsiblePassenger) {
      setPassenger((passenger: Passenger) => {
        return {
          ...passenger,
          contact: {
            ...passenger.contact,
            address: { ...responsiblePassenger.contact.address }, // Copiar la dirección completa
          },
        };
      });
    }
  };


  const handleContactAddressSelected = (place: any): void => {
    setPassenger((passenger: Passenger) => {
      return {
        ...passenger,
        contact: {
          ...passenger.contact,
          address: {
            ...passenger.contact.address,
            street: place?.formatted_address,
            googlePlace: {
              ...passenger.contact.address.googlePlace,
              lat: place?.geometry.location.lat(),
              lng: place?.geometry.location.lng(),
            },
          },
        }
      }
    });
    setError({
      ...errors,
      contact: {
        ...errors.contact,
        address: {
          ...errors.contact.address,
          street: "",
        },
      },
    });
  };

  const isResponsible = index === 0;

  useEffect(() => {
    // Si el checkbox está marcado y no es el pasajero responsable, copiar la dirección
    if (sameAddress && responsiblePassenger && !isResponsible) {
      setPassenger((passenger: Passenger) => ({
        ...passenger,
        contact: {
          ...passenger.contact,
          address: { ...responsiblePassenger.contact.address }, // Copiar la dirección completa
        },
      }));
    }
  }, [sameAddress, responsiblePassenger, isResponsible]);
  return (
    <div>
      {
        index === 0 ?
          <>
            <div>
              <div className="w-full mt-10 mb-5">
                <div
                  className="flex justify-between items-center px-5 pt-3 pb-1 border-b border-blue-900 text-black font-bold rounded-t-lg cursor-pointer
                hover:drop-shadow-xl hover:shadow-blue-500 duration-300"
                >

                  <h1 className='text-[22px] font-bold text-blue-900 flex items-center'>
                    <Image src={adultIcon} alt="paxbold" className="size-8 mr-2" />
                    Responsable del viaje
                  </h1>
                </div>
              </div>
              <Alert />
              <div className="flex flex-row ">
                <div className="w-1/2 mr-2">
                  <LabelInput
                    label=""
                    placeholder="Nombre"
                    value={passenger.firstName}
                    errorField={errors.firstName}
                    onChange={(e: any) => {
                      if (isError(errors.firstName) && index === 0) {
                        setError({
                          ...errors,
                          firstName: "",
                        });
                      }
                      setPassenger({
                        ...passenger,
                        firstName: e.target.value,
                      });

                    }}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <LabelInput
                    label=""
                    placeholder="Apellido"
                    value={passenger.lastName}
                    errorField={errors.lastName}
                    onChange={(e: any) => {
                      if (isError(errors.lastName)) {
                        setError({
                          ...errors,
                          lastName: "",
                        });
                      }

                      setPassenger({
                        ...passenger,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row">
                  <div className="w-1/3">
                    <div>
                      <Select
                        label="Documento"
                        errorField={errors.identification.type}
                        className={`
                          ${isError(errors.identification.type)
                            ? "border-red-500"
                            : ""
                          }`}
                        value={passenger.identification.type}
                        onChange={(e) => {
                          if (isError(errors.identification.type)) {
                            setError({
                              ...errors,
                              identification: {
                                ...errors.identification,
                                type: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            identification: {
                              ...passenger.identification,
                              type: e.target.value,
                            },
                          });
                        }}
                      >
                        <option defaultValue="" disabled></option>
                        <option value="dni">DNI</option>
                        <option value="passport">Pasaporte</option>
                        <option value="ci">CI (URU)</option>
                        <option value="rut">RUT (CHI)</option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <div className="ml-2 mr-4">
                      <LabelInput
                        label=""
                        placeholder="Número de documento"
                        value={passenger.identification.number}
                        errorField={errors.identification.number}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea numérico
                          if (isError(errors.identification.number)) {
                            setError({
                              ...errors,
                              identification: {
                                ...errors.identification,
                                number: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            identification: {
                              ...passenger.identification,
                              number: numericValue,
                            },
                          });

                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <Select
                      label="País de emisión"
                      errorField={errors.identification.country}
                      value={passenger.identification.country}
                      onChange={(e) => {
                        if (isError(errors.identification.country)) {
                          setError({
                            ...errors,
                            identification: {
                              ...errors.identification,
                              country: "",
                            },
                          });
                        }
                        setPassenger({
                          ...passenger,
                          identification: {
                            ...passenger.identification,
                            country: e.target.value,
                          },
                        });

                      }}
                    >
                      <option disabled defaultValue=""></option>
                      <option value="arg">Argentina</option>
                      <option value="bra">Brasil</option>
                      <option value="chi">Chile</option>
                      <option value="uru">Uruguay</option>
                      <option value="bol">Bolivia</option>
                      <option value="col">Colombia</option>
                      <option value="ven">Venezuela</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-3/12">
                  <div>
                    <Select
                      label="Edad"
                      errorField={errors.age}
                      className={` 
                        ${isError(errors.age) ? "border-red-500" : ""}`}
                      value={passenger.age}
                      onChange={(e) => {
                        if (isError(errors.age)) {
                          setError({
                            ...errors,
                            age: "",
                          });
                        }
                        setPassenger({
                          ...passenger,
                          age: e.target.value,
                        });

                      }}
                    >
                      <option disabled defaultValue=""></option>
                      <option value="adult">Adulto</option>
                      <option value="child">Niño</option>
                      <option value="baby">Bebé</option>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row items-center w-9/12">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <input
                        className="mx-4 "
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Male}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Male,
                          });

                        }}
                      />
                      <label htmlFor="man">Hombre</label>

                      <input
                        className="mx-4"
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Female}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Female,
                          });
                        }}
                      />
                      <label htmlFor="man">Mujer</label>
                      <input
                        className="mx-4"
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Other}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Other,
                          });

                        }}
                      />
                      <label htmlFor="other">Prefiero no decirlo</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-3/12"></div>
                <div className="w-9/12 px-4">
                  {isError(errors.gender) && (
                    <ErrorMessage field={errors.gender} />
                  )}
                </div>
              </div>
              <div>
                <Separator title="Datos de contacto" />
              </div>
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row">
                  <div className="w-1/3">
                    <div>
                      <Select
                        label="Código de Área"
                        errorField={errors.contact.phoneCode}
                        className={`
                                        ${isError(errors.contact.phoneCode)
                            ? "border-red-500 "
                            : ""
                          }`}
                        onChange={(e) => {
                          if (isError(errors.contact.phoneCode)) {
                            setError({
                              ...errors,
                              contact: {
                                ...errors.contact,
                                phoneCode: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            contact: {
                              ...passenger.contact,
                              phoneCode: e.target.value,
                            },
                          });
                        }}
                      >
                        <option defaultValue=""></option>
                        <option value="+54">(+54) ARG</option>
                        <option value="+55">(+55) BRA</option>
                        <option value="+56">(+56) CHI</option>
                        <option value="+598">(+598) URU</option>
                        <option value="+591">(+591) BOL</option>
                        <option value="+57">(+57) COL</option>
                        <option value="+58">(+58) VEN</option>
                        <option value="+593">(+593) ECU</option>
                        <option value="+595">(+595) PAR</option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <div className="ml-2 mr-4">
                      <LabelInput
                        label=""
                        placeholder="Número de teléfono"
                        value={passenger.contact.phoneNumber}
                        errorField={errors.contact.phoneNumber}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/\D/g, '');
                          if (isError(errors.contact.phoneNumber)) {
                            setError({
                              ...errors,
                              contact: {
                                ...errors.contact,
                                phoneNumber: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            contact: {
                              ...passenger.contact,
                              phoneNumber: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <LabelInput
                    label=""
                    type="text"
                    placeholder="Correo Electrónico"
                    value={passenger.contact.email}
                    errorField={errors.contact.email}
                    onChange={(e: any) => {
                      if (isError(errors.contact.email)) {
                        setError({
                          ...errors,
                          contact: {
                            ...errors.contact,
                            email: "",
                          },
                        });
                      }
                      setPassenger({
                        ...passenger,
                        contact: {
                          ...passenger.contact,
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            {!isResponsible ? (
              <>
                <div className="flex items-center mt-5">
                  <input
                    type="checkbox"
                    className="px-2 h-5 w-5 accent-orange-500 rounded-md border-1 border-orange-500
                focus:outline-none duration-500 hover:shadow-md "
                    checked={sameAddress}
                    onChange={handleSameAddress}
                  />
                  <label className="text-black p-2">
                    Es la dirección cargada para la salida
                  </label>
                </div>

              </>
            ) : null}

            {(isResponsible || !sameAddress) && (
              <div>
                <Separator title="Dirección (por donde pasaremos a buscarte)" />
                <div className="flex flex-row gap-2">
                  <div className="w-1/2">
                    <SearchAddresses
                      label="Dirección"
                      errorField={errors.contact.address.street}
                      onPlaceSelected={handleContactAddressSelected}
                      value={passenger.contact.address.street}
                      onChange={() => {
                        if (isError(errors.contact.address.street)) {
                          setError({
                            ...errors,
                            contact: {
                              ...errors.contact,
                              address: {
                                ...errors.contact.address,
                                street: "",
                              },
                            },
                          });
                        }
                      }}
                    />
                  </div>
                  <div className=" w-1/2">
                    <LabelInput
                      label=""
                      type="text"
                      placeholder="Depto./Timbre/Otro"
                      value={passenger.contact.address.other}
                      errorField={errors.contact.address.other}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              other: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="w-1/4">
                    <LabelInput
                      label=""
                      placeholder="Entre calle..."
                      value={passenger.contact.address.streetBetween1}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              streetBetween1: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="w-1/4">
                    <LabelInput
                      label=""
                      placeholder="Y calle..."
                      value={passenger.contact.address.streetBetween2}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              streetBetween2: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
          :
          <Accordion
            title={isResponsible ? "Responsable del viaje" : `Pasajero ${index + 1}`}
            open={false}
            key={index}
          >
            <>
              <div className="flex flex-row ">
                <div className="w-1/2 mr-2">
                  <LabelInput
                    label=""
                    placeholder="Nombre"
                    value={passenger.firstName}
                    errorField={errors.firstName}
                    onChange={(e: any) => {
                      if (isError(errors.firstName) && index === 0) {
                        setError({
                          ...errors,
                          firstName: "",
                        });
                      }
                      setPassenger({
                        ...passenger,
                        firstName: e.target.value,
                      });

                    }}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <LabelInput
                    label=""
                    placeholder="Apellido"
                    value={passenger.lastName}
                    errorField={errors.lastName}
                    onChange={(e: any) => {
                      if (isError(errors.lastName)) {
                        setError({
                          ...errors,
                          lastName: "",
                        });
                      }

                      setPassenger({
                        ...passenger,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row">
                  <div className="w-1/3">
                    <div>
                      <Select
                        label="Documento"
                        errorField={errors.identification.type}
                        className={`
                            ${isError(errors.identification.type)
                            ? "border-red-500"
                            : ""
                          }`}
                        value={passenger.identification.type}
                        onChange={(e) => {
                          if (isError(errors.identification.type)) {
                            setError({
                              ...errors,
                              identification: {
                                ...errors.identification,
                                type: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            identification: {
                              ...passenger.identification,
                              type: e.target.value,
                            },
                          });
                        }}
                      >
                        <option defaultValue="" disabled></option>
                        <option value="dni">DNI</option>
                        <option value="passport">Pasaporte</option>
                        <option value="ci">CI (URU)</option>
                        <option value="rut">RUT (CHI)</option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <div className="ml-2 mr-4">
                      <LabelInput
                        label=""
                        placeholder="Número de documento"
                        value={passenger.identification.number}
                        errorField={errors.identification.number}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea numérico
                          if (isError(errors.identification.number)) {
                            setError({
                              ...errors,
                              identification: {
                                ...errors.identification,
                                number: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            identification: {
                              ...passenger.identification,
                              number: numericValue,
                            },
                          });

                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <Select
                      label="País de emisión"
                      errorField={errors.identification.country}
                      value={passenger.identification.country}
                      onChange={(e) => {
                        if (isError(errors.identification.country)) {
                          setError({
                            ...errors,
                            identification: {
                              ...errors.identification,
                              country: "",
                            },
                          });
                        }
                        setPassenger({
                          ...passenger,
                          identification: {
                            ...passenger.identification,
                            country: e.target.value,
                          },
                        });

                      }}
                    >
                      <option disabled defaultValue=""></option>
                      <option value="arg">Argentina</option>
                      <option value="bra">Brasil</option>
                      <option value="chi">Chile</option>
                      <option value="uru">Uruguay</option>
                      <option value="bol">Bolivia</option>
                      <option value="col">Colombia</option>
                      <option value="ven">Venezuela</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-3/12">
                  <div>
                    <Select
                      label="Edad"
                      errorField={errors.age}
                      className={` 
                          ${isError(errors.age) ? "border-red-500" : ""}`}
                      value={passenger.age}
                      onChange={(e) => {
                        if (isError(errors.age)) {
                          setError({
                            ...errors,
                            age: "",
                          });
                        }
                        setPassenger({
                          ...passenger,
                          age: e.target.value,
                        });

                      }}
                    >
                      <option disabled defaultValue=""></option>
                      <option value="adult">Adulto</option>
                      <option value="child">Niño</option>
                      <option value="baby">Bebé</option>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row items-center w-9/12">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <input
                        className="mx-4 "
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Male}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Male,
                          });

                        }}
                      />
                      <label htmlFor="man">Hombre</label>

                      <input
                        className="mx-4"
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Female}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Female,
                          });
                        }}
                      />
                      <label htmlFor="man">Mujer</label>
                      <input
                        className="mx-4"
                        type="radio"
                        name={`gender${index}`}
                        checked={passenger.gender === Gender.Other}
                        onChange={() => {
                          setError({
                            ...errors,
                            gender: ""
                          })
                          setPassenger({
                            ...passenger,
                            gender: Gender.Other,
                          });

                        }}
                      />
                      <label htmlFor="other">Prefiero no decirlo</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="w-3/12"></div>
                <div className="w-9/12 px-4">
                  {isError(errors.gender) && (
                    <ErrorMessage field={errors.gender} />
                  )}
                </div>
              </div>
              <div>
                <Separator title="Datos de contacto" />
              </div>
              <div className="flex flex-row">
                <div className="w-1/2 flex flex-row">
                  <div className="w-1/3">
                    <div>
                      <Select
                        label="Código de Área"
                        errorField={errors.contact.phoneCode}
                        className={`
                                          ${isError(errors.contact.phoneCode)
                            ? "border-red-500 "
                            : ""
                          }`}
                        onChange={(e) => {
                          if (isError(errors.contact.phoneCode)) {
                            setError({
                              ...errors,
                              contact: {
                                ...errors.contact,
                                phoneCode: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            contact: {
                              ...passenger.contact,
                              phoneCode: e.target.value,
                            },
                          });
                        }}
                      >
                        <option defaultValue=""></option>
                        <option value="+54">(+54) ARG</option>
                        <option value="+55">(+55) BRA</option>
                        <option value="+56">(+56) CHI</option>
                        <option value="+598">(+598) URU</option>
                        <option value="+591">(+591) BOL</option>
                        <option value="+57">(+57) COL</option>
                        <option value="+58">(+58) VEN</option>
                        <option value="+593">(+593) ECU</option>
                        <option value="+595">(+595) PAR</option>
                      </Select>
                    </div>
                  </div>
                  <div className="w-3/4">
                    <div className="ml-2 mr-4">
                      <LabelInput
                        label=""
                        placeholder="Número de teléfono"
                        value={passenger.contact.phoneNumber}
                        errorField={errors.contact.phoneNumber}
                        onChange={(e: any) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/\D/g, '');
                          if (isError(errors.contact.phoneNumber)) {
                            setError({
                              ...errors,
                              contact: {
                                ...errors.contact,
                                phoneNumber: "",
                              },
                            });
                          }
                          setPassenger({
                            ...passenger,
                            contact: {
                              ...passenger.contact,
                              phoneNumber: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <LabelInput
                    label=""
                    type="text"
                    placeholder="Correo Electrónico"
                    value={passenger.contact.email}
                    errorField={errors.contact.email}
                    onChange={(e: any) => {
                      if (isError(errors.contact.email)) {
                        setError({
                          ...errors,
                          contact: {
                            ...errors.contact,
                            email: "",
                          },
                        });
                      }
                      setPassenger({
                        ...passenger,
                        contact: {
                          ...passenger.contact,
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </>
            {!isResponsible ? (
              <>
                <div className="flex items-center mt-5">
                  <input
                    type="checkbox"
                    className="px-2 h-5 w-5 accent-orange-500 rounded-md border-1 border-orange-500
                  focus:outline-none duration-500 hover:shadow-md "
                    checked={sameAddress}
                    onChange={handleSameAddress}
                  />
                  <label className="text-black p-2">
                    Es la dirección cargada para la salida
                  </label>
                </div>

              </>
            ) : null}

            {(isResponsible || !sameAddress) && (
              <div>
                <Separator title="Dirección (por donde pasaremos a buscarte)" />
                <div className="flex flex-row gap-2">
                  <div className="w-1/2">
                    <SearchAddresses
                      label="Dirección"
                      errorField={errors.contact.address.street}
                      onPlaceSelected={handleContactAddressSelected}
                      value={passenger.contact.address.street}
                      onChange={() => {
                        if (isError(errors.contact.address.street)) {
                          setError({
                            ...errors,
                            contact: {
                              ...errors.contact,
                              address: {
                                ...errors.contact.address,
                                street: "",
                              },
                            },
                          });
                        }
                      }}
                    />
                  </div>
                  <div className=" w-1/2">
                    <LabelInput
                      label=""
                      type="text"
                      placeholder="Depto./Timbre/Otro"
                      value={passenger.contact.address.other}
                      errorField={errors.contact.address.other}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              other: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="w-1/4">
                    <LabelInput
                      label=""
                      placeholder="Entre calle..."
                      value={passenger.contact.address.streetBetween1}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              streetBetween1: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="w-1/4">
                    <LabelInput
                      label=""
                      placeholder="Y calle..."
                      value={passenger.contact.address.streetBetween2}
                      onChange={(e: any) => {
                        setPassenger({
                          ...passenger,
                          contact: {
                            ...passenger.contact,
                            address: {
                              ...passenger.contact.address,
                              streetBetween2: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Accordion>

      }
    </div>
  );
}

