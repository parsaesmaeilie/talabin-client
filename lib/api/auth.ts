/**
 * Authentication API Service
 */

import { apiClient, ApiResponse } from './client';

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

export interface LoginResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface RegisterData {
  phone_number: string;
  password: string;
  password_confirm: string;
}

export interface LoginData {
  phone_number: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/register/', data);
  },

  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    // Clear any existing token before login to avoid 401 errors
    apiClient.setToken(null);

    const response = await apiClient.post<LoginResponse>('/auth/login/', data);

    if (response.success && response.data?.tokens.access) {
      apiClient.setToken(response.data.tokens.access);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }

    return response;
  },

  async logout(): Promise<void> {
    const refreshToken = typeof window !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : null;

    if (refreshToken) {
      await apiClient.post('/auth/logout/', { refresh: refreshToken });
    }

    apiClient.setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me/');
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/auth/profile/update/', data);
  },

  async changePassword(data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/profile/change-password/', data);
  },

  async sendOTP(data: {
    phone_number: string;
    otp_type: 'registration' | 'login' | 'password_reset';
  }): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/send-otp/', data);
  },

  async verifyOTP(data: {
    phone_number: string;
    code: string;
    otp_type: 'registration' | 'login' | 'password_reset';
  }): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/verify-otp/', data);
  },

  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
};
