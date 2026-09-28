/**
 * FEAzTO Rider - Realtime Service Abstraction & Event Bus
 * Source of truth: FEAzTO Rider Master Prompt Section 30
 */

export type RealtimeEventName =
  | 'ORDER_ASSIGNED'
  | 'ORDER_STATUS_CHANGED'
  | 'RIDER_STATUS_CHANGED'
  | 'KITCHEN_STATUS_CHANGED'
  | 'DELIVERY_UPDATED'
  | 'WEATHER_UPDATED'
  | 'INCENTIVE_ACTIVATED'
  | 'INCENTIVE_UPDATED'
  | 'EARNINGS_UPDATED'
  | 'SOS_CREATED'
  | 'NOTIFICATION_RECEIVED';

export type RealtimeListener = (payload: any) => void;

export interface RealtimeService {
  connect(riderId: string): void;
  disconnect(): void;
  subscribe(event: RealtimeEventName, listener: RealtimeListener): () => void;
  publish(event: RealtimeEventName, payload: any): void;
}

export class MockRealtimeService implements RealtimeService {
  private listeners: Map<RealtimeEventName, Set<RealtimeListener>> = new Map();

  connect(_riderId: string): void {
    // Deterministic mock connection
  }

  disconnect(): void {
    this.listeners.clear();
  }

  subscribe(event: RealtimeEventName, listener: RealtimeListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);

    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  publish(event: RealtimeEventName, payload: any): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((fn) => fn(payload));
    }
  }
}

export const realtimeService: RealtimeService = new MockRealtimeService();
