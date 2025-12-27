/**
 * Authentication types
 */

export interface User {
  id: number;
  phone_number: string;
  email: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  national_id: string | null;
  profile_image: string | null;
  date_of_birth: string | null;
  is_verified: boolean;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterData {
  phone_number: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginData {
  phone_number: string;
  password: string;
}

export interface OTPData {
  phone_number: string;
  otp_type: 'registration' | 'login' | 'password_reset';
}

export interface VerifyOTPData extends OTPData {
  code: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}
