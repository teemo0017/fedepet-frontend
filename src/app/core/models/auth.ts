export interface Register {
  name: string
  email: string
  phone: string
  password: string,
  role: string
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
  doctorPhoto : string;
  exp: number;
  iat: number;
}
