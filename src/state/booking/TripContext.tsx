"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { TripDataForm1 as Trip } from "../Trip.type";

interface TripContextType {
  trip: Trip;
  setTrip: React.Dispatch<React.SetStateAction<Trip>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<Trip>({
    tripType: { transferType: "", roundTrip: false },
    fullTime: false,
    departure: { address: "", streetBetween1: "", streetBetween2: "", other:"", date: "", time: "", onePoint: true, stops: 1},
    return: { address: "", streetBetween1: "", streetBetween2: "", other:"", date: "", time: "", onePoint: true, stops: 0 },
    passengers: { adult: 0, kid: 0, baby: 0, pets: { small: 0, big: 0 } },
    luggage: { carryOn: 0, bag23: 0, special: { quantity: 0, detail: "" } },
  });

  return (
    <TripContext.Provider value={{ trip, setTrip }}>
      {children}
    </TripContext.Provider>
  );
};

// Hook personalizado para usar el contexto
const useTrip = (): TripContextType => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip debe usarse dentro de un TripProvider");
  }
  return context;
};

export { TripProvider, useTrip };
