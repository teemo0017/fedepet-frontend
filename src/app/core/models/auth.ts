export interface Register {
  name: string
  email: string
  phone: string
  password: string
}
export interface ResponseAuth {
  token: string;
}

export interface Login {
  username: string
  password: string
}

export interface DecodedUser {
  id: number;
  name: string;
  role: string;
  phone: string;
  doctorPhoto: string;
  clinicId?: string;
  exp: number;
  iat: number;
}

export interface ClinicPublicInfo {
  id: string;
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  primaryColor: string;
  active: boolean;
}
