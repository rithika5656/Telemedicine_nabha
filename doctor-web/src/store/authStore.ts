/**
 * Auth Store - Simple authentication state
 */

import { create } from 'zustand';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface AuthState {
  isAuthenticated: boolean;
  doctor: Doctor | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  doctor: null,

  login: async (username: string, password: string) => {
    // Simple demo login - replace with actual API
    if (username && password) {
      set({
        isAuthenticated: true,
        doctor: {
          id: '1',
          name: 'Dr. Sharma',
          specialization: 'General Medicine',
        },
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, doctor: null });
  },
}));
