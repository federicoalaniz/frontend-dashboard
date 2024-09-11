'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import adultIcon from '@/ui/icons/adult.svg'
import Image from 'next/image'

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    open: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, open }) => {
    const [isOpen, setIsOpen] = useState(open);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full mt-10">
            <div 
                className="flex justify-between items-center px-5 pt-3 pb-1 border-b border-blue-900 text-black font-bold rounded-t-lg cursor-pointer
                hover:drop-shadow-xl hover:shadow-blue-500 duration-300"
                onClick={toggleAccordion}
            >
                
                <h1 className='text-[22px] font-bold text-blue-900 flex items-center'>
                    <Image src={adultIcon} alt="paxbold" className="h-8 w-8 mr-2" />
                        {title}
                    </h1>
                    <span className="text-2xl">
                        <ChevronDownIcon className={`size-6 ${isOpen ? 'rotate-180 duration-300 text-orange-500' : 'duration-300'}`} />
                    </span>
            </div>
            {
                isOpen && <div className="py-5">{children}</div>
            }
        </div>
    );
};


export default Accordion;