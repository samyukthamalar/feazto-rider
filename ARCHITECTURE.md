# FEAzTO Rider — Technical Architecture

This document outlines the system architecture, state boundaries, ecosystem integration, and technology layers for the **FEAzTO Rider Native Mobile Application**.

---

## 1. Platform Ecosystem & Data Ownership

FEAzTO operates as a unified food delivery ecosystem sharing a single canonical order definition:

```
[ FEAzTO USER APP ]
        │  Places Order (#FA2841)
        ▼
[ FEAzTO CLOUD KITCHEN APP ]
        │  Prepares & Marks Ready
        ▼
[ FEAzTO DISPATCH ENGINE ]
        │  Broadcasts Assignment
        ▼
[ FEAzTO RIDER APP ]
        │  Pick Up from Kitchen ──► Handover to Customer
        ▼
[ PLATFORM BACKEND / ADMIN ]
```

### Canonical Domain Ownership Rule
- **Canonical Order ID:** Single shared ID format (e.g. `#FA2841`). Never create disparate IDs for Kitchen, User, and Rider apps.
- **Order State:** Owned by the Platform Order Service.
- **Rider Duty State:** Owned by Rider Operations (`OFFLINE`, `ONLINE`, `ON_DELIVERY`, `ON_BREAK`).
- **Earnings & Payouts:** Owned by Finance Engine (`Base + Rain + Peak + Festival + Tips`).
- **Safety & Compliance:** Owned by Rider Safety Dispatch.

---

## 2. Multi-Store State Architecture (Zustand)

Rather than maintaining a single monolithic store, state is compartmentalized into dedicated, decoupled Zustand stores:

| Store Name | File Path | Responsibilities |
| :--- | :--- | :--- |
| `useAuthStore` | `src/store/authStore.ts` | Mobile authentication, OTP verification, verification status (`APPROVED`, `PENDING`, `NEEDS_CORRECTION`), onboarding status |
| `useRiderStore` | `src/store/riderStore.ts` | Rider profile, status (`ONLINE`, `OFFLINE`, `ON_BREAK`), safety gates (helmet check), shift statistics |
| `useOrderStore` | `src/store/orderStore.ts` | Active order (`#FA2841`), incoming delivery offers (`#FA2842`), delivery stages, order history |
| `useEarningsStore` | `src/store/earningsStore.ts` | Centralized earnings arithmetic, wallet balance, daily/weekly/monthly statistics, payout history, instant cashout |
| `useSlotStore` | `src/store/slotStore.ts` | Work shifts (Morning, Afternoon, Evening, Night), capacity indicators, booking actions |
| `useIncentiveStore`| `src/store/incentiveStore.ts` | Monsoon weather simulation, surge multipliers, active campaigns (Rain, Festival, Peak, Streak, Weekly) |
| `useUIStore` | `src/store/uiStore.ts` | Developer demo drawer (`__DEV__`), modal triggers, toast bus |

---

## 3. Service Abstraction & Future Backend Integration

Frontend UI components communicate strictly through service interfaces rather than raw HTTP clients:

```
[ React Native Screens & Components ]
                  │
                  ▼
         [ Service Contracts ]
        (AuthService, OrderService, DispatchService, RealtimeService, etc.)
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 [ Mock Implementations ]  [ Real API Clients ]
   (Development / Demo)    (Future Production: REST / GraphQL / WebSockets)
```

A backend engineer can swap:
```typescript
export const orderService: OrderService = new MockOrderService();
```
with:
```typescript
export const orderService: OrderService = new ApiOrderService(httpClient);
```
without touching any component JSX or screen business logic!

---

## 4. Navigation Structure (Expo Router)

The navigation tree uses file-based routing via `Expo Router`:
- `app/_layout.tsx`: Root Stack provider with theme, status bar, and floating dev drawer
- `app/index.tsx`: Branded splash screen and fast startup session router
- `app/(auth)/`: Authentication stack (Sign In, OTP, Verification Clearance)
- `app/(onboarding)/`: 5-step onboarding wizard with audit review
- `app/(tabs)/`: 4-tab core bottom navigation:
  - `index.tsx`: Operations Home (Availability, active dispatch, shift, weather surge, safety)
  - `orders.tsx`: Trips history and active order tracking
  - `earnings.tsx`: Daily breakdown, historical transfers, instant cashout
  - `profile.tsx`: Rider credentials, vehicles, settings
- Secondary contextual screens: `delivery.tsx`, `slots.tsx`, `incentives.tsx`, `safety.tsx`, `support.tsx`, `demo.tsx`, `design-system.tsx`.
