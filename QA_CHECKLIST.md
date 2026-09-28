# FEAzTO Rider Delivery App — 20-Screen Reference QA Checklist

This QA checklist verifies that the **FEAzTO Rider Application** strictly matches the attached **20-Screen Reference Workflow** (`media_1790577012839.jpg`) across visual fidelity, functional interactivity, navigation sequence, and technical stability.

---

## 1. Engine & Static Analysis Gates

| Test ID | Gate / Verification Item | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| **QA-ENG-01** | TypeScript Strict Check (`npx tsc --noEmit`) | 0 type errors across all 20 screens, context, services, and components | ✅ PASSED |
| **QA-ENG-02** | Expo Doctor Health Check (`npx expo-doctor`) | 21/21 checks passed; zero SDK 57 mismatches | ✅ PASSED |
| **QA-ENG-03** | Metro Bundler Compilation | Bundled with React Native Web and mobile support at `http://localhost:8081` | ✅ PASSED |
| **QA-ENG-04** | Brand Integrity | Zero occurrences of legacy names; `FEAzTO` used everywhere | ✅ PASSED |

---

## 2. 20-Screen Reference Visual & Functional Conformance

| Step | Screen | Expected Appearance & Actions | Status |
|:---:|:---|:---|:---:|
| **1** | **Splash Screen** | White background, FEAzTO logo, "Fast, Fresh, Reliable.", scooter rider graphic, loading spinner $\to$ auto-routes to Login. | ✅ VERIFIED |
| **2** | **Login / Sign Up** | "Welcome Back", Phone & Password inputs, yellow "Login" CTA, "Don't have an account? Sign Up" link, scooter illustration. | ✅ VERIFIED |
| **3** | **Document Authentication** | "Document Verification", 3 cards (Driving License, Aadhaar Card, Selfie with ID), yellow "Upload Documents" CTA. | ✅ VERIFIED |
| **4** | **Verification Process** | Document sheet graphic with green checkmark, "Document Verified!", yellow "Continue" CTA $\to$ routes to Onboarding. | ✅ VERIFIED |
| **5** | **Onboarding** | Avatar with verified badge, "Welcome, Rider!", "You're all set to start delivering.", yellow "Get Started" CTA $\to$ routes to Dashboard. | ✅ VERIFIED |
| **6** | **Home Dashboard** | FEAzTO with green "Online" toggle, Today's Orders card (5 Pending, ₹1,250 Earnings, 4.8 Rating), yellow "View Orders" CTA, quick links, tab bar. | ✅ VERIFIED |
| **7** | **Order Received** | "New Order" header, Order #2FS28734 (2 Items • ₹286), Cloud Kitchen $\to$ Customer (2.1 km • 8 min), yellow "Accept Order" CTA, "View Details". | ✅ VERIFIED |
| **8** | **Receive Food from Cloud Kitchen** | "Pickup at Cloud Kitchen", large QR code graphic, "Scan QR to verify order", yellow "Scan QR" CTA, "Skip (Demo)" link. | ✅ VERIFIED |
| **9** | **Food Photo Capture** | "Capture Food Photo", viewfinder showing bento meal food trays, yellow circular shutter button, "Retake" button. | ✅ VERIFIED |
| **10** | **Start Delivery** | Green checkmark circle, "Order Verified!", "Food ready for delivery.", yellow "Start Delivery" CTA, order pill #2FS28734 (2.4 km • 8 mins). | ✅ VERIFIED |
| **11** | **Navigate to Customer** | "Navigate to Customer", street map with blue route polyline and rider pin, floating card "Customer Location (2.4 km • 8 mins)", yellow "Navigation" CTA. | ✅ VERIFIED |
| **12** | **Arrive at Destination** | "Customer Location: 12, Green Park Street, Chennai - 600028", yellow "Reached" CTA, radar pinpoint graphic. | ✅ VERIFIED |
| **13** | **Call Customer** | "Contact Customer", avatar, Customer, phone "+91 98765 43210", yellow "Call" CTA, "Message" button, skip handover link. | ✅ VERIFIED |
| **14** | **Confirm Before Delivery** | "Confirm Delivery", food photo preview, "Please confirm the food before handing over.", yellow "Confirm" CTA, "Retake" button. | ✅ VERIFIED |
| **15** | **Deliver to Customer** | "Delivery Completed", green checkmark, "Order delivered successfully!", "Customer received the order.", yellow "Finish" CTA. | ✅ VERIFIED |
| **16** | **Order Completed** | "Order Completed", golden celebration star trophy with sparkles, "Great Job!", "You've completed the order.", yellow "Go to Home" CTA. | ✅ VERIFIED |
| **17** | **Order History** | "Order History", Today \| Week \| Month tabs, delivered orders (#2FS28734 ₹286, #2FS28733 ₹245, #2FS28732 ₹310), bottom tab bar. | ✅ VERIFIED |
| **18** | **Earnings** | "Earnings", Today filter pill, big amount "₹1,250", 5 Deliveries, Delivery Earnings ₹1,050, Incentives ₹200, yellow "View Details" CTA. | ✅ VERIFIED |
| **19** | **Profile / Settings** | "Rider Profile & Settings", Partner ID (RDR-8429), verification badge, rating, KYC, vehicle, bank, safety, support, and logout. | ✅ VERIFIED |
| **20** | **Logout** | Scooter rider graphic, "You have been logged out successfully!", yellow "Login Again" CTA $\to$ returns to Screen 2. | ✅ VERIFIED |

---

## 3. Design System & Theme Conformance

- **Background:** White (`#FFFFFF`) and Light Canvas (`#F8F9FA`).
- **Main Text:** Black / Slate (`#111827`).
- **Buttons & Highlights:** FEAzTO Golden Yellow (`#F5B700`) with dark text (`#111827`).
- **Cards & Borders:** Clean rounded cards with subtle border `#E5E7EB`.
- **Responsive Layout:** Centers on wide desktop screens (max width 480px), full bleed on iOS and Android devices.
- **WorkflowBar:** Embedded at the top of every screen to navigate step-by-step or jump to any screen instantly.
