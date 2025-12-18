/**
 * Wallet API Service
 */

import { apiClient, ApiResponse } from './client';

export interface Wallet {
  id: number;
  balance_irr: string;
  gold_balance: string;
  frozen_balance_irr: string;
  frozen_gold_balance: string;
  available_balance_irr: string;
  available_gold_balance: string;
  total_value_irr: number;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: number;
  transaction_type: 'deposit' | 'withdraw' | 'buy_gold' | 'sell_gold' | 'fee' | 'refund';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  amount_irr: string;
  amount_gold: string;
  description: string;
  reference_id: string;
  created_at: string;
}

export interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  sheba_number: string;
  card_number: string;
  account_holder_name: string;
  is_verified: boolean;
  is_default: boolean;
  created_at: string;
}

export interface DepositRequest {
  id: number;
  amount: string;
  status: 'pending' | 'paid' | 'verified' | 'rejected' | 'cancelled';
  payment_method: string;
  transaction_id: string;
  receipt_image: string | null;
  created_at: string;
}

export interface WithdrawalRequest {
  id: number;
  amount: string;
  fee: string;
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'rejected' | 'cancelled';
  transaction_id: string;
  tracking_code: string | null;
  created_at: string;
}

export const walletService = {
  async getBalance(): Promise<ApiResponse<Wallet>> {
    return apiClient.get<Wallet>('/wallet/balance/');
  },

  async getTransactions(type?: string): Promise<ApiResponse<WalletTransaction[]>> {
    const endpoint = type ? `/wallet/transactions/?type=${type}` : '/wallet/transactions/';
    return apiClient.get<WalletTransaction[]>(endpoint);
  },

  async getBankAccounts(): Promise<ApiResponse<BankAccount[]>> {
    return apiClient.get<BankAccount[]>('/wallet/bank-accounts/');
  },

  async addBankAccount(data: Omit<BankAccount, 'id' | 'is_verified' | 'created_at'>): Promise<ApiResponse<BankAccount>> {
    return apiClient.post<BankAccount>('/wallet/bank-accounts/', data);
  },

  async updateBankAccount(id: number, data: Partial<BankAccount>): Promise<ApiResponse<BankAccount>> {
    return apiClient.put<BankAccount>(`/wallet/bank-accounts/${id}/`, data);
  },

  async deleteBankAccount(id: number): Promise<ApiResponse<any>> {
    return apiClient.delete(`/wallet/bank-accounts/${id}/`);
  },

  async createDeposit(data: {
    amount: number;
    payment_method: string;
  }): Promise<ApiResponse<DepositRequest>> {
    return apiClient.post<DepositRequest>('/wallet/deposits/create_deposit/', data);
  },

  async uploadDepositReceipt(id: number, file: File): Promise<ApiResponse<DepositRequest>> {
    return apiClient.uploadFile<DepositRequest>(
      `/wallet/deposits/${id}/upload_receipt/`,
      file,
      'receipt_image'
    );
  },

  async createWithdrawal(data: {
    bank_account_id: number;
    amount: number;
  }): Promise<ApiResponse<WithdrawalRequest>> {
    return apiClient.post<WithdrawalRequest>('/wallet/withdrawals/create_withdrawal/', data);
  },

  async cancelWithdrawal(id: number): Promise<ApiResponse<WithdrawalRequest>> {
    return apiClient.post<WithdrawalRequest>(`/wallet/withdrawals/${id}/cancel/`, {});
  },
};
