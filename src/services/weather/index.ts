/**
 * FEAzTO Rider - Weather Service Contract & Mock Implementation
 * Section 19 Source of Truth
 */

import { mockWeather } from '../../mocks/weather';
import { WeatherCondition } from '../../types/incentive';

export interface WeatherService {
  getCurrentCondition(lat?: number, lng?: number): Promise<WeatherCondition>;
}

export class MockWeatherService implements WeatherService {
  async getCurrentCondition(_lat?: number, _lng?: number): Promise<WeatherCondition> {
    return mockWeather;
  }
}

export const weatherService: WeatherService = new MockWeatherService();
