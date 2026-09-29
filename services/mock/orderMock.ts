/**
 * FEAzTO Rider - Canonical Order Mock Data
 * Source of truth: FEAzTO 20-Screen Reference Workflow
 * Canonical order #2FS28734, Biryani Box Hub -> Customer (12, Green Park Street)
 */

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isVeg: boolean;
}

export interface CustomerDetails {
  id: string;
  name: string;
  phone: string;
  address: string;
  landmark: string;
  distanceKm: number;
  etaMinutes: number;
}

export interface CloudKitchenDetails {
  id: string;
  name: string;
  address: string;
  phone: string;
  pickupStatus: string;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  itemsCount: number;
  totalAmount: number;
  kitchen: CloudKitchenDetails;
  customer: CustomerDetails;
  deliveryFee: number;
  distanceEarnings: number;
  surgeIncentive: number;
  totalPayout: number;
  qrCodeValue: string;
  foodPhotoUri: string | null;
  handoverPhotoUri: string | null;
  placedTime: string;
  pickupTime?: string;
  deliveredTime?: string;
  specialInstructions: string;
}

export const canonicalMockOrder: MockOrder = {
  id: '2FS28734',
  orderNumber: '#2FS28734',
  items: [
    { id: 'itm-1', name: 'Hyderabadi Dum Biryani', quantity: 1, price: 189, isVeg: false },
    { id: 'itm-2', name: 'Paneer Butter Masala Combo', quantity: 1, price: 97, isVeg: true },
  ],
  itemsCount: 2,
  totalAmount: 286,
  kitchen: {
    id: 'kt-guindy-04',
    name: 'Biryani Box Hub (Cloud Kitchen)',
    address: 'Block 4, Industrial Estate, Guindy, Chennai',
    phone: '+91 98401 23456',
    pickupStatus: 'Ready for pickup',
  },
  customer: {
    id: 'cust-greenpark-12',
    name: 'Customer',
    phone: '+91 98765 43210',
    address: '12, Green Park Street, Chennai - 600028',
    landmark: 'Near Green Park Metro / Pillayar Kovil',
    distanceKm: 2.4,
    etaMinutes: 8,
  },
  deliveryFee: 45,
  distanceEarnings: 22,
  surgeIncentive: 15,
  totalPayout: 82,
  qrCodeValue: 'FEAZTO-ORDER-2FS28734-KITCHEN-VERIFY',
  foodPhotoUri: null,
  handoverPhotoUri: null,
  placedTime: '2:30 PM',
  specialInstructions: 'Handle with care. Double sealed packaging.',
};

export const initialOrderHistory = [
  {
    id: '2FS28733',
    orderNumber: '#2FS28733',
    time: '11:20 AM',
    status: 'Delivered' as const,
    amount: 245,
    itemsCount: 1,
    restaurant: 'Dosa Express',
    distanceKm: 1.8,
    date: 'Today',
  },
  {
    id: '2FS28732',
    orderNumber: '#2FS28732',
    time: '09:50 AM',
    status: 'Delivered' as const,
    amount: 310,
    itemsCount: 3,
    restaurant: 'Chai & Snacks Corner',
    distanceKm: 3.2,
    date: 'Today',
  },
  {
    id: '2FS28725',
    orderNumber: '#2FS28725',
    time: 'Yesterday, 8:40 PM',
    status: 'Delivered' as const,
    amount: 420,
    itemsCount: 4,
    restaurant: 'Anjappar Chettinad',
    distanceKm: 4.1,
    date: 'Week',
  },
  {
    id: '2FS28721',
    orderNumber: '#2FS28721',
    time: 'Yesterday, 2:15 PM',
    status: 'Delivered' as const,
    amount: 195,
    itemsCount: 1,
    restaurant: 'Sangeetha Veg',
    distanceKm: 2.0,
    date: 'Week',
  },
  {
    id: '2FS28690',
    orderNumber: '#2FS28690',
    time: '24 Sep, 1:10 PM',
    status: 'Delivered' as const,
    amount: 550,
    itemsCount: 5,
    restaurant: 'Barbeque Box',
    distanceKm: 5.5,
    date: 'Month',
  },
];
