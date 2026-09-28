/**
 * FEAzTO Rider - Mock Weather Data
 * Section 19 Source of Truth
 */

import { WeatherCondition } from '../types/incentive';

export const mockWeather: WeatherCondition = {
  state: 'RAIN',
  temperatureCelsius: 27,
  conditionDescription: 'Moderate to Heavy Showers',
  rainProbabilityPercentage: 85,
  rainBonusActive: true,
  rainBonusPerDelivery: 30,
  safetyAdvisory: 'Slippery roads near Roundtana. Maintain safe following distance and wear raincoat.',
  raincoatRecommended: true,
};
