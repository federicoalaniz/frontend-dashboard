"use client";
import { useState, useEffect } from "react";
import CardOption, { IconType } from "@/components/card";
import HeaderAV, { OptionHeader } from "@/components/header";
import { driverPrice, driverQuantitys, foodExpenses, lodgingExpenses } from "@/utils/pricing";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { RenderAdults, RenderBigBags, RenderLittleBags, RenderSpecialLuggage } from "@/components/RenderPaxLuggage";
import { formatAddress } from "@/utils/basics";

const options = [
  {
    id: "cronos4",
    cant_handBag: 4,
    cant_bag: 2,
    cant_littleBag: 3,
    name: "Fiat Cronos",
    seats: 3,
    car_img: "cronos" as IconType,
    price: 340,
    driverFee: 10,
    quantity: 0,
    cant_adults: 3,
    cant_kid: 3,
    cant_babies: 3,
  },
  {
    id: "sharan7",
    cant_handBag: 7,
    cant_bag: 3,
    cant_littleBag: 6,
    name: "Volkswagen Sharan",
    seats: 6,
    car_img: "sharan" as IconType,
    price: 360,
    driverFee: 12,
    quantity: 0,
    cant_adults: 6,
    cant_kid: 6,
    cant_babies: 6,
  },
  {
    id: "sprinter19",
    cant_handBag: 19,
    cant_bag: 15,
    cant_littleBag: 15,
    name: "Mercedes Benz Sprinter",
    seats: 19,
    car_img: "sprinter" as IconType,
    price: 500,
    driverFee: 20,
    quantity: 0,
    cant_adults: 19,
    cant_kid: 19,
    cant_babies: 19,
  },
  {
    id: "iveco24",
    cant_handBag: 24,
    cant_bag: 15,
    cant_littleBag: 24,
    name: "Iveco",
    seats: 24,
    car_img: "iveco24" as IconType,
    price: 520,
    driverFee: 22,
    quantity: 0,
    cant_adults: 24,
    cant_kid: 24,
    cant_babies: 24,
  },
  {
    id: "bus45",
    cant_handBag: 45,
    cant_bag: 45,
    cant_littleBag: 90,
    name: "Bus 45",
    seats: 45,
    car_img: "bus45" as IconType,
    price: 620,
    driverFee: 30,
    quantity: 0,
    cant_adults: 45,
    cant_kid: 45,
    cant_babies: 45,
  },
  {
    id: "bus60",
    cant_handBag: 60,
    cant_bag: 60,
    cant_littleBag: 120,
    name: "Bus 60",
    seats: 60,
    car_img: "bus60" as IconType,
    price: 680,
    driverFee: 35,
    quantity: 0,
    cant_adults: 60,
    cant_kid: 60,
    cant_babies: 60,
  },
];

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

export default function TravelOptions() {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  const [result, setResult] = useState<any>();
  const [vehicles, setVehicles] = useState(options);

  const [distanciaIda, setDistanciaIda] = useState(0);
  const [distanciaVuelta, setDistanciaVuelta] = useState(0);
  const [travelTime, setTravelTime] = useState(0)

  const [totalSeatsNeeded, setTotalSeatsNeeded] = useState(0);
  const [adultsSeatsNeeded, setAdultsSeatsNeeded] = useState(0);
  const [kidsSeatsNeeded, setKidsSeatsNeeded] = useState(0);
  const [babiesSeatsNeeded, setBabiesSeatsNeeded] = useState(0);
  const [bigBagsNeeded, setBigBagsNeeded] = useState(0);
  const [littleBagsNeeded, setLittleBagsNeeded] = useState(0);

  const [fulltime, setFulltime] = useState(false);
  const [initDate, setInitDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [disabled, setDisabled] = useState(false);


  const FOOD_PRICE = 10000
  const LODGING_PRICE = 30000


  useEffect(() => {
    const form0 = JSON.parse(localStorage.getItem("form0") || "");
    if (form0) {
      setResult({ form0 });
      setTotalSeatsNeeded(
        form0.passengers.adult +
        form0.passengers.kid +
        form0.passengers.pets.big,
      );
      setAdultsSeatsNeeded(form0.passengers.adult)
      setKidsSeatsNeeded(form0.passengers.kid)
      setBabiesSeatsNeeded(form0.passengers.baby)
      setBigBagsNeeded(form0.luggage.bag23)
      setLittleBagsNeeded(form0.luggage.carryOn)
      setFulltime(form0.fullTime)
      setInitDate(new Date((form0.departure.date + "T" + form0.departure.time + ":00")))
      setEndDate(new Date((form0.return.date + "T" + form0.return.time + ":00")))
    }

    const fetchDistance = async () => {
      const result = await fetch(`${APIBASE}/gmaps/distance`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          places: [form0.departure.address, form0.return.address],
        }),
      });
      const json = await result.json();
      const { data } = json;
      const dis = data
        .map(({ distance }: any) => distance.value)
        .reduce((a: number, b: number) => a + b);
      const dur = data
        .map(({ duration }: any) => duration.value)
        .reduce((a: number, b: number) => a + b);
      setDistanciaIda(dis / 1000);
      setDistanciaVuelta(dis / 1000);
      setTravelTime(dur);
    };
    fetchDistance().catch(console.log);
  }, []);


  if (!result) {
    return <Spinner />;
  }

  const distanciaTotal = distanciaIda + distanciaVuelta;

  const vehiclesCost = vehicles.map(
    ({ price, quantity }) => price * distanciaTotal * quantity,
  );


  const travelExpenses = (foodPrice: number, lodgingPrice: number): number => {
    // si fulttime = true; 1 comida cada 12 hs por chofer; 1 hospedaje por dia por chofer;
    if (fulltime)
      return lodgingExpenses(initDate!, endDate!, lodgingPrice) + foodExpenses(initDate!, endDate!, foodPrice)
    return 0
  }
  const viaticos: number = travelExpenses(FOOD_PRICE, LODGING_PRICE)

  const driversCost = vehicles.map(
    ({ quantity, id, driverFee }) =>
      quantity *
      driverPrice(
        driverFee,
        id,
        distanciaTotal,
        driverQuantitys(id, distanciaIda),
      ),
  );

  const totalCost = vehiclesCost.concat(driversCost).reduce((a, b) => a + b);

  const handleDisableButton = ():boolean | undefined => {
    if (totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0) {
      return true
    }
    return false
  }

  const vehicleTravelDuration = travelTime;
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-300 h-full">
        <div className=" bg-[#F4F4F7] w-[1280px] min-h-full flex flex-col">
          <HeaderAV />
          <OptionHeader
            departure={result.form0.departure}
            destiny={result.form0.return}
            passengers={result.form0.passengers}
            luggage={result.form0.luggage}
          />
          <div className="flex flex-row justify-center h-full bg-gray-200 pb-10 pt-20">
            <div className="flex flex-col items-start">
              <h1 className="text-[36px] text-black">
                <strong>Selecciona tipo</strong> y <strong>cantidad</strong>
              </h1>
              {options.map((option, index) => {
                return (
                  <CardOption
                    key={option.id}
                    vehicle={vehicles[index]}
                    totalSeatsNeeded={totalSeatsNeeded}
                    setTotalSeatsNeeded={setTotalSeatsNeeded}
                    bigBagsNeeded={bigBagsNeeded}
                    setBigBagsNeeded={setBigBagsNeeded}
                    littleBagsNeeded={littleBagsNeeded}
                    setLittleBagsNeeded={setLittleBagsNeeded}
                    setVehicle={(newVehicle: any) => {
                      const newListVehicle = vehicles.map((vehicle) =>
                        vehicle.id === newVehicle.id ? newVehicle : vehicle,
                      );
                      setVehicles(newListVehicle);
                    }}
                  />
                );
              })}
            </div>

            <div className="ml-10 w-[345px]">
              <h1 className="text-[36px] text-black">Resumen</h1>
              <div className="flex flex-col bg-white text-gray-500 font-medium justify-end rounded-md my-5 px-5 pb-5 shadow-lg text-xs">
                <div>
                  <div className="flex gap-2 border-b-[1px] border-gray-300 mt-4 text-[#10004f]">
                    <h1 className="flex font-bold">Pasajeros</h1>
                    <div>
                      <h1 className="flex text-gray-500 font-semibold">
                        {`
                        ${result.form0.passengers.adult +
                          result.form0.passengers.kid +
                          result.form0.passengers.baby} 
                        pasajeros / ${result.form0.passengers.adult +
                          result.form0.passengers.kid +
                          result.form0.passengers.pets.big} asientos
                        `}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="mt-5">
                      <div>
                        <RenderAdults
                          total={result.form0.passengers.adult +
                            result.form0.passengers.kid +
                            result.form0.passengers.pets.big}
                          asignado={result.form0.passengers.adult +
                            result.form0.passengers.kid +
                            result.form0.passengers.pets.big - totalSeatsNeeded} />
                      </div>
                      {
                        result.form0.passengers.adult > 1
                          ? <p>{result.form0.passengers.adult} Adultos</p>
                          : result.form0.passengers.adult === 1
                            ? <p>{result.form0.passengers.adult} Adulto</p>
                            : null
                      }
                      {
                        result.form0.passengers.kid > 1
                          ? <p>{result.form0.passengers.kid} Niños</p>
                          : result.form0.passengers.kid === 1
                            ? <p>{result.form0.passengers.kid} Niño</p>
                            : null
                      }
                      {
                        result.form0.passengers.baby > 1
                          ? <p>{result.form0.passengers.baby} Bebés (en falda)</p>
                          : result.form0.passengers.baby === 1
                            ? <p>{result.form0.passengers.baby} Bebé (en falda)</p>
                            : null
                      }
                      {
                        result.form0.passengers.pets.big > 1
                          ? <p>{result.form0.passengers.pets.big} Mascotas grandes</p>
                          : result.form0.passengers.pets.big === 1
                            ? <p>{result.form0.passengers.pets.big} Mascota grande</p>
                            : null
                      }
                      {
                        result.form0.passengers.pets.small > 1
                          ? <p>{result.form0.passengers.pets.small} Mascotas pequeñas</p>
                          : result.form0.passengers.pets.small === 1
                            ? <p>{result.form0.passengers.pets.small} Mascota pequeña (en falda)</p>
                            : null
                      }
                    </div>
                  </div>
                </div>
                <div>
                  <div className="border-b-[1px] border-gray-300  mt-4 text-[#10004f]">
                    <h1 className="font-bold">Equipaje</h1>
                  </div>
                  <div className="mt-5 ">
                    <div>
                      <RenderBigBags total={result.form0.luggage.bag23} asignado={result.form0.luggage.bag23 - bigBagsNeeded} />
                      <RenderLittleBags total={result.form0.luggage.carryOn} asignado={result.form0.luggage.carryOn - littleBagsNeeded} />
                      <RenderSpecialLuggage total={result.form0.luggage.special.quantity} asignado={0} />
                    </div>
                    {result.form0.luggage.bag23 +
                      result.form0.luggage.carryOn +
                      result.form0.luggage.special.quantity ===
                      0 ? (
                      <p className="">Sin equipaje</p>
                    ) : null}
                    {
                      result.form0.luggage.bag23 > 1
                        ? <p>{result.form0.luggage.bag23} Valijas grandes 23 Kg</p>
                        : result.form0.luggage.bag23 === 1
                          ? <p>{result.form0.luggage.bag23} Valija grande 23 Kg</p>
                          : null
                    }

                    {
                      result.form0.luggage.carryOn > 1
                        ? <p>{result.form0.luggage.carryOn} Valijas medianas 15 Kg</p>
                        : result.form0.luggage.carryOn === 1
                          ? <p>{result.form0.luggage.carryOn} Valija mediana 15 Kg</p>
                          : null
                    }
                    {
                      result.form0.luggage.special.quantity > 1
                        ? <p>{result.form0.luggage.special.quantity} Equipajes especiales</p>
                        : result.form0.luggage.special.quantity === 1
                          ? <p>{result.form0.luggage.special.quantity} Equipaje especial</p>
                          : null
                    }
                  </div>
                </div>
                <div>
                  <div className="border-b-[1px] border-gray-300  mt-4 text-[#10004f] flex justify-between">
                    <h1 className="font-bold">Trayecto</h1>
                    <h1 className="font-semibold text-gray-500">
                      {result.form0.tripType.roundTrip ? (
                        <>Ida y vuelta</>
                      ) : (
                        <>Ida</>
                      )}
                    </h1>
                  </div>
                  <div className="mt-1 mb-5">
                    <p className=" ">
                      {`${formatAddress(result.form0.departure.address)} - ${formatAddress(result.form0.return.address)}`}
                    </p>
                  </div>
                  <div>
                    <p>{distanciaIda} Km tramo de ida</p>
                    {result.form0.tripType.roundTrip ? (
                      <p>{distanciaVuelta} Km tramo vuelta</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="border-b-[1px] border-gray-300  mt-4 text-[#10004f] flex justify-between">
                    <h1 className="font-bold">Vehículos</h1>
                  </div>
                  <div className="flex flex-col justify-between mt-5  ">
                    {vehicles.map((vehicle, index) =>
                      vehicle.quantity ? (
                        <div
                          className="flex flex-row justify-between"
                          key={index}
                        >
                          <p>
                            {vehicle.quantity} {vehicle.name} x {distanciaTotal}
                            Km
                          </p>
                          <span className="font-semibold">
                            {vehiclesCost[index].toLocaleString('es-AR', { style: 'currency', currency: "ARS" })}
                          </span>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>

                <div>
                  <div className="border-b-[1px] border-gray-300  mt-4 text-[#10004f] flex justify-between">
                    <h1 className="font-bold">Choferes</h1>
                  </div>
                  <div className="mt-1 mb-5  ">
                    {distanciaTotal > 600 ? (
                      <p>+ 600 Km por regulación</p>
                    ) : null}
                  </div>
                  <div className="mt-5  ">
                    <div className="flex flex-col justify-between ">
                      {vehicles.map((vehicle, index) =>
                        vehicle.quantity ? (
                          <>
                            <div
                              className="flex flex-row justify-between"
                              key={index}
                            >
                              <p>
                                {driverQuantitys(vehicle.id, distanciaTotal)}{" "}
                                Choferes calificados
                              </p>
                              <span className="font-semibold">
                                {driversCost[index].toLocaleString('es-AR', { style: 'currency', currency: "ARS" })}
                              </span>
                            </div>
                            {viaticos > 0 &&
                              <div
                                className="flex flex-row justify-between"
                                key={index}
                              >
                                <p>
                                  Viáticos
                                </p>
                                <span className="font-semibold">
                                  {(viaticos * driverQuantitys(vehicle.id, distanciaTotal)).toLocaleString('es-AR', { style: 'currency', currency: "ARS" })}
                                </span>
                              </div>
                            }
                          </>
                        ) : null
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-baseline font-bold text-[#10004f] border-t-[1px] border-gray-300 mt-3 py-2">
                    <p>Total</p>
                    <p className="text-xl">{totalCost.toLocaleString('es-AR', { style: 'currency', currency: "ARS" })}</p>
                  </div>
                </div>


                <div className="mt-[120px]">
                  <button
                    className="w-full"
                    onClick={() => {
                      localStorage.setItem(
                        "form2",
                        JSON.stringify({
                          vehicles,
                          totalCost,
                          vehiclesCost,
                          driversCost,
                          viaticos,
                          vehicleTravelDuration
                        }),
                      );
                      redirect("/booking/checkout");
                    }}
                    disabled = { !(totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0) }

                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
