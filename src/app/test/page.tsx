import { IconType } from "@/components/card";
import { RenderAdults, RenderBigBags, RenderLittleBags } from "@/components/RenderPaxLuggage"
import { formatDate } from "@/utils/basics";

export default function Test() {
    const cantAdultos = 4
    const cantVG = 2
    const cantVC = 13

    const options = [
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
        },
    ];
    function calcularFechaLlegada(fechaSalida: string, horaSalida: string, duracionHoras: number): string {
        // Combinar la fecha y la hora de salida en un solo objeto Date
        const [year, month, day] = fechaSalida.split('-').map(Number);
        const [hour, minute] = horaSalida.split(':').map(Number);
        const fechaSalidaDate = new Date(year, month - 1, day, hour, minute);

        // Añadir la duración del viaje en horas
        fechaSalidaDate.setHours(fechaSalidaDate.getHours() + duracionHoras);

        return formatDate(fechaSalidaDate);
    }

    const fechaLlegada = calcularFechaLlegada('2024-08-14', '10:00', 18)

    return (
        <div className="container items-center justify-between w-1/2 m-auto">
            <h1 className="font-bold text-3xl">Pagina para testeo de componentes y otros</h1>
            <h1 className="font-bold">Pasajeros</h1>
            <div className="flex flex-col">
                <RenderAdults total={cantAdultos} asignado={2} />
            </div>
            <h1 className="font-bold">Equipaje</h1>
            <RenderBigBags total={cantVG} asignado={2} />
            <RenderLittleBags total={cantVC} asignado={11} />
        </div>
    )
}




