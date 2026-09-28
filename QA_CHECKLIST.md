# FEAzTO Rider — Comprehensive QA Checklist

This checklist defines the rigorous quality assurance gates for the **FEAzTO Rider native mobile application** before staging and production release.

---

## 1. Engine & Static Analysis Gates

| Test ID | Gate / Verification Item | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **QA-ENG-01** | TypeScript strict compilation (`npx tsc --noEmit`) | 0 type errors across all routes, components, and stores | ✅ PASSED |
| **QA-ENG-02** | Expo Doctor health check (`npx expo-doctor`) | 21/21 dependency, SDK 57, and config checks passed | ✅ PASSED |
| **QA-ENG-03** | Expo Router route map integrity | All 35 route paths resolve without dead links or missing exports | ✅ PASSED |
| **QA-ENG-04** | Package compatibility | Zero deprecated or incompatible packages in `package.json` | ✅ PASSED |

---

## 2. Visual Design & Mobile Viewport Matrix

All screens tested on standard native viewport dimensions:
- **iPhone 13 mini** (375 × 812 pt)
- **iPhone 14 / 15** (390 × 844 pt)
- **iPhone 15 Pro / 16** (393 × 852 pt)
- **Samsung Galaxy S21 / S22** (360 × 800 dp)
- **Google Pixel 7 / 8** (412 × 915 dp)

| Test ID | Visual Criterion | Standard / Verification | Status |
| :--- | :--- | :--- | :--- |
| **QA-VIS-01** | Strict Dark Palette | Background `#0B0B0B`, Surface `#141414`, Border `#2A2A2A` strictly used; 0 white flash | ✅ PASSED |
| **QA-VIS-02** | Brand Identity | FEAzTO Accent `#F5B700` applied to primary actions, active tabs, and key badges | ✅ PASSED |
| **QA-VIS-03** | Touch Target Compliance | All interactive touch targets (buttons, pills, inputs) $\ge 44 \times 44\text{pt}$ | ✅ PASSED |
| **QA-VIS-04** | Safe Area Insets | Proper padding for iOS Dynamic Island / notch and Android system navigation bar | ✅ PASSED |
| **QA-VIS-05** | Typography Hierarchy | Legible font weights and sizes across small and large viewport densities | ✅ PASSED |

---

## 3. Authentication & Verification Matrix

| Test ID | Scenario | Expected Behavior | Status |
| :--- | :--- | :--- | :--- |
| **QA-AUTH-01** | Splash Routing | Unauthenticated riders redirect to Sign-In within 1.5 seconds | ✅ PASSED |
| **QA-AUTH-02** | 10-Digit Mobile Input | Allows only valid Indian numbers; disables button until 10 digits entered | ✅ PASSED |
| **QA-AUTH-03** | OTP 4-Box Entry | Digits auto-advance; dev shortcut ("1234") fills and triggers submission | ✅ PASSED |
| **QA-AUTH-04** | 30s OTP Resend Timer | Countdown timer prevents spamming resend; re-enables after 30 seconds | ✅ PASSED |
| **QA-AUTH-05** | Clearance Status `APPROVED` | Displays green badge and immediate entry CTA to Rider Home hub | ✅ PASSED |
| **QA-AUTH-06** | Clearance Status `PENDING` | Displays yellow pending banner, SLA timeframe, and WhatsApp support link | ✅ PASSED |
| **QA-AUTH-07** | Clearance Status `CORRECTION` | Highlights specific flagged documents with direct jump-to-fix links | ✅ PASSED |

---

## 4. Onboarding Wizard Multi-Step Flow

| Test ID | Step | Validation Criteria | Status |
| :--- | :--- | :--- | :--- |
| **QA-ONB-01** | 1. Personal Details | Validates full name, blood group selection, and mandatory emergency contact phone | ✅ PASSED |
| **QA-ONB-02** | 2. Driving Licence | Validates 15-char DL format and requires both front and back card uploads | ✅ PASSED |
| **QA-ONB-03** | 3. Vehicle Selection | EV Scooter correctly highlights green surge bonus (+₹5/order); Petrol/Cycle selectable | ✅ PASSED |
| **QA-ONB-04** | 4. Compliance Docs | Requires RC, Commercial Insurance, and PUC card confirmations | ✅ PASSED |
| **QA-ONB-05** | 5. Bank & UPI | Auto-looks up IFSC (`HDFC0001234`); validates standard UPI ID formats | ✅ PASSED |
| **QA-ONB-06** | 6. Review & Jump-Edit | Accordion displays all answers; edit buttons return to target step without data loss | ✅ PASSED |
| **QA-ONB-07** | Dual Submission | Supports both "Submit for Review" (Pending) and "Instant Approval (Dev)" | ✅ PASSED |

---

## 5. Duty Hub & Shift Management

| Test ID | Feature | Expected Behavior | Status |
| :--- | :--- | :--- | :--- |
| **QA-DUTY-01** | Safety Check Modal | Toggling Online triggers mandatory Helmet & Gear confirmation modal | ✅ PASSED |
| **QA-DUTY-02** | Online Radar State | When Online, pulsating radar visualizes active order listening mode | ✅ PASSED |
| **QA-DUTY-03** | Offline State | When Offline, orders cannot be received; displays home zone map and surge heatmap | ✅ PASSED |
| **QA-DUTY-04** | Shift Slot Booking | Riders can view shifts, guaranteed earnings (e.g. ₹750), and reserve available slots | ✅ PASSED |

---

## 6. Order Lifecycle (`#FA2841`) Execution

| Test ID | Lifecycle Stage | Expected Action & Outcome | Status |
| :--- | :--- | :--- | :--- |
| **QA-ORD-01** | Dispatch Offer | Bottom sheet offer displays Order `#FA2841`, ₹122 payout, and 30s countdown | ✅ PASSED |
| **QA-ORD-02** | Offer Acceptance | Tapping "Accept Order" transitions rider to `ON_DELIVERY` and opens Delivery screen | ✅ PASSED |
| **QA-ORD-03** | Navigate to Kitchen | Shows "Biryani Box Cloud Kitchen", distance (1.2 km), and native Maps launch button | ✅ PASSED |
| **QA-ORD-04** | Arrived at Kitchen | Advances status to `ARRIVED_AT_KITCHEN`; reveals 3-item order checklist | ✅ PASSED |
| **QA-ORD-05** | Food Pickup | Rider confirms parcel handoff and thermal bag sealing $\to$ advances to `PICKED_UP` | ✅ PASSED |
| **QA-ORD-06** | Navigate to Customer | Shows customer address "Prestige Acropolis", instructions, and masked call button | ✅ PASSED |
| **QA-ORD-07** | Arrived at Customer | Advances status to `ARRIVED_AT_CUSTOMER`; prompts for Customer Delivery OTP | ✅ PASSED |
| **QA-ORD-08** | OTP Verification | Rejects wrong OTP; validates canonical OTP **`4821`** | ✅ PASSED |
| **QA-ORD-09** | Order Settlement | Displays celebration card with ₹122 breakdown; automatically credits wallet | ✅ PASSED |

---

## 7. Dynamic Incentives & Earnings Wallet

| Test ID | Component | Expected Behavior | Status |
| :--- | :--- | :--- | :--- |
| **QA-INC-01** | Weather Switcher | Toggling between Normal / Rain / Heavy Rain / Heat / Storm updates surge amounts | ✅ PASSED |
| **QA-INC-02** | Milestone Trackers | Progress bars visually reflect orders completed vs daily target (e.g., 6/10 orders) | ✅ PASSED |
| **QA-EARN-01** | Central Arithmetic | Base Pay + Rain Surge + Peak + Tips sum correctly with zero UI drift | ✅ PASSED |
| **QA-EARN-02** | Instant UPI Cashout | Initiates cashout to `rider@okhdfcbank`, deducts balance, and shows IMPS Txn ID | ✅ PASSED |

---

## 8. Safety, Wellbeing & Emergency SOS

| Test ID | Safety Feature | Verification Result | Status |
| :--- | :--- | :--- | :--- |
| **QA-SAF-01** | 15-Minute Rest Break | Duty pauses to `ON_BREAK`; timer counts down; resumes duty without penalty | ✅ PASSED |
| **QA-SAF-02** | Pre-Ride Checklist | 4 safety check toggles (brakes, tyres, lights, bag) toggle reliably | ✅ PASSED |
| **QA-SAF-03** | Roadside SOS Modal | Red button requires 2-step confirmation to prevent accidental triggers | ✅ PASSED |
| **QA-SAF-04** | Emergency Shortcuts | Direct call links for Police (112), Ambulance (108), and Emergency Contact | ✅ PASSED |
