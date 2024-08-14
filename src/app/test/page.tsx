import { RenderAdults, RenderBigBags, RenderLittleBags } from "@/components/RenderPaxLuggage"

export default function Test() {
    const cantAdultos = 4
    const cantVG = 2
    const cantVC = 4

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




