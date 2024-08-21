import responsible from "@/ui/icons/person_bold.svg"
import pax from "@/ui/icons/adult.svg"
import Image from "next/image"


export default function Separator ( {title}:{title:string}) {
    return (
        <>
            <h5 className="text-[18px] mt-8 font-semibold">{title}</h5>
            <span className="inline-block w-full h-[1px] bg-gray-400 mb-2"></span>
        </>
    )
}

export function SeparatorPersona ( {title}:{title:string}) {
    return (
        <>
            <div className="flex flex-row items-center mt-12">

                <Image src={pax || ""} alt="paxbold" className="flex" />
                <h4 className="text-[22px] font-bold text-blue-900">{title}</h4>
            </div>
            <span className="inline-block w-full h-[1px] bg-blue-900 mb-2"></span>
        </>
    )
}

export function SeparatorResponsible ( {title}:{title:string}) {
    return (
        <>
            <div className="flex flex-row items-center mt-12">

                <Image src={responsible || ""} alt="paxbold" />
                <h4 className="text-[22px] font-bold text-blue-900">{title}</h4>
            </div>
            <span className="inline-block w-full h-[1px] bg-blue-900 mb-2"></span>
        </>
    )
}

