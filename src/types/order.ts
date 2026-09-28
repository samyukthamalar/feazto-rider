/**
 * FEAzTO Rider - Order & Order Lifecycle Types
 * Source of truth: FEAzTO Rider Master Prompt Section 11 & 38
 */

export type OrderStatus =
  | 'PLACED'
  | 'KITCHEN_ACCEPTED'
  | 'PREPARING'
  | 'READY'
  | 'RIDER_ASSIGNED'
  | 'RIDER_ACCEPTED'
  | 'RIDER_AT_KITCHEN'
  | 'PICKED_UP'
  | 'OUT_FOR_DELIVERY'
  | 'RIDER_AT_CUSTOMER'
  | 'DELIVERY_VERIFIED'
  | 'DELIVERED'
  | 'CLOSED';

export type OrderExceptionStatus =
  | 'CANCELLED'
  | 'RIDER_DECLINED'
  | 'REASSIGNMENT_REQUIRED'
  | 'KITCHEN_DELAY'
  | 'DELIVERY_DELAY'
  | 'CUSTOMER_UNAVAILABLE'
  | 'DELIVERY_FAILED'
  | 'SUPPORT_ESCALATION';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  isVeg: boolean;
  notes?: string;
}

export interface OrderCustomer {
  id: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  deliveryInstructions?: string;
  lat?: number;
  lng?: number;
}

export interface OrderEarningsBreakdown {
  baseEarning: number;
  rainBonus: number;
  peakBonus: number;
  festivalBonus: number;
  tip: number;
  totalEarning: number;
}

export interface CanonicalOrder {
  id: string; // Canonical format: #FA2841
  kitchenId: string;
  kitchenName: string;
  kitchenAddress: string;
  kitchenContact: string;
  customer: OrderCustomer;
  items: OrderItem[];
  itemCount: number;
  totalAmount: number;
  status: OrderStatus;
  exceptionStatus?: OrderExceptionStatus;
  pickupDistanceKm: number;
  deliveryDistanceKm: number;
  totalDistanceKm: number;
  earnings: OrderEarningsBreakdown;
  verificationOtp?: string; // Canonical 4-digit verification code
  placedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  specialDeliveryNote?: string;
}
