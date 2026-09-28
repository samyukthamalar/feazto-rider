/**
 * FEAzTO Rider - 20-Screen Workflow Manifest
 * Source of truth: FEAzTO Rider App Flow & Structure reference workflow
 */

export interface WorkflowScreen {
  step: number;
  title: string;
  subtitle: string;
  route: string;
  nextRoute?: string;
  prevRoute?: string;
}

export const WORKFLOW_SCREENS: WorkflowScreen[] = [
  {
    step: 1,
    title: 'Splash Screen',
    subtitle: 'App logo and branding with loading screen.',
    route: '/',
    nextRoute: '/(auth)/login',
  },
  {
    step: 2,
    title: 'Login / Sign Up',
    subtitle: 'Rider can login using phone number or sign up for a new account.',
    route: '/(auth)/login',
    prevRoute: '/',
    nextRoute: '/(auth)/document-auth',
  },
  {
    step: 3,
    title: 'Document Authentication',
    subtitle: 'Rider uploads a document photo (demo).',
    route: '/(auth)/document-auth',
    prevRoute: '/(auth)/login',
    nextRoute: '/(auth)/verification-process',
  },
  {
    step: 4,
    title: 'Verification Process',
    subtitle: 'System verifies the document (demo).',
    route: '/(auth)/verification-process',
    prevRoute: '/(auth)/document-auth',
    nextRoute: '/(onboarding)/onboarding',
  },
  {
    step: 5,
    title: 'Onboarding',
    subtitle: 'Shows success message after verification.',
    route: '/(onboarding)/onboarding',
    prevRoute: '/(auth)/verification-process',
    nextRoute: '/(tabs)',
  },
  {
    step: 6,
    title: 'Home Dashboard',
    subtitle: 'Main dashboard with online status and quick actions.',
    route: '/(tabs)',
    prevRoute: '/(onboarding)/onboarding',
    nextRoute: '/order-received',
  },
  {
    step: 7,
    title: 'Order Received',
    subtitle: 'New order notification with details. Rider accepts the order.',
    route: '/order-received',
    prevRoute: '/(tabs)',
    nextRoute: '/pickup-qr',
  },
  {
    step: 8,
    title: 'Receive Food from Cloud Kitchen',
    subtitle: 'Go to cloud kitchen, receive food and scan the order QR for verification.',
    route: '/pickup-qr',
    prevRoute: '/order-received',
    nextRoute: '/food-photo',
  },
  {
    step: 9,
    title: 'Food Photo Capture',
    subtitle: 'Take photo of the food (optional for demo).',
    route: '/food-photo',
    prevRoute: '/pickup-qr',
    nextRoute: '/start-delivery',
  },
  {
    step: 10,
    title: 'Start Delivery',
    subtitle: 'After photo confirmation, start the delivery.',
    route: '/start-delivery',
    prevRoute: '/food-photo',
    nextRoute: '/navigate-customer',
  },
  {
    step: 11,
    title: 'Navigate to Customer',
    subtitle: 'Track delivery location and navigate to customer.',
    route: '/navigate-customer',
    prevRoute: '/start-delivery',
    nextRoute: '/arrive-destination',
  },
  {
    step: 12,
    title: 'Arrive at Destination',
    subtitle: 'Reach the customer location.',
    route: '/arrive-destination',
    prevRoute: '/navigate-customer',
    nextRoute: '/call-customer',
  },
  {
    step: 13,
    title: 'Call Customer',
    subtitle: 'Call the customer before delivery.',
    route: '/call-customer',
    prevRoute: '/arrive-destination',
    nextRoute: '/confirm-delivery',
  },
  {
    step: 14,
    title: 'Confirm Before Delivery',
    subtitle: 'Take final photo of the food before handing over.',
    route: '/confirm-delivery',
    prevRoute: '/call-customer',
    nextRoute: '/deliver-customer',
  },
  {
    step: 15,
    title: 'Deliver to Customer',
    subtitle: 'Complete delivery and mark as delivered.',
    route: '/deliver-customer',
    prevRoute: '/confirm-delivery',
    nextRoute: '/order-completed',
  },
  {
    step: 16,
    title: 'Order Completed',
    subtitle: 'Order successfully completed.',
    route: '/order-completed',
    prevRoute: '/deliver-customer',
    nextRoute: '/(tabs)/orders',
  },
  {
    step: 17,
    title: 'Order History',
    subtitle: 'View past orders and earnings.',
    route: '/(tabs)/orders',
    prevRoute: '/order-completed',
    nextRoute: '/(tabs)/earnings',
  },
  {
    step: 19,
    title: 'Earnings',
    subtitle: 'Manage profile, KYC, payment details, support and more.',
    route: '/(tabs)/earnings',
    prevRoute: '/(tabs)/orders',
    nextRoute: '/logout',
  },
  {
    step: 20,
    title: 'Logout',
    subtitle: 'Logout option for security.',
    route: '/logout',
    prevRoute: '/(tabs)/earnings',
    nextRoute: '/(auth)/login',
  },
];
