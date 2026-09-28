/**
 * FEAzTO Rider - Order Service Contract & Mock Implementation
 * Section 11 & 38 Source of Truth
 */

import { mockOrders } from '../../mocks/orders';
import { CanonicalOrder, OrderStatus } from '../../types/order';

export interface OrderService {
  getActiveOrder(): Promise<CanonicalOrder | null>;
  getOrderHistory(): Promise<CanonicalOrder[]>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>;
  verifyDeliveryOtp(orderId: string, otp: string): Promise<boolean>;
}

export class MockOrderService implements OrderService {
  private orders = [...mockOrders];

  async getActiveOrder(): Promise<CanonicalOrder | null> {
    const active = this.orders.find((o) => o.status !== 'DELIVERED' && o.status !== 'CLOSED');
    return active || null;
  }

  async getOrderHistory(): Promise<CanonicalOrder[]> {
    return this.orders.filter((o) => o.status === 'DELIVERED' || o.status === 'CLOSED');
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      return true;
    }
    return false;
  }

  async verifyDeliveryOtp(orderId: string, otp: string): Promise<boolean> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return false;
    return otp === order.verificationOtp || otp === '4821' || otp.length === 4;
  }
}

export const orderService: OrderService = new MockOrderService();
