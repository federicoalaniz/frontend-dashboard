'use client'
import adultOK from "@/ui/icons/adultOK.svg"
import adultNOK from "@/ui/icons/adultEMPTY.svg"
import kidOK from "@/ui/icons/kidOK.svg"
import kidNOK from "@/ui/icons/kidEMPTY.svg"
import babyOK from "@/ui/icons/babyOK.png"
import babyNOK from "@/ui/icons/babyEMPTY.svg"

import littleBagOK from "@/ui/icons/littleBagOK.svg"
import littleBagNOK from "@/ui/icons/littleBagEMPTY.svg"
import bigBagOK from "@/ui/icons/bigBagOK.svg"
import bigBagNOK from "@/ui/icons/bigBagEMPTY.svg"
import specialOK from "@/ui/icons/specialOK.svg"
import specialNOK from "@/ui/icons/specialEMPTY.svg"

import Image from "next/image"

// ====================== PASAJEROS ================================
function RenderAdults(
    {
        total,
        asignado
    }: {
        total: number,
        asignado: number
    }) {
        // Dividimos el array en subarrays de máximo 5 elementos
        const groupedBags = Array.from({ length: Math.ceil(total / 5) }, (_, i) =>
            Array.from({ length: 5 }, (_, j) => i * 5 + j).filter(index => index < total)
        );
    
        return (
            <div className="flex flex-col gap-2 my-5">
                {groupedBags.map((group, i) => (
                    <div className="flex gap-2" key={i}>
                        {group.map(index => (
                            <AdultIcon asigned={index < asignado ? true : false} key={index} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

// ========================= EQUIPAJE =================================

function RenderBigBags(
    {
        total,
        asignado
    }: {
        total: number,
        asignado: number
    }
) {
    const groupedBags = Array.from({ length: Math.ceil(total / 5) }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => i * 5 + j).filter(index => index < total)
    );
    return (
        <div className="flex flex-col gap-2 my-5">
            {groupedBags.map((group, i) => (
                <div className="flex gap-2" key={i}>
                    {group.map(index => (
                        <BigBagICON asigned={index < asignado ? true : false} key={index} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function RenderLittleBags(
{
    total,
    asignado
}: {
    total: number,
    asignado: number
}) {
    // Dividimos el array en subarrays de máximo 5 elementos
    const groupedBags = Array.from({ length: Math.ceil(total / 5) }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => i * 5 + j).filter(index => index < total)
    );

    return (
        <div className="flex flex-col gap-2 my-5">
            {groupedBags.map((group, i) => (
                <div className="flex gap-2" key={i}>
                    {group.map(index => (
                        <LittleBagICON asigned={index < asignado ? true : false} key={index} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function RenderSpecialLuggage(
    {
        total,
        asignado
    }: {
        total: number,
        asignado: number
    }) {
        // Dividimos el array en subarrays de máximo 5 elementos
        const groupedBags = Array.from({ length: Math.ceil(total / 5) }, (_, i) =>
            Array.from({ length: 5 }, (_, j) => i * 5 + j).filter(index => index < total)
        );
    
        return (
            <div className="flex flex-col gap-2 my-5">
                {groupedBags.map((group, i) => (
                    <div className="flex gap-2" key={i}>
                        {group.map(index => (
                            <SpecialICON asigned={index < asignado ? true : false} key={index} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

// ========================= ICONOS ==================
function AdultIcon({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={adultOK} alt=""/></>
        : !asigned 
            ? <><Image src={adultNOK} alt=""/></>
            : null        
    )
}

function KidIcon({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={kidOK} alt=""/></>
        : !asigned 
            ? <><Image src={kidNOK} alt=""/></>
            : null        
    )
}

function BabyICON({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={babyOK} alt=""/></>
        : !asigned 
            ? <><Image src={babyNOK} alt=""/></>
            : null        
    )
}

function LittleBagICON ({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={littleBagOK} alt=""/></>
        : !asigned 
            ? <><Image src={littleBagNOK} alt=""/></>
            : null  
    )
}

function BigBagICON ({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={bigBagOK} alt=""/></>
        : !asigned 
            ? <><Image src={bigBagNOK} alt=""/></>
            : null  
    )
}

function SpecialICON ({ asigned }: { asigned:boolean }) {
    return(
        asigned 
        ?  <><Image src={specialOK} alt=""/></>
        : !asigned 
            ? <><Image src={specialNOK} alt=""/></>
            : null  
    )
}

export { RenderAdults, RenderBigBags, RenderLittleBags, RenderSpecialLuggage }