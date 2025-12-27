/**
 * Authentication State Management with Zustand
 */

import { create } from 'zustand';
import { authService } from '../api';
import type { User, LoginData, RegisterData } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Initialize auth state from localStorage
   */
  initialize: () => {
    const user = authService.getUser();
    const isAuthenticated = authService.isAuthenticated();
    set({ user, isAuthenticated });
  },

  /**
   * Login user
   */
  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(data);

      if (response.success && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'خطا در ورود',
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      set({
        error: 'خطا در ارتباط با سرور',
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.register(data);

      if (response.success) {
        set({
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        set({
          error: response.error?.message || 'خطا در ثبت‌نام',
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      set({
        error: 'خطا در ارتباط با سرور',
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    set({ isLoading: true });

    try {
      await authService.logout();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Clear local state even if API call fails
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  /**
   * Set user directly
   */
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },
}));
