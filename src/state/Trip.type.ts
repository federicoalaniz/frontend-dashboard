interface TripType {
  transferType: string;
  roundTrip: boolean;
}

interface GooglePlace {
  lat: number;
  lng: number;
}

interface DepartureOrReturn {
  address: string;
  streetBetween1: string;
  streetBetween2: string;
  other: string;
  date: string;
  time: string;
  googlePlace?: GooglePlace; 
}

interface Pets {
  small: number;
  big: number;
}

interface Passengers {
  adult: number;
  kid: number;
  baby: number;
  pets: Pets;
}

interface SpecialLuggage {
  quantity: number;
  detail: string;
}

interface Luggage {
  carryOn: number;
  bag23: number;
  special: SpecialLuggage;
}

export interface TripDataForm1 {
  tripType: TripType;
  fullTime: boolean;
  departure: DepartureOrReturn;
  return: DepartureOrReturn;
  passengers: Passengers;
  luggage: Luggage;
}
