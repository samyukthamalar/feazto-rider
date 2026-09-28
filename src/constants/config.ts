/**
 * FEAzTO Rider - Application Configuration & Operational Rules
 */

export const APP_CONFIG = {
  appName: 'FEAzTO Rider',
  appVersion: '1.0.0',
  brandName: 'FEAzTO',
  tagline: 'Deliver & Earn with FEAzTO',
  supportPhone: '+91 1800 200 4848',
  emergencySosNumber: '112',
  mockMode: true,
  canonicalOrderIdPrefix: '#FA',
  workSlots: [
    { id: 'slot-morning', name: 'Morning Shift', timeWindow: '06:00 - 10:00', status: 'AVAILABLE', demand: 'MODERATE' },
    { id: 'slot-afternoon', name: 'Afternoon Shift', timeWindow: '12:00 - 16:00', status: 'AVAILABLE', demand: 'HIGH' },
    { id: 'slot-evening', name: 'Evening Shift', timeWindow: '17:00 - 21:00', status: 'LIMITED', demand: 'PEAK' },
    { id: 'slot-night', name: 'Night Shift', timeWindow: '21:00 - 00:00', status: 'AVAILABLE', demand: 'NORMAL' },
  ],
} as const;
