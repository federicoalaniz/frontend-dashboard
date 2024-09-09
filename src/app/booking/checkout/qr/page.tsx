"use client";
import { useState, useEffect, Suspense } from "react";
import HeaderAV, { OptionHeader } from "@/components/header";
import AVQRCode from "@/components/qrcode";
import Image from "next/image";

import minibus from "@/ui/icons/minibus.svg";
import download from "@/ui/icons/download.svg";
import share from "@/ui/icons/share.svg";
import { Ruda } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import { formatAddress, formatDate } from "@/utils/basics";

const ruda = Ruda({ subsets: ["latin"] });

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

const MENSAJE_SALDO = "Recuerda cancelar el saldo del servicio antes de comenzar el viaje. Podrás hacerlo ingresando mediante el código QR."

function safeJsonParse(str: string | null): any | null {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function QRContent() {
  const [result, setResult] = useState<any>();
  const [idAlreadyExists, setIdAlreadyExists] = useState(false)

  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('status');
  console.log({ paymentStatus });

  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const form0 = safeJsonParse(localStorage.getItem("form0"));
      const form1 = safeJsonParse(localStorage.getItem("form1"));
      const form2 = safeJsonParse(localStorage.getItem("form2"));
      const form3 = safeJsonParse(localStorage.getItem("form3"));
      const posId = localStorage.getItem("posId");

      if (posId) {
        setIdAlreadyExists(true);
        return;
      } else if (form0 && form1 && paymentStatus === "approved") {
        const data = { form0, form1, form2, form3 };
        const result = await fetch(`${APIBASE}/api/products`, {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer zxcvbnm",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        const json = await result.json();

        localStorage.setItem("posId", json.insertedId);
        setResult({ ...data, posId: json.insertedId });
      }
    };

    fetchInitialData().catch(error => console.log(error));
  }, [paymentStatus]);

  if (idAlreadyExists) {
    return (
      <div>
        <p>El pago ya fue realizado con anterioridad</p>
        <button onClick={() => {
          localStorage.clear();
          redirect("/booking");
        }}>Reiniciar</button>
      </div>
    );
  }

  if (!result) {
    return <Spinner />;
  }

  const { departure, return: destiny, passengers } = result.form0;
  const responsable = result.form1.passengers[0];

  const handleDownload = () => { };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-300 max-h-screen">
      <div className="bg-[#F4F4F7] w-full min-h-full flex flex-col">
        <HeaderAV />
        <OptionHeader
          departure={result.form0.departure}
          destiny={result.form0.return}
          passengers={result.form0.passengers}
          luggage={result.form0.luggage}
        />

        {/* TODO DEBE IR DENTRO DE ESTE CONTAINER */}
        {
          paymentStatus?.includes('approved')
            ?
            <>
              <div className="flex flex-col items-center justify-center h-full bg-gray-200 pb-10 pt-20">
            {/* TODO DEBE IR DENTRO DE ESTE CONTAINER */}

            <h1 className="w-[814px] text-left text-[36px] text-[#10004f]">
              <strong>Comprobante / eTicket</strong>
            </h1>
            <div className="w-[813px] h-auto bg-white my-6 rounded-lg shadow-lg">
              <div className="flex flex-row-w-full bg-[#3198A5] rounded-t-lg py-6 px-10">
                <p className="font-semibold text-white text-[24px] text-justify">
                  {MENSAJE_SALDO}
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
                      {`${formatAddress(departure.address)} / ${formatAddress(destiny.address)}`}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Salida:
                    </p>
                    <p className="text-[32px] font-semibold text-[#10004f]">
                      {`${formatDate(new Date(departure.date))} / ${departure.time} `}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p
                      className={`${ruda.className} font-bold text-[#5C5C5C] text-[16px]`}
                    >
                      Desde:
                    </p>
                    <p className="text-[22px] font-semibold text-[#10004f]">
                      {formatAddress(departure.address)}
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
                      { passengers.adult > 1 ? `${passengers.adult - 1} acompañante(s) ` : null }
                      { passengers.baby > 0 ? `${passengers.baby} bebé(s)` : null }
                      { passengers.pets.small + passengers.pets.big > 0 ? `${passengers.pets.small + passengers.pets.big} mascota(s)` : null }
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center mb-10 mt-6">
                <button className="outline-none border-2 border-orange-500 rounded-md h-[40px] inline-flex items-center px-6 mx-5" disabled>
                  Descargar
                  <Image src={download} alt="download" className="ml-2" />
                </button>
                <button className="outline-none border-2 border-orange-500 rounded-md h-[40px] inline-flex items-center px-6" disabled>
                  Compartir
                  <Image src={share} alt="share" className="ml-2" />
                </button>
              </div>
            </div>
            {/* FIN DEL CONTAINER */}
            <div className="font-bold text-orange-500 text-[18px]">
                <button
                  onClick={() => {
                    localStorage.clear();
                    redirect("/booking")
                  }}
                  className="bg-inherit shadow-none text-orange-500 focus:ring-transparent"
                >Continuar en el sitio</button>
            </div>
          </div>
            </>
            :
            <>
              <div className="flex flex-col items-center justify-center h-screen bg-gray-200 pb-10">
                <div className="bg-white flex flex-col p-10 shadow-lg rounded-lg space-y-10">
                  <h1 className="">El pago fue rechazado, por favor reintentar el mismo.</h1>
                  <div className="flex flex-row justify-between">
                    <button className="px-4" onClick={() => redirect("/booking/checkout")}>Reintentar</button>
                    <button className="bg-inherit text-orange-500 shadow-none" onClick={() => {
                      localStorage.clear();
                      redirect("/booking");
                    }}>
                      Cancelar reserva
                    </button>
                  </div>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default function QR() {
  return (
    <Suspense fallback={<Spinner />}>
      <QRContent />
    </Suspense>
  );
}
