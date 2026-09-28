/**
 * FEAzTO Rider - Kitchen Domain Types
 */

export interface KitchenInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  preparationStatus: 'PREPARING' | 'READY_FOR_PICKUP' | 'SLIGHT_DELAY';
  estimatedPreparationTimeMinutes: number;
  instructionsForRider?: string;
  lat?: number;
  lng?: number;
}
