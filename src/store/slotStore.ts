/**
 * FEAzTO Rider - Work Slots State Management
 * Source of truth: FEAzTO Rider Master Prompt Section 16
 */

import { create } from 'zustand';

export type SlotCapacity = 'AVAILABLE' | 'LIMITED' | 'FULL';

export interface WorkSlot {
  id: string;
  name: string;
  timeWindow: string;
  startHour: number;
  endHour: number;
  status: SlotCapacity;
  demandIndicator: 'NORMAL' | 'MODERATE' | 'PEAK';
  bonusPerOrder?: number;
}

interface SlotState {
  slots: WorkSlot[];
  activeSlotId: string | null;
  selectSlot: (id: string) => boolean;
  cancelSlot: () => void;
  resetSlots: () => void;
}

const defaultSlots: WorkSlot[] = [
  {
    id: 'slot-morning',
    name: 'Morning Rush',
    timeWindow: '06:00 – 10:00',
    startHour: 6,
    endHour: 10,
    status: 'AVAILABLE',
    demandIndicator: 'MODERATE',
    bonusPerOrder: 15,
  },
  {
    id: 'slot-afternoon',
    name: 'Lunch Peak',
    timeWindow: '12:00 – 16:00',
    startHour: 12,
    endHour: 16,
    status: 'LIMITED',
    demandIndicator: 'PEAK',
    bonusPerOrder: 20,
  },
  {
    id: 'slot-evening',
    name: 'Dinner Peak',
    timeWindow: '17:00 – 21:00',
    startHour: 17,
    endHour: 21,
    status: 'AVAILABLE',
    demandIndicator: 'PEAK',
    bonusPerOrder: 25,
  },
  {
    id: 'slot-night',
    name: 'Late Night',
    timeWindow: '21:00 – 00:00',
    startHour: 21,
    endHour: 24,
    status: 'AVAILABLE',
    demandIndicator: 'NORMAL',
    bonusPerOrder: 15,
  },
];

export const useSlotStore = create<SlotState>((set, get) => ({
  slots: defaultSlots,
  activeSlotId: 'slot-afternoon', // Active afternoon slot by default

  selectSlot: (id: string) => {
    const slot = get().slots.find((s) => s.id === id);
    if (!slot || slot.status === 'FULL') {
      return false;
    }
    set({ activeSlotId: id });
    return true;
  },

  cancelSlot: () => set({ activeSlotId: null }),

  resetSlots: () =>
    set({
      slots: defaultSlots,
      activeSlotId: 'slot-afternoon',
    }),
}));
