export interface requestId {
  id: number
}

export interface petsResponseByUser {
  id: number
  name: string;
  species: string;
  breed: string;
  dateBirth: string;
  weight: number;
  photo: string;
}

export interface Doctor {
  name: string;
  specialty: string;
  email: string;
  phone: string;
  available: boolean;
  photo: string;
}

export interface savePetRequest {
  name: string;
  species: string;
  breed: string;
  dateBirth: string;
  weight: number;
  owner: number;
  photo:string
}

export interface GenericResponseSave {
  status: string;
}

export interface saveDateRequest {
  motive: string;
  state: string;
  pet: number;
  doctor: number;
  dateTime: string;
}

