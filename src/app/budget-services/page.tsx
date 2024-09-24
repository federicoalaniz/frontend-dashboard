"use client";
import { PortalNavBar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "@/components/select";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import partiallyPay from "@/ui/icons/partially-paid.svg";
import editPay from "@/ui/icons/edit-paid.svg";
import totallyPaid from "@/ui/icons/totally-paid.svg";
import balance from "@/ui/icons/balance.svg";
import edit from "@/ui/icons/edit.svg";
import reload from "@/ui/icons/reolad.svg";
import roundTrip from "@/ui/icons/round-trip.svg";
import soloIda from "@/ui/icons/soloIda.svg";
import fullTimeIcon from "@/ui/icons/fullTimeIcon.svg";
import rowSettings from "@/ui/icons/vertical-dots.svg";
import { useRouter } from "next/navigation";

import { Ruda } from "next/font/google";
import Spinner from "@/components/Spinner";
import { formatAddress, formatDateDDMMYYY, obtenerFechaDeHoy } from "@/utils/basics";

const ruda = Ruda({ subsets: ["latin"] });

const APIBASE = process.env.NEXT_PUBLIC_APIBASE;

let totalPages: number;

function Budget() {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };

  const [data, setData] = useState<any>();
  const [actualPage, setActualPage] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${APIBASE}/api/products/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer zxcvbnm",
        },
      });
      const json = await result.json();
      totalPages = json.pagination.total
      console.log(totalPages)
      setData(json.data.filter((x: any) => x.form0));
    };

    fetchData().catch(console.log);
  }, []);

  if (!data) {
    return <Spinner />;
  }



  return (
    <>
      <PortalNavBar />
      <div className="w-full px-10">
        <div className="flex flex-row items-center justify-between my-10">
          <h1 className="font-bold text-[36px]">Presupuestos y servicios</h1>
          <div className="flex flex-row items-center ">
            <div className="flex opacity-30 ">
              <Link
                href="#"
                className="flex text-orange-500 text-[18px] font-semibold hover:text-orange-400 mx-8 my-auto cursor-default"
              >
                <span>
                  <MagnifyingGlassIcon className="size-6 mx-2" />
                </span>
                Buscar
              </Link>
            </div>
            <Select className="pr-10" disabled>
              <option value="">Viajes exclusivos</option>
              <option value="">Otros</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>
            <ul className="flex font-bold items-center">
              <li className="mr-5 duration-300 cursor-pointer">
                <input type="checkbox" className="h-5 w-5 ml-4 flex" />
              </li>
              <li className="mr-5 duration-300 cursor-pointer" onClick={() => window.location.reload()}>
                <Image src={reload || ""} alt="partial-pay" width={25} className="mr-2" />
              </li>
              <li className="mr-5 duration-300 cursor-default opacity-30">
                <p>Ver todos</p>
              </li>
              <li className="mr-5 duration-300 cursor-default opacity-30">
                <p>Exportar todos</p>
              </li>
              <li className="mr-5 duration-300 cursor-default opacity-30">
                <p>Imprimir todos</p>
              </li>
              <li className="mr-5">
                <p>|</p>
              </li>
              <li className="mr-5 flex duration-300 cursor-default opacity-30">
                <Image src={partiallyPay || ""} alt="partial-pay" width={25} className="mr-2" />
                Ha Señado
              </li>
              <li className="mr-5 flex duration-300 cursor-default opacity-30">
                <Image src={editPay || ""} alt="partial-pay" width={25} className="mr-2" />
                Editar Seña
              </li>
              <li className="mr-5 flex duration-300 cursor-default opacity-30">
                <Image src={totallyPaid || ""} alt="partial-pay" width={25} className="mr-2" />
                Ha Pagado
              </li>
              <li className="mr-5 flex duration-300 cursor-default opacity-30">
                <Image src={balance || ""} alt="partial-pay" width={25} className="mr-2" />
                Saldo Contado
              </li>
              <li className="mr-5 flex hover:opacity-50 duration-300 cursor-default opacity-30">
                <Image src={edit || ""} alt="partial-pay" width={25} className="mr-2" />
                Editar
              </li>
            </ul>
          </div>
          <div>
            <button
              className="flex items-center bg-orange-500 text-white px-4 py-3 rounded-md font-bold duration-300 focus:ring ring-gray-200"
              disabled
            >
              <PlusIcon className="size-6 mr-2" />
              Crear Servicio
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <table className={`w-full my-10 shadow-lg ${ruda.className}`}>
            <thead>
              <tr className="bg-blue-500 text-white text-[16px] font-thin hover:opacity-90 duration-300">
                <th></th>
                <th>SERVICIO</th>
                <th>ESTADO</th>
                <th>VEND.</th>
                <th>PX</th>
                <th>TRAMO</th>
                <th>ID VIAJE</th>
                <th>INICIO</th>
                <th>ORIGEN / DESTINO</th>
                <th>NOMBRE</th>
                <th>CUENTA</th>
                <th>ACREDITADO</th>
                <th>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((sale: any, index: number) => {
                return (
                  <>
                    <tr className="bg-inherit text-black text-[16px] font-thin hover:opacity-90 duration-300">
                      <td rowSpan={2} className={`border-b-gray-400 ${parseInt(sale?.form3?.percentage) === 100 ? 'bg-[#1784A7] text-white' : 'bg-[#79CEFF]'}`}>
                        <input
                          type="checkbox"
                          className="accent-orange-500 h-5 w-5 m-auto"
                        />
                      </td>
                      <td className={`text-center border-b-gray-400 ${parseInt(sale?.form3?.percentage) === 100 ? 'bg-[#1784A7] text-white' : 'bg-[#79CEFF]'}`} rowSpan={2}>
                        <Link href={{ pathname: `/budget-services/details`, query: { id: sale._id } }}>{`VE${sale._id.substring(0, 6)}`}</Link>
                        <div className="flex justify-center">
                          {
                            sale?.form0.fullTime &&
                            <Image src={fullTimeIcon || ""} alt="round-trip" />
                          }
                          {
                            (sale?.form0.tripType.roundTrip && !sale?.form0.fullTime) &&
                            <Image src={roundTrip || ""} alt="round-trip" />
                          }
                          {
                            !sale?.form0.tripType.roundTrip &&
                            <Image src={soloIda || ""} alt="round-trip" />
                          }
                        </div>
                      </td>
                      <td rowSpan={2}
                        className={`text-center border-b-gray-400 ${parseInt(sale?.form3?.percentage) === 100 ? 'bg-[#1784A7] text-white' : 'bg-[#79CEFF]'}`}>{parseInt(sale?.form3?.percentage) === 100 ? 'Pagado' : `Seña ${sale?.form3.percentage}%`}</td>
                      <td rowSpan={2} className="border-b-gray-400">ME</td>
                      <td rowSpan={2} className="border-b-gray-400">{sale.form0.passengers.adult + sale.form0.passengers.kid + sale.form0.passengers.baby}</td>
                      {
                        !sale?.form0.tripType.roundTrip
                          ? <td rowSpan={2} className="border-b-gray-400">IDA</td>
                          : <td>IDA</td>

                      }
                      {
                        !sale?.form0.tripType.roundTrip
                          ? <td rowSpan={2} className="border-b-gray-400">-</td>
                          : <td>-</td>
                      }

                      {
                        !sale?.form0.tripType.roundTrip
                          ? <td rowSpan={2} className="border-b-gray-400">{formatDateDDMMYYY(new Date(sale.form0.departure.date + 'T' + sale.form0.departure.time))}</td>
                          : <td>{formatDateDDMMYYY(new Date(sale.form0.departure.date + 'T' + sale.form0.departure.time))}</td>
                      }
                      {
                        !sale?.form0.tripType.roundTrip
                          ?
                          <td rowSpan={2} className="border-b-gray-400 relative">
                            <span className="underline">
                              {`
                          ${formatAddress(sale?.form0.departure.address)} -
                          ${formatAddress(sale?.form0.return.address)}
                        `}
                            </span>
                            {
                              (sale?.form0.departure.onePoint !== undefined && !sale?.form0.departure.onePoint) &&
                              <span className="bg-yellow-300 p-1 rounded absolute right-3 bottom-4">{`${sale?.form0.departure.stops} par`}</span>
                            }
                          </td>
                          :
                          <td>
                            <span className="underline">
                              {`
                          ${formatAddress(sale?.form0.departure.address)} -
                          ${formatAddress(sale?.form0.return.address)}
                        `}
                            </span>
                            {
                              (sale?.form0.departure.onePoint !== undefined && !sale?.form0.departure.onePoint) &&
                              <span className="bg-yellow-300 p-1 rounded absolute right-3 bottom-4">{`${sale?.form0.departure.stops} par`}</span>
                            }
                          </td>
                      }
                      <td rowSpan={2} className="border-b-gray-400">
                        {sale.form1.passengers[0].firstName}{" "}
                        {sale.form1.passengers[0].lastName}
                      </td>
                      <td rowSpan={2} className="border-b-gray-400">Cta Cte 1</td>
                      <td className="text-gray-400 text-right border-b-gray-400" rowSpan={2}>
                        {(sale?.form3.amount).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </td>
                      <td rowSpan={2} className="text-right border-b-gray-400">{sale.form2.totalCost.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}</td>
                      <td rowSpan={2} className="border-b-gray-400">
                        <Image
                          src={rowSettings || ""}
                          alt="partial-pay"
                          className="m-auto opacity-30"
                        />
                      </td>
                    </tr>
                    <tr className="bg-inherit text-black text-[16px] font-thin hover:opacity-90 duration-300">
                      {
                        sale?.form0.tripType.roundTrip
                        && <td className="bg-gray-100 border-b-gray-400">VUELTA</td>
                      }
                      {
                        sale?.form0.tripType.roundTrip
                        && <td className="bg-gray-100 border-b-gray-400">-</td>
                      }
                      {
                        sale?.form0.tripType.roundTrip
                        && <td className="bg-gray-100 border-b-gray-400">{formatDateDDMMYYY(sale.form0.return.date)}</td>
                      }
                      {
                        sale?.form0.tripType.roundTrip &&
                        <td className="bg-gray-100 border-b-gray-400" >
                          <span className="underline text-left">
                            {`${formatAddress(sale?.form0.return.address)} -
                          ${formatAddress(sale?.form0.departure.address)}`}
                          </span>
                        </td>
                      }
                    </tr>
                  </>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={14} className="px-2 border border-gray-200">
                  {`Actualizado al ${obtenerFechaDeHoy()} | Sitio en construcción`}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-row gap-4 mb-5 justify-center">
          <PaginationButtons total={totalPages} setData={setData} data={data} actualPage={actualPage} setActualPage={setActualPage} />
        </div>
      </div>
    </>
  );
}

function range(n: number): number[] {
  return Array.from(Array(n).keys());
}

const PaginationButtons = ({ total, setData, data, actualPage, setActualPage }: { total: number, setData: Function, data: any, actualPage: number, setActualPage: Function }) => {
  const fetchData = async (page: number) => {
    const result = await fetch(`${APIBASE}/api/products/?page=${page + 1}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer zxcvbnm",
      },
    });
    const json = await result.json();
    setData(json.data.filter((x: any) => x.form0));
    setActualPage(page)
  };



  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      <button
        className={`bg-inherit text-gray-500 mx-5 shadow-none disabled:opacity-30 disabled:bg-inherit disabled:shadow-none disabled:cursor-default px-3 font-semibold`}
        disabled={actualPage === 0}
        onClick={() => fetchData(actualPage - 1)}
      >
        <ArrowLeftIcon className="size-5 mr-2" /> Anterior
      </button>
      {range(total).map((page, index) => (
        <div key={index}>

          <button
            className={`px-2 bg-inherit text-gray-500 shadow-none size-12 hover:ring-2  hover:ring-orange-500 active:bg-orange-500 active:text-white selection:bg-orange-500 selection:text-white ${actualPage === page ? 'bg-orange-500 text-white shadow-md' : null}`}
            onClick={() => fetchData(page)}
          >
            {page + 1}
          </button>
        </div>
      ))}
      <button
        className="bg-inherit text-gray-500 mx-5 shadow-none disabled:opacity-30 disabled:bg-inherit disabled:shadow-none disabled:cursor-default px-3 font-semibold"
        disabled={actualPage === (totalPages - 1)}
        onClick={() => fetchData(actualPage + 1)}
      >
        Siguiente <ArrowRightIcon className="size-5 ml-2" />
      </button>
    </>
  );
};


export default Budget;
