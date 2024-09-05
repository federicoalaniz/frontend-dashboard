import { useState } from "react";
import { ErrorMessage, isError } from "./ErrorMessage";
import ReactGoogleAutocomplete, {
    ReactGoogleAutocompleteProps,
} from "react-google-autocomplete";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    errorField?: string | undefined;
}
interface Props extends ReactGoogleAutocompleteProps {
    label: string;
    errorField?: string;
}
const SearchPlaces = (props: Props) => {
    const { label, errorField, onPlaceSelected, ...searchProps } = props;
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    return (
        <>
            <div className="relative">
                <label className="relative font-semibold block">
                    <ReactGoogleAutocomplete
                        apiKey={API_KEY}
                        options={{
                            types: ['(cities)'],
                        }}
                        onPlaceSelected={onPlaceSelected}
                        className={`peer placeholder-transparent 
                        ${isError(errorField) ? "border-red-500" : ""}`}
                        // place
                        {...searchProps}
                    />
                    <span
                        className={`absolute left-0 top-3 text-opacity-80 bg-white mx-3 px-2
                    peer-focus:text-gray-500 duration-200 text-[16px]
                    peer-focus:text-xs peer-focus:-translate-y-5 
                    peer-valid:text-xs peer-valid:-translate-y-5 peer-disabled:-translate-y-5 peer-disabled:bg-inherit peer-disabled:text-xs ${isError(errorField) ? "text-red-500" : ""
                            }`}
                    >
                        {label}
                    </span>
                </label>
                {isError(errorField) && <ErrorMessage field={errorField} />}
            </div>
        </>
    );
};

interface SearchAddressesProps extends ReactGoogleAutocompleteProps {
    label: string;
    errorField?: string;
}

interface SearchAddressesProps extends React.InputHTMLAttributes<HTMLInputElement> { }

// const SearchAddresses: React.FC<SearchAddressesProps> = ({ label, errorField, onPlaceSelected, ...searchProps }) => {
//     const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
//     return (
//         <div className="relative">
//             <label className="relative font-semibold block">
//                 <ReactGoogleAutocomplete
//                     apiKey={API_KEY}
//                     onPlaceSelected={onPlaceSelected}
//                     className={`peer placeholder-transparent ${isError(errorField) ? "border-red-500" : ""}`}
//                     options={{
//                         types: ['address'],
//                     }}
//                     {...searchProps}
//                 />
//                 <span className={`absolute left-0 top-3 text-opacity-80 bg-white mx-3 px-2 peer-focus:text-gray-500 duration-200 text-[16px] peer-focus:text-xs peer-focus:-translate-y-5 peer-valid:text-xs peer-valid:-translate-y-5 peer-disabled:-translate-y-5 peer-disabled:bg-inherit peer-disabled:text-xs ${isError(errorField) ? "text-red-500" : ""}`}>
//                     {label}
//                 </span>
//             </label>
//             {isError(errorField) && <ErrorMessage field={errorField} />}
//         </div>
//     );
// };
const SearchAddresses: React.FC<SearchAddressesProps> = ({ label, errorField, onPlaceSelected, value, ...searchProps }) => {
    const [address, setAddress] = useState(value || "");

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    return (
        <div className="relative">
            <label className="relative font-semibold block">
                <ReactGoogleAutocomplete
                    apiKey={API_KEY}
                    onPlaceSelected={(place, ref, details) => {
                        setAddress(place.formatted_address);
                        if (onPlaceSelected) {
                            onPlaceSelected(place, ref, details);  // Llamar a la función con los tres argumentos
                        }
                    }}
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    className={`peer placeholder-transparent ${isError(errorField) ? "border-red-500" : ""}`}
                    options={{
                        types: ['address'],
                    }}
                    {...searchProps}
                />
                <span className={`absolute left-0 top-3 text-opacity-80 bg-white mx-3 px-2 peer-focus:text-gray-500 duration-200 text-[16px] peer-focus:text-xs peer-focus:-translate-y-5 peer-valid:text-xs peer-valid:-translate-y-5 peer-disabled:-translate-y-5 peer-disabled:bg-inherit peer-disabled:text-xs ${isError(errorField) ? "text-red-500" : ""}`}>
                    {label}
                </span>
            </label>
            {isError(errorField) && <ErrorMessage field={errorField} />}
        </div>
    );
};



export default SearchAddresses;

export { SearchPlaces, SearchAddresses }