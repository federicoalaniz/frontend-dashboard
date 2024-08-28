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

let options = [
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
    nominal_data: {
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
    }
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
    nominal_data: {
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
    }
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
    nominal_data: {
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
    }
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
    nominal_data: {
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
    }
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
    nominal_data: {
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
    }
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
    nominal_data: {
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

  const [fulltime, setFulltime] = useState(false);
  const [initDate, setInitDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const hasExecutedRef = useRef(false);



  const FOOD_PRICE = 10000;
  const LODGING_PRICE = 30000;

  let initialSeatsNeeded = 0;
  let initialBigBagsNeeded = 0;
  let initialLittleBagsNeeded = 0

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

          option.seats -= asientosNecesarios;  // Reducir los asientos necesarios
          option.cant_bag += asientosSobrantes;  // Sumar los asientos sobrantes a las bolsas grandes
          option.cant_littleBag += asientosSobrantes * 2;  // Sumar los asientos sobrantes multiplicados por 2 a las bolsas pequeñas
        }
      });

      hasExecutedRef.current = true;
    }

    let quantityVehicles = 0
    vehicles.map((vehicle) => {
      quantityVehicles += vehicle.quantity
    })
    console.log(quantityVehicles)
  }, []);

  if (!result) {
    return <Spinner />;
  }

  initialSeatsNeeded = result.form0.passengers.adult + result.form0.passengers.kid + result.form0.passengers.pets.big
  initialBigBagsNeeded = result.form0.luggage.bag23
  initialLittleBagsNeeded = result.form0.luggage.carryOn
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
              { (totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0) 
                  ? null
                  : (totalSeatsNeeded === initialSeatsNeeded  && bigBagsNeeded === initialBigBagsNeeded && littleBagsNeeded === initialLittleBagsNeeded)
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
                ? 'bg-[#D3F2DE] border-green-500 border' 
                : (totalSeatsNeeded === initialSeatsNeeded  && bigBagsNeeded === initialBigBagsNeeded && littleBagsNeeded === initialLittleBagsNeeded) 
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
                                {`${vehicle.quantity * driverQuantitys(vehicle.id, distanciaTotal)} Choferes calificados`}
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
                    disabled={!(totalSeatsNeeded <= 0 && bigBagsNeeded <= 0 && littleBagsNeeded <= 0)}
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
