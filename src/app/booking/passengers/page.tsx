"use client";
import { useEffect, useState } from "react";
import HeaderAV from "@/components/header";
import Hero from "@/components/hero";
import { PassengerDataProvider } from "@/state/booking/PassengerContext";
import FormPassengersData from "@/components/FormPassengersData";
import { useRouter } from "next/navigation";

export default function Passengers() {
  const [passengers, setPassengers] = useState<number>(0);
    
  useEffect(() => {
    const form0Data = JSON.parse(localStorage.getItem("form0") || "");
    if (form0Data) {
      const ps = form0Data.passengers.adult + form0Data.passengers.kid + form0Data.passengers.baby;
      setPassengers(ps);
    } 
  }, []);


  if (passengers < 1) {
    return <div> ... </div>;
  }

  return (
    <>
      <div className="flex flex-col items-center bg-gray-300 h-full">
        <div className=" bg-[#F4F4F7] w-[1280px] flex flex-col h-full">
          <HeaderAV />
          <div className="flex flex-col items-center justify-center h-full">
            <Hero />
            <div
              className="bg-white rounded-md shadow-lg flex flex-col items-center 
              -mt-20 mb-10 border border-solid w-3/4"
            >
              <h3 className="font-bold text-[#10004F] text-[32px] my-6 w-10/12">
                Datos de los pasajeros
              </h3>
              <PassengerDataProvider>
                <FormPassengersData passengers={passengers} />
              </PassengerDataProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
