# FEAzTO Rider — Backend Integration Contract

This document provides the canonical technical interface contract between the **FEAzTO Rider React Native application** and downstream backend microservices.

All data structures, request payloads, response envelopes, and WebSocket events map directly to TypeScript types located in [`src/types/`](file:///src/types/).

---

## 1. Network & API Standards

- **Base URL (Staging)**: `https://api-staging.feazto.internal/rider/v1`
- **Base URL (Production)**: `https://api.feazto.internal/rider/v1`
- **WebSocket Gateway**: `wss://stream.feazto.internal/rider/socket`
- **Authentication**: Bearer JWT in the `Authorization` header (`Authorization: Bearer <token>`).
- **Content Type**: `application/json; charset=utf-8`

### Standard Response Envelope
All REST API endpoints return a unified response schema:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;           // e.g., "AUTH_INVALID_OTP", "ORDER_EXPIRED"
    description: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;        // ISO 8601 UTC
}
```

---

## 2. REST Endpoints Specification

### 2.1 Authentication & KYC Clearance

#### `POST /auth/otp/send`
Request SMS OTP to rider's Indian phone number.
- **Request**:
  ```json
  { "phone": "9876543210" }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": { "requestId": "req_otp_8912", "expiresIn": 300, "resendAvailableIn": 30 }
  }
  ```

#### `POST /auth/otp/verify`
Verify 4-digit OTP and authenticate rider session.
- **Request**:
  ```json
  { "phone": "9876543210", "otp": "1234" }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "riderId": "RDR_001",
      "verificationStatus": "APPROVED" // "UNVERIFIED" | "PENDING" | "APPROVED" | "NEEDS_CORRECTION"
    }
  }
  ```

#### `POST /riders/onboarding`
Submit completed onboarding documents for KYC clearance.
- **Request**:
  ```json
  {
    "personal": {
      "fullName": "Rajesh Kumar",
      "dob": "1994-08-15",
      "bloodGroup": "O+",
      "emergencyContact": { "name": "Sunita Kumar", "relation": "Spouse", "phone": "9876543211" }
    },
    "licence": {
      "number": "KA0120200012345",
      "expiry": "2035-12-31",
      "frontUrl": "https://storage.feazto.internal/kyc/dl_f.jpg",
      "backUrl": "https://storage.feazto.internal/kyc/dl_b.jpg"
    },
    "vehicle": {
      "type": "EV_SCOOTER",
      "regNumber": "KA01EV1234",
      "model": "Ather 450X"
    },
    "payout": {
      "upiId": "rajesh@okhdfcbank",
      "accountNumber": "5010023456789",
      "ifsc": "HDFC0001234"
    }
  }
  ```
- **Response `200 OK`**:
  ```json
  { "success": true, "data": { "status": "PENDING", "estimatedReviewTime": "24h" } }
  ```

---

### 2.2 Duty & Shift Management

#### `PUT /riders/duty`
Toggle operational duty state (`ONLINE`, `OFFLINE`, `ON_BREAK`).
- **Request**:
  ```json
  {
    "dutyStatus": "ONLINE",
    "location": { "lat": 12.9352, "lng": 77.6245 },
    "safetyChecks": { "helmetFastened": true, "gearReady": true, "batteryOk": true }
  }
  ```
- **Response `200 OK`**:
  ```json
  { "success": true, "data": { "dutyStatus": "ONLINE", "zone": "Koramangala Central" } }
  ```

#### `GET /slots`
List available shift booking slots for active zone.
- **Query Params**: `?date=2026-09-27&zoneId=ZONE_BLR_01`
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "SLOT_01",
        "title": "Evening Dinner Surge",
        "startTime": "19:00",
        "endTime": "23:30",
        "guaranteedMin": 750,
        "incentive": "+₹25/order rain surge",
        "status": "OPEN",
        "bookedCount": 42,
        "maxCapacity": 50
      }
    ]
  }
  ```

#### `POST /slots/:id/book`
Reserve a delivery shift slot.
- **Response `200 OK`**:
  ```json
  { "success": true, "data": { "slotId": "SLOT_01", "bookingStatus": "CONFIRMED" } }
  ```

---

### 2.3 Order Lifecycle & Dispatch

#### `POST /orders/:id/accept`
Accept incoming dispatch offer.
- **Request**:
  ```json
  { "orderId": "FA2841", "riderLocation": { "lat": 12.9352, "lng": 77.6245 } }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": "FA2841",
      "status": "ACCEPTED",
      "kitchen": {
        "name": "Biryani Box Cloud Kitchen",
        "address": "80 Feet Rd, 4th Block, Koramangala",
        "location": { "lat": 12.9345, "lng": 77.6261 },
        "phone": "+918045678900"
      },
      "customer": {
        "name": "Arjun Sharma",
        "address": "Flat 402, Prestige Acropolis, Hosur Rd",
        "location": { "lat": 12.9389, "lng": 77.6185 },
        "phone": "+919876543299"
      },
      "items": [
        { "name": "Hyderabadi Chicken Dum Biryani", "qty": 2, "price": 560 },
        { "name": "Mirchi Ka Salan", "qty": 1, "price": 0 },
        { "name": "Gulab Jamun (Pack of 2)", "qty": 1, "price": 90 }
      ],
      "estimatedPayout": 122.0
    }
  }
  ```

#### `POST /orders/:id/lifecycle`
Advance delivery stage.
- **Request**:
  ```json
  {
    "stage": "PICKED_UP", // "NAVIGATING_TO_KITCHEN" | "ARRIVED_AT_KITCHEN" | "PICKED_UP" | "NAVIGATING_TO_CUSTOMER" | "ARRIVED_AT_CUSTOMER"
    "location": { "lat": 12.9345, "lng": 77.6261 },
    "checklistConfirmed": true
  }
  ```
- **Response `200 OK`**:
  ```json
  { "success": true, "data": { "orderId": "FA2841", "stage": "PICKED_UP", "updatedAt": "2026-09-27T19:35:10Z" } }
  ```

#### `POST /orders/:id/verify-otp`
Verify customer delivery OTP to complete the order.
- **Request**:
  ```json
  { "otp": "4821", "location": { "lat": 12.9389, "lng": 77.6185 } }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": "FA2841",
      "status": "DELIVERED",
      "finalPayout": {
        "basePay": 55.0,
        "distancePay": 32.0,
        "weatherSurge": 25.0,
        "customerTip": 10.0,
        "total": 122.0
      },
      "walletBalance": 1602.0
    }
  }
  ```

---

### 2.4 Earnings & Instant Cashout

#### `POST /earnings/withdraw`
Execute immediate UPI payout to rider's verified VPA.
- **Request**:
  ```json
  { "amount": 1000.0, "payoutMode": "UPI", "vpa": "rajesh@okhdfcbank" }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "transactionId": "TXN_IMPS_99210",
      "amount": 1000.0,
      "fee": 0.0,
      "status": "SUCCESS",
      "destination": "rajesh@okhdfcbank",
      "newBalance": 602.0,
      "settledAt": "2026-09-27T20:15:00Z"
    }
  }
  ```

---

## 3. Real-Time WebSocket Channel Contract

Channel: `wss://stream.feazto.internal/rider/socket?token=<JWT>`

### 3.1 Client $\to$ Server Events
- **`telemetry:ping`**: Continuous GPS location ping.
  ```json
  { "event": "telemetry:ping", "data": { "lat": 12.9352, "lng": 77.6245, "speed": 28.4, "heading": 145, "battery": 78 } }
  ```
- **`safety:sos`**: Immediate emergency alert broadcast.
  ```json
  { "event": "safety:sos", "data": { "reason": "ACCIDENT", "lat": 12.9352, "lng": 77.6245 } }
  ```

### 3.2 Server $\to$ Client Events
- **`dispatch:offer`**: Broadcast incoming order to assigned rider.
  ```json
  {
    "event": "dispatch:offer",
    "data": {
      "orderId": "FA2841",
      "restaurantName": "Biryani Box Cloud Kitchen",
      "pickupDistanceKm": 1.2,
      "deliveryDistanceKm": 3.8,
      "payout": 122.0,
      "expiresAt": 1790487000
    }
  }
  ```
- **`weather:surge_alert`**: Broadcast live weather updates and surge increments.
  ```json
  {
    "event": "weather:surge_alert",
    "data": { "condition": "RAIN", "surgeAmount": 25.0, "zone": "Koramangala", "activeUntil": 1790494200 }
  }
  ```

---

## 4. Swapping Mock Services to Real HTTP Client

All mock services reside in `src/services/`. Transitioning to production APIs requires replacing mock functions with HTTP calls using standard patterns:

```typescript
// Example: src/services/orderService.ts production transition
import { apiClient } from '@/services/apiClient';
import type { Order, DeliveryStage } from '@/types';

export const orderService = {
  async getActiveOrder(): Promise<Order | null> {
    const res = await apiClient.get<Order | null>('/orders/active');
    return res.data.data;
  },

  async verifyDeliveryOtp(orderId: string, otp: string): Promise<boolean> {
    const res = await apiClient.post<{ verified: boolean }>(`/orders/${orderId}/verify-otp`, { otp });
    return res.data.data.verified;
  }
};
```
