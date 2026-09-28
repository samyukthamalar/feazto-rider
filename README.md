# FEAzTO Rider Mobile Application

**Native Mobile Application for Delivery Partners (Expo SDK 57 + TypeScript + Expo Router + Responsive Layout)**

Built strictly to the **20-Screen Reference Workflow** (`media_1790577012839.jpg`).

---

## 1. 20-Screen Complete Sequence Reference

The application strictly implements every screen and flow from the reference workflow:

| Screen # | Screen Name | Route | Reference Description | Key UI & Functional Elements |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Splash Screen** | `/` | App logo and branding with loading screen. | FEAzTO logo, "Fast, Fresh, Reliable.", scooter rider graphic, loading spinner. |
| **2** | **Login / Sign Up** | `/(auth)/login` | Rider can login using phone number or sign up for a new account. | Phone & Password inputs, yellow "Login" CTA, Sign Up link, scooter rider graphic. |
| **3** | **Document Authentication** | `/(auth)/document-auth` | Rider uploads a document photo (demo). | Driving License, Aadhaar Card, Selfie with ID cards, yellow "Upload Documents" CTA. |
| **4** | **Verification Process** | `/(auth)/verification-process` | System verifies the document (demo). | Verified document graphic with green checkmark, "Document Verified!", yellow "Continue" CTA. |
| **5** | **Onboarding** | `/(onboarding)/onboarding` | Shows success message after verification. | User avatar with checkmark, "Welcome, Rider!", "You're all set", yellow "Get Started" CTA. |
| **6** | **Home Dashboard** | `/(tabs)` | Main dashboard with online status and quick actions. | FEAzTO brand, green "Online" toggle, Today's Orders card (5 Pending, ₹1,250, 4.8 Rating), "View Orders" CTA, quick action links, bottom tab bar. |
| **7** | **Order Received** | `/order-received` | New order notification with details. Rider accepts the order. | Order #2FS28734, 2 items • ₹286, Cloud Kitchen pickup $\to$ Customer drop (2.1 km • 8 min), yellow "Accept Order" CTA, "View Details". |
| **8** | **Receive Food from Cloud Kitchen** | `/pickup-qr` | Go to cloud kitchen, receive food and scan the order QR for verification. | Order QR code graphic, "Scan QR to verify order", yellow "Scan QR" CTA, "Skip (Demo)" link. |
| **9** | **Food Photo Capture** | `/food-photo` | Take photo of the food (optional for demo). | Bento food meal tray in viewfinder frame, yellow circular shutter button, "Retake" button. |
| **10** | **Start Delivery** | `/start-delivery` | After photo confirmation, start the delivery. | Green circle checkmark, "Order Verified!", "Food ready for delivery.", yellow "Start Delivery" CTA, order pill (#2FS28734, 2.4 km • 8 min). |
| **11** | **Navigate to Customer** | `/navigate-customer` | Track delivery location and navigate to customer. | Street map with blue route polyline and rider pin, bottom floating card "Customer Location, 2.4 km • 8 mins", yellow "Navigation" CTA. |
| **12** | **Arrive at Destination** | `/arrive-destination` | Reach the customer location. | "Customer Location: 12, Green Park Street, Chennai - 600028", yellow "Reached" CTA, radar pinpoint graphic. |
| **13** | **Call Customer** | `/call-customer` | Call the customer before delivery. | Avatar, Customer, "+91 98765 43210", yellow "Call" CTA, "Message" button, skip handover link. |
| **14** | **Confirm Before Delivery** | `/confirm-delivery` | Take final photo of the food before handing over. | Food tray photo preview, "Please confirm the food before handing over.", yellow "Confirm" CTA, "Retake" button. |
| **15** | **Deliver to Customer** | `/deliver-customer` | Complete delivery and mark as delivered. | Green checkmark, "Order delivered successfully!", "Customer received the order.", yellow "Finish" CTA. |
| **16** | **Order Completed** | `/order-completed` | Order successfully completed. | Celebration star trophy with sparkles, "Great Job!", "You've completed the order.", yellow "Go to Home" CTA. |
| **17** | **Order History** | `/(tabs)/orders` | View past orders and earnings. | Today / Week / Month tabs, delivered orders list (#2FS28734 ₹286, #2FS28733 ₹245, #2FS28732 ₹310), bottom tab bar. |
| **19** | **Earnings** | `/(tabs)/earnings` | Manage profile, KYC, payment details, support and more. | Today filter pill, big amount "₹1,250", 5 Deliveries, Delivery Earnings ₹1,050, Incentives ₹200, yellow "View Details" CTA, session logout button. |
| **20** | **Logout** | `/logout` | Logout option for security. | Scooter rider graphic, "You have been logged out successfully!", yellow "Login Again" CTA $\to$ returns to Screen 2. |

---

## 2. Interactive Workflow Navigator (`WorkflowBar`)

Every screen includes the persistent interactive `WorkflowBar` header:
- **Left Arrow (`<`)**: Jumps to previous screen in the reference flow.
- **Center Step Badge (`Step X of 20`)**: Tap to open a jump menu modal listing all 20 screens for instant navigation.
- **Right Arrow (`>`)**: Advances to next screen in the reference flow.

---

## 3. Technology Baseline
- **Framework:** React Native `0.86.3`
- **SDK:** Expo SDK `~57.0.25`
- **Routing:** Expo Router `~57.0.23` (File-based navigation with typed routes)
- **State Management:** Zustand `^5.0.3` (Auth, Rider Profile, Order lifecycle, UI Toast)
- **Language:** TypeScript `~6.0.3` (Zero type errors, strict compilation)
- **UI Design:** Pure high-contrast brand styling matching reference diagram (`#F5B700` golden yellow CTA, `#10B981` green success, `#FFFFFF` surface, `#111827` dark text)
- **Responsiveness:** Auto-scales across small phones (SE/Mini), standard phones, and large phablets, with centered max-width constraint for web preview.

---

## 4. How to Open and Run in VS Code

### Step 1: Open Folder in VS Code
1. Launch **Visual Studio Code**.
2. Press `Ctrl + K, Ctrl + O` (or **File $\to$ Open Folder...**).
3. Select:
   ```
   C:\Users\mmsam\.gemini\antigravity\scratch\feazto-rider
   ```

### Step 2: Open Terminal in VS Code
1. Press `` Ctrl + ` `` (or **Terminal $\to$ New Terminal**).
2. Confirm you are in the project folder:
   ```bash
   pwd
   # Expected: C:\Users\mmsam\.gemini\antigravity\scratch\feazto-rider
   ```

### Step 3: Run the Development Server
```bash
npx expo start -c
```
- `-c` clears the Metro bundler cache.
- The terminal will display an interactive Metro dashboard and a QR code.

---

## 5. How to View Output on Mobile via Expo Go

1. **Install Expo Go:**
   - **Android:** Download "Expo Go" from Google Play Store.
   - **iOS:** Download "Expo Go" from Apple App Store.
2. **Ensure Same Wi-Fi Network:**
   - Make sure your mobile phone and your computer are connected to the same local Wi-Fi network.
3. **Open the App:**
   - **Android:** Open Expo Go $\to$ Tap **"Scan QR code"** $\to$ Scan the QR code displayed in the VS Code terminal.
   - **iOS:** Open the native **Camera** app $\to$ Point at the QR code $\to$ Tap the "Open in Expo Go" banner.
4. **Direct URL:**
   - You can also enter the URL directly in Expo Go:
     ```
     exp://<YOUR_LOCAL_IP>:8081
     ```

---

## 6. How to View Output in Web Browser

To view the app in your browser on PC:
- Open `http://localhost:8081` in Chrome or Edge.
- Press `F12` and toggle the **Device Toolbar** (`Ctrl + Shift + M`) to simulate mobile phone screen sizes (e.g. iPhone 14 Pro, Pixel 7, Samsung Galaxy).

---

## 7. Verification & Health Checks

```bash
# 1. Strict TypeScript Check (0 errors)
npx tsc --noEmit

# 2. Expo Doctor SDK 57 Compatibility (21/21 passed)
npx expo-doctor
```
