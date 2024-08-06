"use client";
import { useState, useEffect } from "react";
import HeaderAV, { OptionHeader } from "@/components/header";
import AVQRCode from "@/components/qrcode";
import Image from "next/image";

import minibus from "@/ui/icons/minibus.svg";
import download from "@/ui/icons/download.svg";
import share from "@/ui/icons/share.svg";
import { Ruda, Inter } from "next/font/google";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const ruda = Ruda({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };


function safeJsonParse(str: string | null): any | null {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export default function QR() {
  const [result, setResult] = useState<any>();
  useEffect(() => {
    const fetchInitialData = async () => {
      const form0 = safeJsonParse(localStorage.getItem("form0"));
      const form1 = safeJsonParse(localStorage.getItem("form1"));
      const form2 = safeJsonParse(localStorage.getItem("form2"));
      const posId = localStorage.getItem("posId");

      if (posId) {
        console.log(posId);
        return;
      } else if (form0 && form1) {
        const data = { form0, form1, form2 }
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
          setResult({ ...data, posId: json.data.insertedId });
        }
      }
    }
    fetchInitialData().catch(error => console.log(error))
  }, []);

  if (!result) {
    return <Spinner />;
  }
  const { departure, return: destiny, passengers } = result.form0;
  const responsable = result.form1.passengers[0];

  const handleDownload = () => { };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-300 max-h-screen">
        <div className=" bg-[#F4F4F7] w-full min-h-full flex flex-col">
          <HeaderAV />
          <OptionHeader
            departure={result.form0.departure}
            destiny={result.form0.return}
            passengers={result.form0.passengers}
            luggage={result.form0.luggage}
          />

          <div className="flex flex-col items-center justify-center h-full bg-gray-200 pb-10 pt-20">
            {/* TODO DEBE IR DENTRO DE ESTE CONTAINER */}

            <h1 className="w-[814px] text-left text-[36px] text-[#10004f]">
              <strong>Comprobante / eTicket</strong>
            </h1>
            <div className="w-[813px] h-auto bg-white my-6 rounded-lg shadow-lg">
              <div className="flex flex-row-w-full bg-[#3198A5] rounded-t-lg py-6 px-10">
                <p className="font-semibold text-white text-[24px] text-justify">
                  Recuerda cancelar el saldo del servicio antes de comenzar el
                  viaje. Podrás hacerlo ingresando mediante el código QR.
                </p>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/3 m-[60px]">
                  <div className="flex items-center bg-[#3198A5] h-[26px] w-[232px] mb-5">
                    <Image src={minibus} alt="minibus" className="mx-2" />
                    <p className="text-white font-semibold text-[14px]">
                      EN MINIBUS
                    </p>
                  </div>
                  <AVQRCode text={result.posId} />
                  <div className="my-5">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Código:
                    </p>
                    <p className="font-bold text-[24px]">
                      {result.posId.substring(0, 6)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-[60px]">
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Origen / Destino:
                    </p>
                    <p className="text-[28px] font-semibold text-[#10004f]">
                      {departure.address.split(",")[0]} /{" "}
                      {destiny.address.split(",")[0]}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Salida:
                    </p>
                    <p className="text-[32px] font-semibold text-[#10004f]">
                      {departure.date} / {departure.time}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Desde:
                    </p>
                    <p className="text-[22px] font-semibold text-[#10004f]">
                      {departure.address}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Pasajero responsable de Viaje:
                    </p>
                    <p className="text-[32px] font-semibold text-[#10004f]">
                      {responsable.firstName} {responsable.lastName}
                    </p>
                    <p className="text-[18px] font-semibold text-[#8B8B8B]">
                      {passengers.adult - 1} acompañante(s) {passengers.baby}{" "}
                      bebe(s) {passengers.pets.small + passengers.pets.big}{" "}
                      mascota(s)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mb-10 mt-6">
                <button className="outline-none border-2 border-orange-500 rounded-md h-[40px] inline-flex items-center px-6 mx-5">
                  Descargar
                  <Image src={download} alt="download" className="ml-2" />
                </button>
                <button className="outline-none border-2 border-orange-500 rounded-md h-[40px] inline-flex items-center px-6">
                  Compartir
                  <Image src={share} alt="share" className="ml-2" />
                </button>
              </div>
            </div>

            {/* FIN DEL CONTAINER */}
            <div className="font-bold text-orange-500 text-[18px]">
              <Link href="/booking" onClick={() => {
                  console.log("clean");
                  localStorage.removeItem("form0");
                  localStorage.removeItem("form1");
                  localStorage.removeItem("form2");
                  redirect("/booking")
                }}>Continuar en el sitio</Link>
            </div>

            <div className="">
              <pre>{JSON.stringify(result, null, 2)}</pre>
              <button
                onClick={() => {
                  console.log("clean");
                  localStorage.removeItem("form0");
                  localStorage.removeItem("form1");
                  localStorage.removeItem("form2");
                }}
              >
                Limpiar Codigo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
