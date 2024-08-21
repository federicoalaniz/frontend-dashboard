import { RenderAdults, RenderBigBags, RenderLittleBags } from "@/components/RenderPaxLuggage"
import { formatDate } from "@/utils/basics";

export default function Test() {
    const cantAdultos = 4
    const cantVG = 2
    const cantVC = 4

    function calcularFechaLlegada(fechaSalida: string, horaSalida: string, duracionHoras: number): string  {
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
            <RenderLittleBags total={cantVC} asignado={3} />
        </div>
    )
}




