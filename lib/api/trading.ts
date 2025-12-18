/**
 * Trading API Service
 */

import { apiClient, ApiResponse } from './client';

export interface Order {
  id: number;
  order_type: 'buy' | 'sell';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  gold_amount: string;
  gold_price_per_gram: string;
  amount_irr: string;
  fee: string;
  total_amount: string;
  order_number: string;
  executed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
}

export interface OrderPreview {
  order_type: 'buy' | 'sell';
  amount_irr: number;
  gold_price_per_gram: number;
  gold_amount: number;
  fee: number;
  total_amount: number;
}

export const tradingService = {
  async previewOrder(data: {
    order_type: 'buy' | 'sell';
    amount_irr: number;
  }): Promise<ApiResponse<OrderPreview>> {
    return apiClient.post<OrderPreview>('/trading/orders/preview/', data);
  },

  async placeOrder(data: {
    order_type: 'buy' | 'sell';
    amount_irr: number;
  }): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>('/trading/orders/place_order/', data);
  },

  async getOrders(): Promise<ApiResponse<Order[]>> {
    return apiClient.get<Order[]>('/trading/orders/');
  },

  async cancelOrder(id: number): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>(`/trading/orders/${id}/cancel/`, {});
  },
};
