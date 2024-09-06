"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderAV, { OptionHeader } from "@/components/header";
import { Ruda } from "next/font/google";
import Select from "@/components/select";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Spinner from "@/components/Spinner";

const MP_SERVER = process.env.NEXT_PUBLIC_MP_SERVER;

const ruda = Ruda({ subsets: ["latin"] });

export default function PartialPay() {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  const [checkout, setCheckout] = useState({
    invoiceType: "A",
    totalCost: 0,
    percentage: "50",
    amount: 0,
  });
  const currency = new Intl.NumberFormat();

  const [result, setResult] = useState<any>();
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const form0 = JSON.parse(localStorage.getItem("form0") || "");
    const form2 = JSON.parse(localStorage.getItem("form2") || "");
    if (form0 && form2) {
      setResult({ form0, form2 } as any);
      setCheckout({
        ...checkout,
        totalCost: form2.totalCost,
        amount: form2.totalCost * (parseInt(checkout.percentage) / 100),
      });
    }
  }, []);

  if (!result || !result.form0) {
    return <Spinner/>;
  }

  initMercadoPago(process.env.NEXT_PUBLIC_MP_KEY!, { locale: "es-AR" });

  const createPreference = async () => {
    try {
      const response = await axios.post(`${MP_SERVER}/create_preference`, {
        title: "Viaje",
        quantity: 1,
        price: checkout.amount,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    if ( !localStorage.getItem('form0') ) {
      redirect('/booking')
    } else {
      localStorage.setItem('form3', JSON.stringify( checkout ))
      const id = await createPreference();

      if (id) {
        setPreferenceId(id);
      }
    }
  };

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
            <h1 className="w-[814px] text-left text-[36px] text-[#10004f]">
              <strong>Pago</strong>
            </h1>
            <div className="w-[813px] bg-white my-6 rounded-lg shadow-lg">
              <div className="mx-6">
                <div className="factura my-6">
                  <p className={`${ruda.className} font-bold `}>
                    ¿Qué tipo de factura necesitas?
                  </p>
                  <div className="flex my-2 ">
                    <div className="mx-6 flex items-center">
                      <input
                        className="mx-3"
                        type="radio"
                        name="invoiceType"
                        checked={checkout.invoiceType === "A"}
                        onChange={() => {
                          setCheckout({
                            ...checkout,
                            invoiceType: "A",
                          });
                        }}
                      />
                      Factura A
                    </div>
                    <div className="mx-6 flex items-center">
                      <input
                        className="mx-3 "
                        type="radio"
                        name="invoiceType"
                        checked={checkout.invoiceType === "B"}
                        onChange={() => {
                          setCheckout({
                            ...checkout,
                            invoiceType: "B",
                          });
                        }}
                      />
                      Factura B
                    </div>
                  </div>
                  <div className="line mt-6 bg-gray-300 w-full h-[1px] x-6"></div>
                </div>
                <div className="totalCost flex justify-between items-center text-gray-400">
                  <p className={`${ruda.className} font-bold text-[16px]`}>
                    Costo total del servicio
                  </p>
                  <p className="font-bold text-[26px]">
                    {checkout.totalCost.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>
                <div className="line mt-6 bg-gray-300 w-full h-[1px] x-6"></div>
                <div className="my-6 flex justify-between">
                  <div>
                    <p
                      className={`${ruda.className} font-semibold text-[16px]`}
                    >
                      ¿Qué porcentaje del viaje abonarás ahora para señar el
                      viaje?
                    </p>
                    <div className="relative font-semibold">
                      <Select
                        label="Porcentaje de pago"
                        name="percentage_pay"
                        id="percentage_pay"
                        className="w-3/4"
                        onChange={(e:any) => {
                          setCheckout({
                            ...checkout,
                            amount:
                              checkout.totalCost *
                              (parseInt(e.target.value) / 100),
                            percentage: e.target.value,
                          });
                        }}
                      >
                        <option defaultValue="50" label="50%" />
                        <option value="75" label="75%" />
                        <option value="100" label="100%" />
                      </Select>
                    </div>
                  </div>
                  <div className="">
                    <p
                      className={`${ruda.className} font-semibold text-[16px]`}
                    >
                      Monto a pagar como reserva
                    </p>
                    <p className="font-bold text-[26px] text-right my-6 text-gray-500">
                      {checkout.amount.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row text-right mt-20">
                  <button
                    className="outline-none bg-orange-500 text-[18px] font-bold text-white w-1/2 my-4 mr-2 h-12 disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={handleBuy}
                  >
                    Continuar
                  </button>
                  {preferenceId && (
                    <div className="w-1/2 ml-2">
                      {" "}
                      <Wallet
                        initialization={{ preferenceId: preferenceId! }}
                      />{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
