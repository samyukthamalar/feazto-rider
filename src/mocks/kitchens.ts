/**
 * FEAzTO Rider - Mock Kitchens
 */

import { KitchenInfo } from '../types/kitchen';

export const mockKitchens: KitchenInfo[] = [
  {
    id: 'kt-01',
    name: 'FEAzTO Home Kitchen',
    address: '12, Lake View Road, Anna Nagar East',
    phone: '+91 98401 23456',
    rating: 4.9,
    preparationStatus: 'READY_FOR_PICKUP',
    estimatedPreparationTimeMinutes: 0,
    instructionsForRider: 'Enter through back service gate. Show #FA order ID to counter manager.',
    lat: 13.083,
    lng: 80.211,
  },
  {
    id: 'kt-02',
    name: 'FEAzTO Cloud Bowl',
    address: '88, 1st Cross, Shanti Colony',
    phone: '+91 98401 98765',
    rating: 4.8,
    preparationStatus: 'PREPARING',
    estimatedPreparationTimeMinutes: 4,
    instructionsForRider: 'Dedicated rider parking available on side lane.',
    lat: 13.089,
    lng: 80.21,
  },
];
