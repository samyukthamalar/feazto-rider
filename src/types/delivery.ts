/**
 * FEAzTO Rider - Delivery Stage & Navigation Types
 */

import { OrderStatus } from './order';

export type DeliveryStage =
  | 'OFFER_PENDING'
  | 'NAVIGATING_TO_KITCHEN'
  | 'ARRIVED_AT_KITCHEN'
  | 'PICKING_UP'
  | 'NAVIGATING_TO_CUSTOMER'
  | 'ARRIVED_AT_CUSTOMER'
  | 'VERIFYING_DELIVERY'
  | 'COMPLETED';

export interface DeliveryTimelineStep {
  stage: DeliveryStage;
  label: string;
  orderStatus: OrderStatus;
  timestamp?: string;
  completed: boolean;
}

export interface NavigationPlaceholderData {
  targetType: 'KITCHEN' | 'CUSTOMER';
  targetName: string;
  targetAddress: string;
  distanceKm: number;
  estimatedMinutes: number;
  simulatedRouteSteps: string[];
}
