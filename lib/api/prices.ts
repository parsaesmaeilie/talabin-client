/**
 * Prices API Service
 */

import { apiClient, ApiResponse } from './client';

export interface GoldPrice {
  id: number;
  buy_price: string;
  sell_price: string;
  spread: number;
  is_active: boolean;
  source: string;
  created_at: string;
}

export interface PriceHistory {
  id: number;
  timestamp: string;
  price: string;
  source: string;
}

export const pricesService = {
  async getCurrentPrice(): Promise<ApiResponse<GoldPrice>> {
    return apiClient.get<GoldPrice>('/prices/gold/current/');
  },

  async getPriceHistory(timeframe: '1h' | '24h' | '7d' | '30d' = '24h'): Promise<ApiResponse<PriceHistory[]>> {
    return apiClient.get<PriceHistory[]>(`/prices/gold/history/?timeframe=${timeframe}`);
  },
};
