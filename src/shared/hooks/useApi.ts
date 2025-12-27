'use client';

import { useState, useCallback, useEffect } from 'react';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
}

interface UseApiOptions {
  /**
   * Execute the API call immediately on mount
   */
  immediate?: boolean;
  /**
   * Callback when API call succeeds
   */
  onSuccess?: (data: any) => void;
  /**
   * Callback when API call fails
   */
  onError?: (error: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<ApiResponse<T>>;
  reset: () => void;
}

/**
 * Generic hook for making API calls with loading and error states
 * @param apiCall - Function that returns a Promise<ApiResponse<T>>
 * @param options - Configuration options
 * @returns Object with data, loading, error, execute, and reset
 *
 * @example
 * const { data, loading, error, execute } = useApi(
 *   () => authService.login(credentials),
 *   { onSuccess: (data) => router.push('/dashboard') }
 * );
 */
export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { immediate = false, onSuccess, onError } = options;

  const execute = useCallback(
    async (...args: any[]): Promise<ApiResponse<T>> => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall(...args);

        if (response.success && response.data) {
          setData(response.data);
          if (onSuccess) {
            onSuccess(response.data);
          }
        } else {
          const errorMessage = response.error?.message || response.message || 'خطا در انجام عملیات';
          setError(errorMessage);
          if (onError) {
            onError(errorMessage);
          }
        }

        return response;
      } catch (err) {
        const errorMessage = 'خطا در ارتباط با سرور';
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        return {
          success: false,
          error: { message: errorMessage, details: err },
        };
      } finally {
        setLoading(false);
      }
    },
    [apiCall, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]); // Only run on mount if immediate is true

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
