import { ClinicPublicInfo } from './auth';

/** Una clínica tal como la ve el SUPER_ADMIN (mismo shape que la info pública). */
export type Clinic = ClinicPublicInfo;

export interface CreateClinicRequest {
  clinicSlug: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicEmail: string;
  primaryColor?: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminPhone: string;
}
