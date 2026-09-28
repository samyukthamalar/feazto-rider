/**
 * FEAzTO Rider - 20-Screen Master Registry
 * Master export index mapping all 20 screens matching the reference workflow.
 */

// Step 1: Splash Screen
export { default as SplashScreen } from '../app/index';

// Step 2: Login / Sign Up
export { default as LoginScreen } from '../app/(auth)/login';

// Step 3: Document Authentication
export { default as DocumentAuthScreen } from '../app/(auth)/document-auth';

// Step 4: Verification Process
export { default as VerificationProcessScreen } from '../app/(auth)/verification-process';

// Step 5: Onboarding
export { default as OnboardingScreen } from '../app/(onboarding)/onboarding';

// Step 6: Home Dashboard
export { default as HomeDashboardScreen } from '../app/(tabs)/index';

// Step 7: Order Received
export { default as OrderReceivedScreen } from '../app/order-received';

// Step 8: Receive Food from Cloud Kitchen
export { default as PickupQRScreen } from '../app/pickup-qr';

// Step 9: Food Photo Capture
export { default as FoodPhotoScreen } from '../app/food-photo';

// Step 10: Start Delivery
export { default as StartDeliveryScreen } from '../app/start-delivery';

// Step 11: Navigate to Customer
export { default as NavigateCustomerScreen } from '../app/navigate-customer';

// Step 12: Arrive at Destination
export { default as ArriveDestinationScreen } from '../app/arrive-destination';

// Step 13: Call Customer
export { default as CallCustomerScreen } from '../app/call-customer';

// Step 14: Confirm Before Delivery
export { default as ConfirmDeliveryScreen } from '../app/confirm-delivery';

// Step 15: Deliver to Customer
export { default as DeliverCustomerScreen } from '../app/deliver-customer';

// Step 16: Order Completed
export { default as OrderCompletedScreen } from '../app/order-completed';

// Step 17: Order History
export { default as OrderHistoryScreen } from '../app/(tabs)/orders';

// Step 18: Earnings
export { default as EarningsScreen } from '../app/(tabs)/earnings';

// Step 19: Profile / Settings
export { default as ProfileScreen } from '../app/(tabs)/profile';

// Step 20: Logout
export { default as LogoutScreen } from '../app/logout';
