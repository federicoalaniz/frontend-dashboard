import { PortalNavBar } from "@/components/Navbar";
import { SettingButton } from "@/components/SettingsButtons";

export default function Settings() {
    return (
        <div className="bg-gray-100 w-full max-h-max">
            <header>
                <PortalNavBar src="/settings" />
            </header>
            <div className="px-10 pb-10">
                <h1 className="font-bold text-3xl my-10">AJUSTES</h1>
                <section className="bg-white rounded-lg p-10 flex hover:shadow-lg duration-300 opacity-50">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold my-2">Generales</h1>
                        <div className="grid grid-cols-2 gap-5 grid-rows-3">
                            <SettingButton icon="userPermission" title="Usuarios y Permisos" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="carFloat" title="Flota" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="mapZones" title="Zonas y cordones urbanos" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="timeStop" title="Tiempos por parada (cálculo de ETA)" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="expensesPerdiem" title="Viáticos y Perdiem" subtitle="Lorem ipsum" src="#" disabled/>
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-lg p-10 my-10 hover:shadow-lg duration-300 border opacity-50">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold my-2">Pasajes a la Costa y Recitales</h1>
                        <div className="grid grid-cols-2 gap-5 grid-rows-2">
                            <SettingButton icon="priceTag" title="Tabla de precios" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="schedule" title="Horarios de salida" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="seaRoutes" title="Rutas a la costa" subtitle="Lorem ipsum" src="#" disabled/>
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-lg p-10 my-10 hover:shadow-lg duration-300">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold my-2">Viajes Exclusivos</h1>
                        <div className="grid grid-cols-2 gap-5 grid-rows-2">
                            <SettingButton icon="carPrice" title="Precio por vehículo" subtitle="Lorem ipsum" src="/settings/exclusive-travels/vehicles" />
                            <SettingButton icon="equivalency" title="Equivalencia Km/Hr" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="waiting" title="Espera y Permanencia" subtitle="Lorem ipsum" src="#" disabled/>
                            <SettingButton icon="nearValue" title="Valor Km acercamiento" subtitle="Lorem ipsum" src="#" disabled/>
                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}