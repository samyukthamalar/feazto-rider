/**
 * FEAzTO Rider - Order State Machine & Lifecycle Store
 * Source of truth: FEAzTO Rider Master Prompt Section 11, 25, 26, 27, 32
 */

import { create } from 'zustand';
import { DeliveryStage } from '../types/delivery';
import { CanonicalOrder, OrderStatus } from '../types/order';
import { useEarningsStore } from './earningsStore';

interface OrderState {
  activeOrder: CanonicalOrder | null;
  pendingOffer: CanonicalOrder | null;
  orderHistory: CanonicalOrder[];
  currentStage: DeliveryStage;
  setPendingOffer: (offer: CanonicalOrder | null) => void;
  acceptOffer: () => void;
  declineOffer: () => void;
  updateOrderStatus: (status: OrderStatus) => void;
  advanceStage: () => void;
  verifyDeliveryOtp: (otp: string) => boolean;
  completeDelivery: () => void;
  resetOrders: () => void;
}

export const canonicalMockOrder: CanonicalOrder = {
  id: '#FA2841',
  kitchenId: 'kt-01',
  kitchenName: 'FEAzTO Home Kitchen',
  kitchenAddress: '12, Lake View Road, Anna Nagar',
  kitchenContact: '+91 98401 23456',
  customer: {
    id: 'cust-99',
    name: 'Arun Kumar',
    phone: '+91 98765 44321',
    address: 'Flat 4B, Emerald Heights, 45 Anna Nagar East',
    landmark: 'Opposite State Bank',
    deliveryInstructions: 'Ring doorbell twice, leave on contactless stand if preferred',
    lat: 13.085,
    lng: 80.214,
  },
  items: [
    { id: 'itm-1', name: 'Chettinad Paneer Biryani', quantity: 1, isVeg: true },
    { id: 'itm-2', name: 'Malabar Parotta (2 pcs)', quantity: 2, isVeg: true },
    { id: 'itm-3', name: 'Filter Coffee Cold Brew', quantity: 1, isVeg: true },
  ],
  itemCount: 4,
  totalAmount: 480,
  status: 'OUT_FOR_DELIVERY',
  pickupDistanceKm: 2.4,
  deliveryDistanceKm: 5.8,
  totalDistanceKm: 8.2,
  earnings: {
    baseEarning: 72,
    rainBonus: 30,
    peakBonus: 20,
    festivalBonus: 0,
    tip: 0,
    totalEarning: 122,
  },
  verificationOtp: '4821',
  placedAt: '12:15 PM',
  acceptedAt: '12:18 PM',
  pickedUpAt: '12:32 PM',
  specialDeliveryNote: 'Handle with care - hot beverages inside bag',
};

export const pendingMockOffer: CanonicalOrder = {
  id: '#FA2842',
  kitchenId: 'kt-02',
  kitchenName: 'FEAzTO Cloud Bowl',
  kitchenAddress: '88, 1st Cross, Shanti Colony',
  kitchenContact: '+91 98401 98765',
  customer: {
    id: 'cust-102',
    name: 'Meera Sundaram',
    phone: '+91 98765 88990',
    address: '12, 4th Avenue, Anna Nagar West',
    landmark: 'Near Roundtana',
    lat: 13.089,
    lng: 80.21,
  },
  items: [
    { id: 'itm-4', name: 'Millet Curd Rice Bowl', quantity: 1, isVeg: true },
    { id: 'itm-5', name: 'Crispy Yam Fries', quantity: 1, isVeg: true },
  ],
  itemCount: 2,
  totalAmount: 290,
  status: 'RIDER_ASSIGNED',
  pickupDistanceKm: 1.8,
  deliveryDistanceKm: 3.2,
  totalDistanceKm: 5.0,
  earnings: {
    baseEarning: 55,
    rainBonus: 30,
    peakBonus: 20,
    festivalBonus: 0,
    tip: 10,
    totalEarning: 115,
  },
  verificationOtp: '7392',
  placedAt: '01:05 PM',
};

export const useOrderStore = create<OrderState>((set, get) => ({
  activeOrder: canonicalMockOrder,
  pendingOffer: null,
  orderHistory: [
    {
      ...canonicalMockOrder,
      id: '#FA2839',
      status: 'DELIVERED',
      deliveredAt: '11:45 AM',
      earnings: {
        baseEarning: 68,
        rainBonus: 30,
        peakBonus: 0,
        festivalBonus: 0,
        tip: 20,
        totalEarning: 118,
      },
    },
    {
      ...canonicalMockOrder,
      id: '#FA2838',
      status: 'DELIVERED',
      deliveredAt: '10:50 AM',
      earnings: {
        baseEarning: 60,
        rainBonus: 30,
        peakBonus: 0,
        festivalBonus: 0,
        tip: 0,
        totalEarning: 90,
      },
    },
  ],
  currentStage: 'NAVIGATING_TO_CUSTOMER',

  setPendingOffer: (offer) => set({ pendingOffer: offer }),

  acceptOffer: () => {
    const { pendingOffer } = get();
    if (pendingOffer) {
      set({
        activeOrder: {
          ...pendingOffer,
          status: 'RIDER_ACCEPTED',
          acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        pendingOffer: null,
        currentStage: 'NAVIGATING_TO_KITCHEN',
      });
    }
  },

  declineOffer: () => set({ pendingOffer: null }),

  updateOrderStatus: (status) =>
    set((state) => ({
      activeOrder: state.activeOrder ? { ...state.activeOrder, status } : null,
    })),

  advanceStage: () => {
    const { currentStage, activeOrder } = get();
    if (!activeOrder) return;

    switch (currentStage) {
      case 'OFFER_PENDING':
        set({ currentStage: 'NAVIGATING_TO_KITCHEN', activeOrder: { ...activeOrder, status: 'RIDER_ACCEPTED' } });
        break;
      case 'NAVIGATING_TO_KITCHEN':
        set({ currentStage: 'ARRIVED_AT_KITCHEN', activeOrder: { ...activeOrder, status: 'RIDER_AT_KITCHEN' } });
        break;
      case 'ARRIVED_AT_KITCHEN':
        set({ currentStage: 'PICKING_UP', activeOrder: { ...activeOrder, status: 'PICKED_UP' } });
        break;
      case 'PICKING_UP':
        set({ currentStage: 'NAVIGATING_TO_CUSTOMER', activeOrder: { ...activeOrder, status: 'OUT_FOR_DELIVERY' } });
        break;
      case 'NAVIGATING_TO_CUSTOMER':
        set({ currentStage: 'ARRIVED_AT_CUSTOMER', activeOrder: { ...activeOrder, status: 'RIDER_AT_CUSTOMER' } });
        break;
      case 'ARRIVED_AT_CUSTOMER':
        set({ currentStage: 'VERIFYING_DELIVERY', activeOrder: { ...activeOrder, status: 'DELIVERY_VERIFIED' } });
        break;
      case 'VERIFYING_DELIVERY':
        get().completeDelivery();
        break;
      case 'COMPLETED':
        break;
    }
  },

  verifyDeliveryOtp: (otp: string) => {
    const { activeOrder } = get();
    if (!activeOrder) return false;
    // Match order verificationOtp or deterministic prototype code "4821" / any 4 digit
    if (otp === activeOrder.verificationOtp || otp === '4821' || otp.length === 4) {
      set({
        currentStage: 'COMPLETED',
        activeOrder: {
          ...activeOrder,
          status: 'DELIVERED',
          deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      });
      return true;
    }
    return false;
  },

  completeDelivery: () => {
    const { activeOrder, orderHistory } = get();
    if (!activeOrder) return;

    const completed = {
      ...activeOrder,
      status: 'DELIVERED' as OrderStatus,
      deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    useEarningsStore.getState().creditOrderEarnings(completed);

    set({
      activeOrder: null,
      currentStage: 'COMPLETED',
      orderHistory: [completed, ...orderHistory],
    });
  },

  resetOrders: () =>
    set({
      activeOrder: canonicalMockOrder,
      pendingOffer: null,
      currentStage: 'NAVIGATING_TO_CUSTOMER',
    }),
}));
