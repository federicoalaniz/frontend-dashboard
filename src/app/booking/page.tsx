'use client'
import Hero from "@/components/hero";
import HeaderAV from "@/components/header";
import AVForm from "@/components/form";
import { TripProvider } from "@/state/booking/TripContext";
import { createTimeCheck } from "@/utils/basics";
import { useEffect } from "react";

export default function Booking() {
  useEffect(() => {
    createTimeCheck()
  }, []) 
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-300 h-full">
      <div className=" bg-[#F4F4F7] w-[1280px] min-h-full flex flex-col">
        <HeaderAV />
        <div className="flex flex-col items-center justify-center">
          <Hero />
          <TripProvider>
            <AVForm />
          </TripProvider>
        </div>
      </div>
    </div>
  );
}
