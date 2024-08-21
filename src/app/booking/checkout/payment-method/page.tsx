"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderAV, { OptionHeader } from "@/components/header";
import Image from "next/image";
import { Ruda, Inter } from "next/font/google";
import Link from "next/link";
import LabelInput from "@/components/input";

import cardxl from "@/ui/icons/card_xl.svg";

import cards from "@/ui/icons/cards.svg";
import { CardPaymentMethod } from "@/components/card";
import { IconType } from "@/components/card";
import Spinner from "@/components/Spinner";

const ruda = Ruda({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

export default function PaymentMethod() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const form0 = JSON.parse(localStorage.getItem("form0") || "");
    const form1 = JSON.parse(localStorage.getItem("form1") || "");
    const form2 = JSON.parse(localStorage.getItem("form2") || "");
    const form3 = JSON.parse(localStorage.getItem("form3") || "");
    if (form0 && form1 && form2 && form3) {
      setData({ form0, form1, form2, form3 });
    }
  }, []);
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  if (!data) {
    return <Spinner/>;
  }

  const handleContinuar = async () => {
    if (!localStorage.getItem('form0')) {
      redirect('/booking')
    } else {
      const result = await fetch(`${APIBASE}/api/products`, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer zxcvbnm",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await result.json();
  
      if (json.data) {
        localStorage.setItem("posId", json.data.insertedId);
        redirect("/booking/checkout/qr");
        return;
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-300 max-h-screen">
        <div className=" bg-[#F4F4F7] w-full min-h-full flex flex-col">
          <HeaderAV />
          <OptionHeader
            departure={data.form0.departure}
            destiny={data.form0.return}
            passengers={data.form0.passengers}
            luggage={data.form0.luggage}
          />

          <div className="flex flex-col items-center justify-center h-full bg-gray-200 pb-10 pt-20">
            <h1 className="w-[814px] h-full text-left text-[36px] text-[#10004f]">
              <strong>Pago</strong>
            </h1>
            <div className="flex flex-row w-[813px] bg-white my-6 rounded-lg shadow-lg">
              {/* COLUMNA 1 */}
              <div className="flex flex-col mx-4 w-1/2 my-6 ">
                <div className="flex flex-row justify-between">
                  <div className={`${ruda.className} font-bold text-[16px]`}>
                    <p>Estás pagando en:</p>
                  </div>
                  <div className={`${ruda.className} font-bold text-[16px]`}>
                    <p>Monto a pagar:</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-[18px] text-[#10004f] font-bold">
                    <p>RUGGERI TURISMO</p>
                  </div>
                  <div className="text-[26px] text-[#10004f] font-bold">
                    <p>{data.form3.amount.toLocaleString('es-AR', {style: 'currency', currency:  "ARS"})}</p>
                  </div>
                </div>
                <div className="flex flex-row mt-10">
                  <div className="">
                    <div className={`${ruda.className} font-bold text-[16px]`}>
                      <p>Selecciona tu medio de pago:</p>
                    </div>
                  </div>
                </div>
                <div>
                  <CardPaymentMethod
                    icon={"card" as IconType}
                    title="Tarjetas"
                    subtitle="Crédito, débito, prepago"
                  />
                  <CardPaymentMethod
                    icon={"mp" as IconType}
                    title="Mercado Pago"
                    subtitle="y otras billeteras virtuales"
                  />
                </div>
                <div className="flex justify-center items-center mt-6">
                  <div className="flex items-center justify-center">
                    <Link href="#" className="text-[#2174A6] font-bold">
                      Anular compra y volver
                    </Link>
                  </div>
                </div>
              </div>{" "}
              {/* FIN DE COLUMNA 1 */}
              {/* COLUMNA 2 */}
              <div className="flex flex-col mx-4 mt-6 mb-10 w-1/2 ">
                <div className="flex mt-[103px] justify-center">
                  <div
                    className={`${ruda.className} font-bold text-[16px] text-center`}
                  >
                    <p>Ingresa los datos de tu tarjeta:</p>
                  </div>
                </div>
                <div className="flex justify-center mt-2 mb-4">
                  <Image src={cardxl} alt="cardxl" />
                </div>
                <div>
                  <LabelInput
                    type="text"
                    label="Número de tarjeta"
                    placeholder="Número de tarjeta"
                  />
                </div>
                <div>
                  <button onClick={handleContinuar} className="w-full ">
                    Continuar
                  </button>
                  <Image src={cards} alt="cards" />
                </div>
              </div>
              {/* FIN COLUMNA 2 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
