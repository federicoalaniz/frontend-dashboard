"use client";
import { useState, useEffect, useRef } from "react";
import CardOption, { IconType } from "@/components/card";
import HeaderAV, { OptionHeader } from "@/components/header";
import { driverPrice, driverQuantitys, foodExpenses, lodgingExpenses } from "@/utils/pricing";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { RenderAdults, RenderBigBags, RenderLittleBags, RenderSpecialLuggage } from "@/components/RenderPaxLuggage";
import { formatAddress } from "@/utils/basics";
import { RedAlert } from "@/components/alert";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { BackButton } from "@/components/button";

let options = [
  {
    id: "cronos4",
    cant_handBag: 4,
    cant_bag: 2,
    cant_littleBag: 3,
    cant_special: 1,
    name: "Fiat Cronos",
    seats: 3,
    car_img: "cronos" as IconType,
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
    car_img: "sharan" as IconType,
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
    car_img: "sprinter" as IconType,
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
    car_img: "iveco24" as IconType,
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
    car_img: "bus45" as IconType,
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
    car_img: "bus60" as IconType,
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
  const [bigBagsNeeded, setBigBagsNeeded] = useState(0);
  const [littleBagsNeeded, setLittleBagsNeeded] = useState(0);
  const [specialLuggageNeeded, setSpecialLuggageNeeded] = useState(0);

  const [fulltime, setFulltime] = useState(false);
  const [initDate, setInitDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const hasExecutedRef = useRef(false);



  const FOOD_PRICE = 10000;
  const LODGING_PRICE = 30000;

  let initialSeatsNeeded = 0;
  let initialBigBagsNeeded = 0;
  let initialLittleBagsNeeded = 0;
  let initialSpecialLugagggeNeeded = 0;

  useEffect(() => {
    const form0 = JSON.parse(localStorage.getItem("form0") || "");
    if (form0) {
      setResult({ form0 });
      setTotalSeatsNeeded(
        form0.passengers.adult +
        form0.passengers.kid +
        form0.passengers.pets.big
      );
      setBigBagsNeeded(form0.luggage.bag23);
      setLittleBagsNeeded(form0.luggage.carryOn);
      setSpecialLuggageNeeded(form0.luggage.special.quantity);
      setFulltime(form0.fullTime);
      setInitDate(new Date((form0.departure.date + "T" + form0.departure.time + ":00")));
      setEndDate(new Date((form0.return.date + "T" + form0.return.time + ":00")));

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

    const asientosNecesarios = form0.passengers.adult + form0.passengers.kid + form0.passengers.pets.big
    if (!hasExecutedRef.current) {
      options.map((option) => {
        if (option.seats > asientosNecesarios) {
          const asientosSobrantes = option.seats - asientosNecesarios;

          option.seats -= asientosSobrantes;  // Reducir los asientos necesarios
          option.cant_bag += asientosSobrantes;  // Sumar los asientos sobrantes a las bolsas grandes
          option.cant_littleBag += asientosSobrantes * 2;  // Sumar los asientos sobrantes multiplicados por 2 a las bolsas pequeñas
          asientosSobrantes % 2 === 0 ? option.cant_special += asientosSobrantes / 2 : null // Cada equipaje especial requiere de 2 asientos libres

        }
      });

      hasExecutedRef.current = true;
    }

    let quantityVehicles = 0
    vehicles.map((vehicle) => {
      quantityVehicles += vehicle.quantity
    })
  }, []);

  if (!result) {
    return <Spinner />;
  }

  initialSeatsNeeded = result.form0.passengers.adult + result.form0.passengers.kid + result.form0.passengers.pets.big
  initialBigBagsNeeded = result.form0.luggage.bag23
  initialLittleBagsNeeded = result.form0.luggage.carryOn
  initialSpecialLugagggeNeeded = result.form0.luggage.special.quantity
  const distanciaTotal = distanciaIda + distanciaVuelta;

  const vehiclesCost = vehicles.map(
    ({ price_less_15, price_15_to_50, price_50_to_100, price_100_to_600, price_more_600, quantity }) => {
      if (distanciaTotal < 15 ){
        // console.log({price_less_15})
        return price_less_15 * distanciaTotal * quantity
      }
      if (distanciaTotal >= 15 && distanciaTotal < 50){
        // console.log({price_15_to_50})
        return price_15_to_50 * distanciaTotal * quantity
      }
      if (distanciaTotal >= 50 && distanciaTotal < 100){
        // console.log({price_50_to_100})
        return price_50_to_100 * distanciaTotal * quantity
      }
      if (distanciaTotal >= 100 && distanciaTotal < 600){
        // console.log({price_100_to_600})
        return price_100_to_600 * distanciaTotal * quantity
      }
      // console.log({price_more_600})
      return price_more_600 * distanciaTotal * quantity
    }
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

  const vehicleTravelDuration = travelTime + (result.form0.departure.stops -1) * 60 * 10; // cada parada adicional agrega una demora de 10 minutos - (60 seg * 10 minutos)

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
              <div
                className="flex text-orange-500 font-semibold items-center mr-5 cursor-pointer gap-2"
                onClick={() => redirect("/booking/passengers")}
              >
                <ArrowLeftIcon className="size-5" /> <p className="mr-4">Volver</p>
                <h1 className="text-[36px] text-black font-normal">
                  <strong>Selecciona tipo</strong> y <strong>cantidad</strong>
                </h1>
              </div>

              {(totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0 && specialLuggageNeeded <= 0)
                ? null
                : (totalSeatsNeeded === initialSeatsNeeded && bigBagsNeeded === initialBigBagsNeeded && littleBagsNeeded === initialLittleBagsNeeded && specialLuggageNeeded === initialSpecialLugagggeNeeded)
                  ? null
                  :
                  <RedAlert className="mt-5">
                    Los vehículos seleccionados no son suficientes para la cantidad de pasajeros y equipaje <br />ingresado. <strong>Ajuste el tipo o cantidad de vehículos por favor.</strong>
                  </RedAlert>

              }
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
                    specialLuggageNeeded={specialLuggageNeeded}
                    setSpecialLuggageNeeded={setSpecialLuggageNeeded}
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
              <div className={`flex flex-col bg-white text-gray-500 font-medium justify-end rounded-t-md mt-5 px-5 pb-5 shadow-lg text-xs 
              ${(totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0)
                  ? 'bg-green-200 border-green-500 border'
                  : (totalSeatsNeeded === initialSeatsNeeded && bigBagsNeeded === initialBigBagsNeeded && littleBagsNeeded === initialLittleBagsNeeded && specialLuggageNeeded === initialSpecialLugagggeNeeded)
                    ? ''
                    : 'bg-yellow-100 border-orange-400 border'}`}>
                <div>
                  <div className="flex gap-2 border-b-[1px] border-gray-300 mt-4 text-[#10004f]">
                    <h1 className="flex font-bold">Pasajeros</h1>
                    <div>
                      <h1 className="flex text-gray-500 font-semibold">
                        {`
                        ${result.form0.passengers.adult +
                          result.form0.passengers.kid +
                          result.form0.passengers.baby} 
                        pasajeros | ${result.form0.passengers.adult +
                          result.form0.passengers.kid +
                          result.form0.passengers.pets.big} asientos
                        `}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="mt-5 font-semibold text-gray-600">
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
                  <div className="mt-5 font-semibold text-gray-600">
                    <div>
                      {
                        result.form0.luggage.bag23 > 0
                        && <RenderBigBags total={result.form0.luggage.bag23} asignado={result.form0.luggage.bag23 - bigBagsNeeded} />
                      }
                      {
                        result.form0.luggage.carryOn > 0
                        && <RenderLittleBags total={result.form0.luggage.carryOn} asignado={result.form0.luggage.carryOn - littleBagsNeeded} />
                      }
                      {
                        result.form0.luggage.special.quantity > 0
                        && <RenderSpecialLuggage total={result.form0.luggage.special.quantity} asignado={result.form0.luggage.special.quantity - specialLuggageNeeded} />
                      }
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
              </div>
              {/* ============================================================== */}
              <div className="flex flex-col bg-white text-gray-500 font-medium justify-end rounded-b-md px-5 pb-5 shadow-lg text-xs">
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
                  <div className="font-semibold text-gray-600">
                    <p>{`${Math.round(distanciaIda)} Km tramo de ida`}</p>
                    {result.form0.tripType.roundTrip ? (
                      <p>{`${Math.round(distanciaVuelta)} Km tramo vuelta`}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="border-b-[1px] border-gray-300  mt-4 text-[#10004f] flex justify-between">
                    <h1 className="font-bold">Vehículos</h1>
                  </div>
                  <div className="flex flex-col justify-between mt-5 font-semibold text-gray-600 ">
                    {vehicles.map((vehicle, index) =>
                      vehicle.quantity ? (
                        <div
                          className="flex flex-row justify-between"
                          key={index}
                        >
                          <p>
                            {`${vehicle.quantity} ${vehicle.name} x ${Math.round(distanciaTotal)} Km`}
                          </p>
                          <span className="font-semibold text-gray-600">
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
                      <p>{`Por regulación CNRT, los vehículos de 19 o más pax en tramos de más de 600 Km de ida deben contar con un segundo chofer`}</p>
                    ) : null}
                  </div>
                  <div className="mt-5 font-semibold text-gray-600">
                    <div className="flex flex-col justify-between ">
                      {vehicles.map((vehicle, index) =>
                        vehicle.quantity ? (
                          <>
                            <div
                              className="flex flex-row justify-between"
                              key={index}
                            >
                              <p>
                                {vehicle.quantity * driverQuantitys(vehicle.id, distanciaTotal) === 1 ? `${vehicle.quantity * driverQuantitys(vehicle.id, distanciaTotal)} Chofer calificado (${vehicle.name})` : `${vehicle.quantity * driverQuantitys(vehicle.id, distanciaTotal)} Choferes calificados (${vehicle.name})`}
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
                    disabled={!(totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0 && specialLuggageNeeded <= 0)}
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
