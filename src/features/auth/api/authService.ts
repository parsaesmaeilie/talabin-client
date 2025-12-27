/**
 * Authentication API Service
 */

import { apiClient, ApiResponse } from '@/src/shared/lib';
import type {
  User,
  LoginResponse,
  RegisterData,
  LoginData,
  OTPData,
  VerifyOTPData,
  ChangePasswordData,
} from '../types';

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/register/', data);
  },

  /**
   * Login user and store tokens
   */
  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    // Clear any existing token before login to avoid 401 errors
    apiClient.setToken(null);

    const response = await apiClient.post<LoginResponse>('/auth/login/', data);

    if (response.success && response.data?.tokens.access) {
      apiClient.setToken(response.data.tokens.access);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Dispatch event to notify other components
        window.dispatchEvent(new Event('authChange'));
      }
    }

    return response;
  },

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    const refreshToken =
      typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    if (refreshToken) {
      try {
        await apiClient.post('/auth/logout/', { refresh: refreshToken });
      } catch (error) {
        // Continue with local cleanup even if API call fails
        console.error('Logout API error:', error);
      }
    }

    apiClient.setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      // Dispatch event to notify other components
      window.dispatchEvent(new Event('authChange'));
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me/');
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/auth/profile/update/', data);
  },

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/profile/change-password/', data);
  },

  /**
   * Send OTP code
   */
  async sendOTP(data: OTPData): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/send-otp/', data);
  },

  /**
   * Verify OTP code
   */
  async verifyOTP(data: VerifyOTPData): Promise<ApiResponse<any>> {
    return apiClient.post('/auth/verify-otp/', data);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  },

  /**
   * Get user from localStorage
   */
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
};
