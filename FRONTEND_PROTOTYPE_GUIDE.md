# FEAzTO Rider Delivery App — Frontend Prototype Specification & Architecture

> **Frontend Prototype Status**: Complete, Production-Styled, and Demo-Ready for Physical Device Testing via **Expo Go**.
> **Expo SDK**: 57 (React Native 0.86.x, React 19.2.x, TypeScript 5.9.x, Hermes Engine)
> **Health Check**: `21/21` checks passed via `expo-doctor` | Zero TypeScript compiler errors (`tsc --noEmit`).

---

## 1. Executive Summary & Design System

The **FEAzTO Rider Delivery Application** is a high-fidelity, end-to-end mobile prototype designed specifically for gig-economy delivery partners. Built strictly frontend-first without requiring any active backend server, the application operates entirely self-contained with realistic asynchronous service layers, interactive states, and simulated hardware integrations (GPS tracking, QR scanning, camera viewfinder, call/SMS dialogs).

### Brand & Design System Foundations

- **Surface & Background**: Pure White (`#FFFFFF`) and Clean Modern Canvas (`#F8F9FA`).
- **Typography & High-Contrast Text**: Charcoal Black (`#111827`) and Secondary Slate (`#6B7280`).
- **Signature Accent & CTAs**: FEAzTO Golden Yellow (`#F5B700` / `#FEC602`) with active state press depth (`#E0A600`).
- **Status Colors**: Verified Emerald (`#10B981`), Urgent Danger (`#EF4444`), and Information Blue (`#3B82F6`).

```
+---------------------------------------------------------------------------------------+
|  Clean White Theme (#FFFFFF)   |   Black Text (#111827)   |   FEAzTO Yellow (#F5B700)  |
+---------------------------------------------------------------------------------------+
```

---

## 2. 20-Screen Canonical Workflow Mapping

Every screen strictly adheres to the 20-step reference sequence with interactive navigation, step progress indicators (`WorkflowBar`), and realistic state progressions:

| Step # | Screen Name | Route Path | Primary Action & State Transition |
| :---: | :--- | :--- | :--- |
| **1** | **Splash Screen** | `app/index.tsx` | Branded splash; checks auth session; "Get Started" navigates to Login. |
| **2** | **Login / Sign Up** | `app/(auth)/login.tsx` | Mobile authentication with toggleable Sign Up/Login modes; calls `authService.login()`. |
| **3** | **Document Authentication** | `app/(auth)/document-auth.tsx` | Interactive KYC document selection (Aadhaar, PAN, DL); calls `authService.uploadKycDocument()`. |
| **4** | **Verification Process** | `app/(auth)/verification-process.tsx` | Instant automated validation status badge; updates auth store to `APPROVED`. |
| **5** | **Onboarding** | `app/(onboarding)/onboarding.tsx` | Welcome greeting with rider identity badge; "Get Started" launches Home Dashboard. |
| **6** | **Home Dashboard** | `app/(tabs)/index.tsx` | Online/Offline toggle, live duty counter, pending orders, today's earnings, and quick menu. |
| **7** | **Order Received** | `app/order-received.tsx` | Sound-ready dispatch sheet with item breakdown and ₹286 payout; calls `orderService.acceptOrder()`. |
| **8** | **Receive Food from Kitchen** | `app/pickup-qr.tsx` | Simulated laser QR scanner targeting order package; calls `orderService.verifyPickupQr()`. |
| **9** | **Food Photo Capture** | `app/food-photo.tsx` | Viewfinder with shutter button, seal detection badge; calls `orderService.saveFoodPhoto()`. |
| **10** | **Start Delivery** | `app/start-delivery.tsx` | Verification checklist and navigation initiation; calls `orderService.startDelivery()`. |
| **11** | **Navigate to Customer** | `app/navigate-customer.tsx` | Live routing map visual, 2.4 km estimate; "Navigation" button advances route. |
| **12** | **Arrive at Destination** | `app/arrive-destination.tsx` | Radial geo-fence proximity radar (<20m); calls `orderService.markArrivedAtCustomer()`. |
| **13** | **Call Customer** | `app/call-customer.tsx` | Direct customer contact interface with simulated telephone and SMS confirmation dialogs. |
| **14** | **Confirm Before Delivery** | `app/confirm-delivery.tsx` | Final package inspection preview with Retake & Confirm actions; calls `orderService.confirmHandoverPhoto()`. |
| **15** | **Deliver to Customer** | `app/deliver-customer.tsx` | Successful delivery checkmark; automatically credits +₹286 to wallet via `earningsService`. |
| **16** | **Order Completed** | `app/order-completed.tsx` | Celebration trophy screen, trip summary, and payout badge; returns rider to active duty. |
| **17** | **Order History** | `app/(tabs)/orders.tsx` | Dynamic order log filtered by Today, Week, and Month; includes freshly completed deliveries. |
| **18** | **Earnings** | `app/(tabs)/earnings.tsx` | Dynamic payout balance, breakdown (distance, surge, incentives), and cycle selector. |
| **19** | **Profile / Settings** | `app/(tabs)/profile.tsx` | Rider credentials (RDR-8429), vehicle details, safety checks, shift stats, and Demo Drawer. |
| **20** | **Logout** | `app/logout.tsx` | Secure session teardown illustration; "Login Again" button redirects to Screen 2. |

---

## 3. Architecture & Service Layer Abstraction

All mock operations are cleanly encapsulated in `services/` and `services/mock/`. When the backend team is ready, **only the functions in these service files need to be swapped from mock timeouts to Axios API requests**. The UI components require **0 modifications**.

```
services/
├── api.ts                     # Central Axios client with bearer token interceptor & fallback
├── authService.ts             # login, uploadKycDocument, getVerificationStatus, logout
├── orderService.ts            # acceptOrder, verifyPickupQr, saveFoodPhoto, completeDelivery, etc.
├── riderService.ts            # getProfile, updateDutyStatus, updateLocation
├── earningsService.ts         # getEarningsSummary, creditOrderEarnings, resetEarnings
├── notificationService.ts     # getNotifications, markAsRead
├── index.ts                   # Unified barrel export
└── mock/
    ├── authMock.ts            # Mock authentication sessions and KYC payloads
    ├── orderMock.ts           # Canonical mock order (#2FS28734) and initial order history
    ├── riderMock.ts           # Karthik Ramanathan (RDR-8429), Ather 450X, rating 4.88
    └── earningsMock.ts        # Dynamic summaries for Today, This Week, and This Month
```

### State Management via Zustand Stores (`src/store/`)

- **`authStore.ts`**: Manages phone number, OTP, auth token, KYC approval state, and onboarding flags.
- **`orderStore.ts`**: Tracks delivery lifecycle state machine (`ASSIGNED` $\to$ `AT_PICKUP` $\to$ `IN_TRANSIT` $\to$ `DELIVERED`).
- **`riderStore.ts`**: Manages rider duty status (`ONLINE`, `OFFLINE`, `ON_BREAK`), shift metrics, and safety gear verification.
- **`uiStore.ts`**: Manages high-priority floating toasts and the persistent **Demo Control Panel**.

---

## 4. How to Run on Physical Devices with Expo Go

### Prerequisites
1. Install **Expo Go** from Google Play Store (Android) or Apple App Store (iOS).
2. Connect your mobile phone and development machine to the **same Wi-Fi network**.

### Launch Command
In your terminal, navigate to the project directory and run:

```powershell
cd C:\Users\mmsam\.gemini\antigravity\scratch\feazto-rider
npx expo start
```

### Options for Testing
- **Local Network**: Scan the terminal QR code using Expo Go (Android) or the iOS Camera app.
- **Tunnel Mode** (if on separate Wi-Fi networks, hotel/college Wi-Fi, or cellular data):
  ```powershell
  npx expo start --tunnel
  ```
- **Web Browser Preview**:
  ```powershell
  npx expo start --web
  ```

---

## 5. Blueprint for Backend Engineering Team

When connecting the real backend, the backend team should implement the following REST/WebSocket endpoints:

| Endpoint | Method | Expected Request Payload | Response Schema |
| :--- | :---: | :--- | :--- |
| `/api/auth/login` | `POST` | `{ phone: string, otp: string }` | `{ token: string, rider: RiderProfile }` |
| `/api/kyc/upload` | `POST` | `multipart/form-data (documentImage)` | `{ documentId: string, status: "APPROVED" }` |
| `/api/rider/duty` | `PATCH` | `{ isOnline: boolean }` | `{ status: "ONLINE" \| "OFFLINE" }` |
| `/api/orders/active` | `GET` | *Headers: Bearer Token* | `OrderDetailsObject` |
| `/api/orders/:id/accept` | `POST` | `{ orderId: string }` | `{ status: "ACCEPTED", pickupEta: string }` |
| `/api/orders/:id/verify-pickup`| `POST` | `{ qrContent: string }` | `{ matched: boolean, timestamp: string }` |
| `/api/orders/:id/start-delivery`| `POST` | `{ orderId: string }` | `{ status: "IN_TRANSIT" }` |
| `/api/orders/:id/deliver` | `POST` | `{ photoUrl?: string }` | `{ status: "DELIVERED", creditedAmount: number }` |
| `/api/earnings/summary` | `GET` | `?period=today\|week\|month` | `EarningsSummaryObject` |
