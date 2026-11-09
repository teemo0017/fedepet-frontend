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
  description: string;
  id: number;
}

export interface savePetRequest {
  name: string;
  species: string;
  breed: string;
  dateBirth: string;
  weight: number;
  owner: number;
  photo: string
}

export interface GenericResponseSave {
  status: string;
}

export interface saveDateRequest {
  motive: string;
  type: string;
  pet: number;
  doctor: number;
  client: number;
  dateTime: string;
}

export interface DatesResponse {
  id: number;
  dateTime: string;
  motive: string;
  type: string;
  state: string;
  doctor?: string;
  client?: string;
  pet: string;
  doctorImg: string;
  petImg: string;
}

export interface updateDateState {
  id: number,
  state: string
}

export interface DateResponseDoctor {
  datesIncoming: DatesResponse[],
  datesDone: DatesResponse[]
}

export interface saveDoctorRequest {
  name: string;
  password: string;
  specialty: string;
  description: string;
  email: string;
  phone: string;
  photo: string;
}
