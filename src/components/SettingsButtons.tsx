'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Ruda } from "next/font/google";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// Importación de los iconos
import userPermission from "@/ui/icons/settings/users-permission.svg";
import carFloat from "@/ui/icons/settings/float.svg";
import mapZones from "@/ui/icons/settings/map-zones.svg";
import timeStop from "@/ui/icons/settings/time-stops.svg";
import expensesPerdiem from "@/ui/icons/settings/expenses-perdiem.svg";
import priceTag from "@/ui/icons/settings/price-tag.svg";
import seaRoutes from "@/ui/icons/settings/sea-routes.svg";
import schedule from "@/ui/icons/settings/schedule.svg";
import carPrice from "@/ui/icons/settings/car-price.svg";
import equivalency from "@/ui/icons/settings/equivalency-statistics.svg";
import waiting from "@/ui/icons/settings/waiting-permanency.svg";
import nearValue from "@/ui/icons/settings/near-value.svg";

// Mapa de iconos
const iconsMap = {
    userPermission,
    carFloat,
    mapZones,
    timeStop,
    expensesPerdiem,
    priceTag,
    seaRoutes,
    schedule,
    carPrice,
    equivalency,
    waiting,
    nearValue,
};

const ruda = Ruda({ subsets: ["latin"] });

function SettingButton(
    {
        icon,
        title,
        subtitle = "Lorem ipsum",
        src = "#",
        disabled
    }: {
        icon: keyof typeof iconsMap,
        title: string,
        subtitle: string,
        src: string,
        disabled?: boolean,
    }
) {
    const router = useRouter();
    const redirectTo = (path: string) => router.push(path);


    return (
        <div className={`${disabled ? "w-full opacity-50 cursor-default" : "w-full cursor-pointer  duration-300"}`} onClick={() => redirectTo(src)}>
            <div className={`flex flex-row rounded-md shadow-md border border-gray-100 p-5 items-center w-auto justify-between ${ !disabled ? "hover:ring-2 hover:ring-orange-500" : null} `}>
                <div className="flex items-center gap-5">
                    <div className="flex flex-col">
                        <Image
                            src={iconsMap[icon]}
                            alt={icon}
                            width={60}  // Puedes ajustar el tamaño según necesites
                            height={60}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">{title}</h1>
                        <p className={`${ruda.className}`}>{subtitle}</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <ChevronRightIcon className="size-6 hover:drop-shadow-md" />
                </div>
            </div>
        </div>
    );
}

export { SettingButton };
