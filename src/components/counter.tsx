'use client'
import Image from "next/image";
import { useState } from "react";
import icons from "@/ui/icons";
import { isError } from "./ErrorMessage";

enum IconPeopleType {
  Adult = "adult",
  Child = "child",
  PuppieSmall = "puppieSmall",
  PuppieBig = "puppieBig",
  Baby = "baby",
}
enum IconBagType {
  Carry = "carry",
  Bag = "bag",
  Special = "special",
}

export type IconType = IconPeopleType | IconBagType;

function AVCounterIcon({ icon, className = '' }: { icon: IconType, className?: string }) {
  return (
    <Image
      src={icons[icon as string]}
      alt={icon as string}
      width={42}
      height={42}
      className={`p-1 ${className}`}
    />
  );
}

export default function AVCounter(
  { icon, title, subtitle, alert = false, value, handleValue, errorField }:
    { icon: IconType, title: string, subtitle: string, alert?: boolean, value: number, handleValue: Function, errorField: string | undefined }
) {
  // const [count, setCount] = useState(0);
  const increment = () => handleValue(value + 1 > 0 ? value + 1 : 0);
  const decrement = () => handleValue(value - 1 > 0 ? value - 1 : 0);

  return (
    <div className={`flex flex-row w-full h-full justify-center  py-2 px-2 items-center border border-gray-300 rounded-lg hover:shadow-md duration-500 focus:border-gray-500 outline-none ${isError(errorField) ? "border-red-500" : ""
      }`}>
      <div className="flex flex-col items-center m-auto">
        <AVCounterIcon icon={icon} className="w-10 h-10" />
      </div>
      <div className="flex flex-col w-[50%] justify-center">
        <div className="flex flex-row">
          <p className={`text-[16px] font-semibold}`}>{title}</p>
        </div>
        <div className="flex flex-row items-start">
          {
            alert && <AVCounterIcon icon={'exclamation' as IconType} className="w-6 h-6" />
          }
          <p className="text-[10px] font-semibold text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-[35%]">
        <div className="flex flex-row items-center justify-center">
          <button
            className="w-7 h-7 rounded-full border border-orange-500 text-[20px] shadow-md bg-transparent text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              decrement();
            }}
          > - </button>
          <span className="w-[40px] text-center text-[20px]">  
            {value}
          </span>
          <button
            className=" w-7 h-7 rounded-full border border-orange-500 text-[20px] shadow-md bg-transparent text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              increment();
            }}
          > + </button>
        </div>
      </div>
    </div>
  )
}

