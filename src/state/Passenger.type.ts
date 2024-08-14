export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

interface Address {
  street: string;
  // number: string | number;
  // city: string;
  // neighborhood: string;
  other?: string;
  googlePlace: GooglePlace;
}

interface GooglePlace {
  lat: any;
  lng: any;
}

interface Contact {
  phoneCode: string;
  phoneNumber: string;
  email: string;
  address: Address;
}

interface Identification {
  type: string;
  number: string | number;
  country: string;
}

export interface Passenger {
  company?: Company;
  firstName: string;
  lastName: string;
  gender?: Gender;
  age: string;
  identification: Identification;
  contact: Contact;
}

interface Company {
  companyName: string;
  cuit: string;
}

interface Agreements {
  termsCondition: boolean;
  newsletter: boolean;
}

export interface TripDataForm2 {
  passengers: Passenger[];
  agreements: Agreements;
}
