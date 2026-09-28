/**
 * FEAzTO Rider - UI & Developer Demo Control Store
 * Source of truth: FEAzTO Rider Master Prompt Section 33 & 34
 */

import { create } from 'zustand';

interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface UIState {
  isDemoDrawerOpen: boolean;
  isSupportModalOpen: boolean;
  isBreakModalOpen: boolean;
  toasts: ToastMessage[];
  toggleDemoDrawer: () => void;
  setDemoDrawerOpen: (open: boolean) => void;
  setSupportModalOpen: (open: boolean) => void;
  setBreakModalOpen: (open: boolean) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDemoDrawerOpen: false,
  isSupportModalOpen: false,
  isBreakModalOpen: false,
  toasts: [],

  toggleDemoDrawer: () => set((state) => ({ isDemoDrawerOpen: !state.isDemoDrawerOpen })),
  setDemoDrawerOpen: (open) => set({ isDemoDrawerOpen: open }),
  setSupportModalOpen: (open) => set({ isSupportModalOpen: open }),
  setBreakModalOpen: (open) => set({ isBreakModalOpen: open }),

  showToast: (message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
