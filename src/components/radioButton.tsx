export default function RadioButton ({name, title}:{name:string, title:string}) {
    return (
        <div className="mx-6">
            <input 
                type="radio" 
                name={name}
                className="mx-3 font-semibold text-orange-500 border-orange-500" 
                />
            {title}
        </div>
    )
}

import React from 'react';

interface RadioButtonItem {
    name: string;
    label: string;
    value: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButtonComponent: React.FC<RadioButtonItem> = ({name, label, value, checked, onChange }) => {
    return (
        <div className="flex items-center">
            <label className='flex items-center'>
                <input type="radio" value={value} checked={checked} onChange={onChange} 
                className='flex mx-5'/>
                {label}
            </label>
        </div>
    );
};