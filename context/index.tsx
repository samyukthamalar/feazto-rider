/**
 * FEAzTO Rider - React Context Providers
 * Provides standard React Context integration wrapping the core stores
 */

import React, { createContext, useContext } from 'react';
import { useAuthStore } from '../src/store/authStore';
import { useOrderStore } from '../src/store/orderStore';
import { useRiderStore } from '../src/store/riderStore';
import { useUIStore } from '../src/store/uiStore';

export interface AppContextValue {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  riderName: string;
  isOnline: boolean;
  activeOrderId: string | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isOnboarded = useAuthStore((state) => state.isOnboarded);
  const riderProfile = useRiderStore((state) => state.profile);
  const isOnline = useRiderStore((state) => state.status === 'ONLINE');
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const showToast = useUIStore((state) => state.showToast);

  const value: AppContextValue = {
    isAuthenticated,
    isOnboarded,
    riderName: riderProfile.personalDetails.fullName,
    isOnline,
    activeOrderId: activeOrder?.id || null,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
