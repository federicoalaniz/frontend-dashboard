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
    }
) {
    return (
        <div className="flex gap-2 my-2">
            {Array.from({ length: total }, (_, index) => (
                <AdultIcon asigned={index < asignado ? true : false} key={index} />
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
    return (
        <div className="flex gap-2 my-2">
            {Array.from({ length: total }, (_, index) => (
                <BigBagICON asigned={index < asignado ? true : false} key={index} />
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
    }
) {
    return (
        <div className="flex gap-2 my-2">
            {Array.from({ length: total }, (_, index) => (
                <LittleBagICON asigned={index < asignado ? true : false} key={index} />
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
    }
) {
    return (
        <div className="flex gap-2 my-2">
            {Array.from({ length: total }, (_, index) => (
                <SpecialICON asigned={index < asignado ? true : false} key={index} />
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