# FEAzTO Rider Design System — Component Map

This document catalogs all reusable UI components, design tokens, domain cards, and interaction states for the **FEAzTO Rider Native Mobile Application** (Expo SDK 57 + TypeScript + React Native).

---

## 1. Design Tokens & Constants

### Colors (`src/constants/colors.ts`)
| Token Name | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `background` | `#0B0B0B` | Deep dark application background |
| `surface` | `#141414` | Primary card and container background |
| `secondarySurface` | `#1B1B1B` | Secondary elevated surface, modals, chips |
| `elevatedSurface` | `#222222` | Floating elements, toolbars |
| `border` | `#2A2A2A` | Primary card border |
| `borderLight` | `#3A3A3A` | Dividers, subtle borders |
| `borderFocus` | `#F5B700` | Input focus indicator |
| `brandYellow` | `#F5B700` | FEAzTO Signature yellow (CTA, highlights, active states) |
| `brandYellowSoft` | `#3A2E00` | Soft yellow tint for active/highlight cards |
| `textPrimary` | `#F4F4F4` | Primary readable headline/body text |
| `textSecondary` | `#9A9A9A` | Subtitles, labels, secondary metadata |
| `textMuted` | `#666666` | Micro copy, timestamps, inactive icons |
| `textInverse` | `#0B0B0B` | Contrast text on yellow/green buttons |
| `success` | `#55C271` | Online status, completed verification, green CTA |
| `danger` | `#FF5D5D` | Offline status, SOS trigger, error states |
| `info` | `#6EA8FF` | Rest break, navigation notes, system info |
| `warning` | `#FFA726` | Safety advisory, needs correction |

### Spacing & Layout (`src/constants/spacing.ts`)
- **Spacing Grid:** `xxs: 2`, `xs: 4`, `sm: 8`, `md: 12`, `lg: 16`, `xl: 20`, `xxl: 24`, `xxxl: 32`, `huge: 40`, `massive: 48`
- **Border Radii:** `xs: 4`, `sm: 8`, `md: 12`, `lg: 16`, `xl: 20`, `pill: 9999`
- **Touch Target Rule:** Minimum touch area of `44x44` points across all buttons, chips, and links.

### Typography (`src/constants/typography.ts`)
- `h1`: 28pt Bold, -0.5 letter spacing
- `h2`: 22pt Bold, -0.3 letter spacing
- `h3`: 18pt SemiBold
- `subtitle1`: 16pt SemiBold
- `subtitle2`: 14pt SemiBold
- `body1`: 15pt Regular, 22 line height
- `body2`: 13pt Regular, 18 line height
- `caption`: 11pt Medium
- `button`: 15pt Bold
- `statValue`: 26pt ExtraBold, brand yellow
- `badge`: 11pt Bold, uppercase

---

## 2. Component Catalog

### Brand Components
- **`FEAztoLogo`** (`src/components/brand/FEAztoLogo.tsx`)
  - **Props:** `size?: 'sm' | 'md' | 'lg' | 'hero'`, `showTagline?: boolean`, `showRiderBadge?: boolean`
  - **Description:** FEAzTO signature brand logo with contrasting brand yellow and "RIDER" partner tag.

### Base UI Components
- **`PrimaryButton`** (`src/components/common/PrimaryButton.tsx`)
  - **Props:** `title`, `onPress`, `disabled?`, `loading?`, `variant?: 'yellow' | 'green' | 'danger'`, `size?: 'sm' | 'md' | 'lg'`, `fullWidth?: boolean`, `icon?`
  - **Description:** High-contrast primary call-to-action button respecting the 44pt touch minimum.
- **`SecondaryButton`** (`src/components/common/SecondaryButton.tsx`)
  - **Props:** `title`, `onPress`, `disabled?`, `loading?`, `variant?: 'outline' | 'surface' | 'ghost'`, `tone?: 'default' | 'yellow' | 'danger'`, `size?: 'sm' | 'md' | 'lg'`
  - **Description:** Outlined or subtle surface button for secondary interactions.
- **`InputField`** (`src/components/common/InputField.tsx`)
  - **Props:** Standard `TextInputProps` plus `label?`, `error?`, `helper?`, `leftIcon?`, `rightIcon?`, `clearable?`, `onClear?`, `disabled?`
  - **Description:** Dark input field with yellow focus outline and error states.
- **`Card` / `GlassCard`** (`src/components/common/Card.tsx`)
  - **Props:** `variant?: 'surface' | 'secondary' | 'highlight' | 'glass'`, `onPress?`, `padding?`
  - **Description:** Controlled dark surface container with controlled radii and borders.
- **`SectionHeader`** (`src/components/common/SectionHeader.tsx`)
  - **Props:** `title`, `subtitle?`, `rightAction?`
  - **Description:** Standard section header with contextual right-side action link.
- **`StatusBadge`** (`src/components/common/StatusBadge.tsx`)
  - **Props:** `label`, `variant: 'online' | 'offline' | 'on_delivery' | 'on_break' | 'approved' | 'pending' | 'needs_correction'`, `size?: 'sm' | 'md'`, `pulse?: boolean`
  - **Description:** Live operational status badge with pulsating indicator dot.
- **`Pill`** (`src/components/common/Pill.tsx`)
  - **Props:** `label`, `tone?: 'yellow' | 'neutral' | 'green' | 'danger'`, `icon?`
  - **Description:** Compact chip for item counts, dietary badges (VEG/NON-VEG), and tags.
- **`ProgressBar`** (`src/components/common/ProgressBar.tsx`)
  - **Props:** `progress`, `total?`, `color?`, `height?`
  - **Description:** Rounded milestone indicator bar for incentive goals and shift progress.
- **`BottomSheetModal`** (`src/components/common/BottomSheetModal.tsx`)
  - **Props:** `visible`, `onClose`, `title?`, `children`
  - **Description:** Slide-up bottom sheet with handle, backdrop dismiss, and header.

### Domain Cards Suite
- **`OrderCard`** (`src/components/common/OrderCard.tsx`)
  - **Description:** Standard delivery order summary showing canonical order ID (`#FA2841`), status badge, pickup kitchen, drop destination, item count, distance, earnings, and action button.
- **`EarningsCard`** (`src/components/common/EarningsCard.tsx`)
  - **Description:** Financial performance card displaying accumulated net pay, trips completed, itemized breakdown (Base + Rain + Peak + Festival + Tips), and Instant Cashout CTA.
- **`IncentiveCard`** (`src/components/common/IncentiveCard.tsx`)
  - **Description:** Motivation booster card displaying campaign type (RAIN, FESTIVAL, PEAK, STREAK, WEEKLY), reward amount, progress bar, remaining targets, and expiration window.
- **`WeatherCard`** (`src/components/common/WeatherCard.tsx`)
  - **Description:** Operational weather card displaying condition (RAIN, HEAT, STORM), temperature, active rain bonus (+₹30/trip), and raincoat advisories.
- **`SafetyCard`** (`src/components/common/SafetyCard.tsx`)
  - **Description:** Mandatory pre-trip safety checklist (Helmet, Raincoat, Vehicle readiness) and rest break wellbeing tracker.
- **`SlotCard`** (`src/components/common/SlotCard.tsx`)
  - **Description:** Shift booking card showing shift hours (Morning, Afternoon, Evening, Night), capacity status (AVAILABLE, LIMITED, FULL), and demand surge bonuses.
- **`DocumentCard`** (`src/components/common/DocumentCard.tsx`)
  - **Description:** Onboarding compliance card for RC, Insurance, PUC, and Driving Licence with upload actions and verification status pills.
- **`NotificationCard`** (`src/components/common/NotificationCard.tsx`)
  - **Description:** Operational dispatch notification card with category tags and unread indicators.
- **`MapCard`** (`src/components/common/MapCard.tsx`)
  - **Description:** Route visualization card displaying simulated telemetry, ETA, distance, and destination markers (no fake live GPS).

### Async & Fallback States
- **`LoadingState`** (`src/components/common/LoadingState.tsx`): Spinner with branded status message.
- **`EmptyState`** (`src/components/common/EmptyState.tsx`): Empty list illustration with action CTA.
- **`ErrorState`** (`src/components/common/ErrorState.tsx`): Error message with retry action button.

### Developer Demo Panel
- **`DemoControlPanel`** (`src/components/common/DemoControlPanel.tsx`): Floating dev drawer (`__DEV__`) allowing instant simulation of Rider Status, Verification Clearance, Weather/Monsoon Surge, Order Lifecycle, and Environment Reset.
