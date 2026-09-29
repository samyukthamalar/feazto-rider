/**
 * FEAzTO Rider - Vector Illustrations
 * High-fidelity components matching the illustrations in the reference workflow:
 * - Scooter Delivery Rider (Screens 1, 2, 20)
 * - Cloud Kitchen QR Code (Screen 8)
 * - Packed Meal Trays (Screens 9, 14)
 * - Map Delivery Route (Screen 11)
 * - Celebration Badge / Star (Screen 16)
 */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Svg, {
    Circle,
    Ellipse,
    Path,
    Text as SvgText
} from "react-native-svg";
import { colors } from "../../constants/colors";

/**
 * 1. Scooter Delivery Rider Illustration (Screens 1, 2, 20)
 * Uses high-res authentic rider asset matching the workflow reference.
 */
export const ScooterRiderIllustration: React.FC<{ size?: number }> = ({
  size = 280,
}) => {
  return (
    <View
      style={[
        styles.scooterContainer,
        {
          width: size,
          height: size * 0.74,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Image
        source={require("../../../assets/images/rider-scooter.png")}
        style={{ width: size, height: size * 0.74 }}
        resizeMode="contain"
      />
    </View>
  );
};

/**
 * 2. Cloud Kitchen Pickup QR Code (Screen 8)
 */
export const CloudKitchenQRCode: React.FC<{ size?: number }> = ({
  size = 180,
}) => {
  return (
    <View style={[styles.qrContainer, { width: size, height: size }]}>
      <View style={styles.qrInner}>
        {/* 4 corner position squares */}
        <View style={[styles.qrCorner, styles.qrCornerTL]}>
          <View style={styles.qrDot} />
        </View>
        <View style={[styles.qrCorner, styles.qrCornerTR]}>
          <View style={styles.qrDot} />
        </View>
        <View style={[styles.qrCorner, styles.qrCornerBL]}>
          <View style={styles.qrDot} />
        </View>

        {/* Matrix grid simulation */}
        <View style={styles.qrGrid}>
          <View style={styles.qrRow}>
            <View style={styles.block} />
            <View style={styles.space} />
            <View style={styles.block} />
            <View style={styles.block} />
          </View>
          <View style={styles.qrRow}>
            <View style={styles.space} />
            <View style={styles.block} />
            <View style={styles.space} />
            <View style={styles.block} />
          </View>
          <View style={styles.qrRow}>
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.space} />
            <View style={styles.space} />
          </View>
          <View style={styles.qrRow}>
            <View style={styles.space} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.space} />
          </View>
        </View>

        {/* Center brand badge */}
        <View style={styles.qrCenterBadge}>
          <Text style={styles.qrCenterText}>FZ</Text>
        </View>
      </View>
    </View>
  );
};

/**
 * 3. Packed Food Meal Box Illustration (Screens 9, 14)
 */
export const FoodBoxIllustration: React.FC<{ size?: number }> = ({
  size = 220,
}) => {
  return (
    <View
      style={[styles.foodBoxContainer, { width: size, height: size * 0.72 }]}
    >
      {/* Bento tray container */}
      <View style={styles.bentoTray}>
        <View style={styles.compartmentRow}>
          {/* Main Dish (Biryani / Rice) */}
          <View style={[styles.compartment, styles.compLarge]}>
            <Text style={styles.foodEmoji}>🍛</Text>
            <Text style={styles.compLabel}>Hyderabadi Dum</Text>
          </View>

          {/* Curries & Sides */}
          <View style={styles.compCol}>
            <View style={[styles.compartment, styles.compSmall]}>
              <Text style={styles.foodEmoji}>🥘</Text>
              <Text style={styles.compLabel}>Paneer Gravy</Text>
            </View>
            <View style={[styles.compartment, styles.compSmall]}>
              <Text style={styles.foodEmoji}>🥗</Text>
              <Text style={styles.compLabel}>Salad & Raita</Text>
            </View>
          </View>
        </View>

        {/* Sealed hygiene badge */}
        <View style={styles.hygieneTag}>
          <Text style={styles.hygieneText}>✓ SANITIZED & SEALED</Text>
        </View>
      </View>
    </View>
  );
};

/**
 * 4. Map Route Simulation Graphic (Screen 11)
 */
export const MapRouteGraphic: React.FC<{ height?: number; progress?: number }> = ({
  height = 260,
  progress = 0,
}) => {
  // Calculate marker coordinate based on route progress (0 to 1)
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  let markerBottom = 30;
  let markerLeft = 68;

  if (clampedProgress <= 0.4) {
    const p = clampedProgress / 0.4;
    markerBottom = 30 + p * 110;
    markerLeft = 68;
  } else if (clampedProgress <= 0.8) {
    const p = (clampedProgress - 0.4) / 0.4;
    markerBottom = 140;
    markerLeft = 68 + p * 134;
  } else {
    const p = (clampedProgress - 0.8) / 0.2;
    markerBottom = 140 + p * 80;
    markerLeft = 202;
  }

  return (
    <View style={[styles.mapContainer, { height }]}>
      {/* Background streets */}
      <View style={styles.streetGrid}>
        <View style={[styles.streetH, { top: 40 }]} />
        <View style={[styles.streetH, { top: 120 }]} />
        <View style={[styles.streetH, { top: 200 }]} />
        <View style={[styles.streetV, { left: 60 }]} />
        <View style={[styles.streetV, { left: 160 }]} />
        <View style={[styles.streetV, { left: 260 }]} />
      </View>

      {/* Blue Polyline route */}
      <View style={styles.routePath}>
        <View style={styles.routeLeg1} />
        <View style={styles.routeLeg2} />
        <View style={styles.routeLeg3} />
      </View>

      {/* Destination Pin */}
      <View style={styles.destPin}>
        <Ionicons name="location" size={32} color="#EF4444" />
        <View style={styles.destDot} />
      </View>

      {/* Moving Rider Marker following progress along polyline */}
      <View style={[styles.riderMarker, { bottom: markerBottom, left: markerLeft }]}>
        <View style={styles.markerCircle}>
          <Ionicons name="bicycle" size={20} color="#111827" />
        </View>
        <View style={styles.markerPulse} />
      </View>
    </View>
  );
};


/**
 * 5. Celebration Gold Star / Trophy (Screen 16)
 */
export const CelebrationIllustration: React.FC<{ size?: number }> = ({
  size = 110,
}) => {
  return (
    <View style={[styles.celebContainer, { width: size, height: size }]}>
      <View style={styles.starOuter}>
        <Text style={styles.starIcon}>🏆</Text>
      </View>
      <View style={styles.confetti1} />
      <View style={styles.confetti2} />
      <View style={styles.confetti3} />
      <View style={styles.confetti4} />
    </View>
  );
};

const styles = StyleSheet.create({
  scooterContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 12,
  },
  // QR Code Styles
  qrContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  qrInner: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCorner: {
    width: 36,
    height: 36,
    borderWidth: 4,
    borderColor: "#111827",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCornerTL: { top: 0, left: 0 },
  qrCornerTR: { top: 0, right: 0 },
  qrCornerBL: { bottom: 0, left: 0 },
  qrDot: {
    width: 14,
    height: 14,
    backgroundColor: "#111827",
  },
  qrGrid: {
    gap: 6,
  },
  qrRow: {
    flexDirection: "row",
    gap: 6,
  },
  block: {
    width: 12,
    height: 12,
    backgroundColor: "#111827",
    borderRadius: 2,
  },
  space: {
    width: 12,
    height: 12,
  },
  qrCenterBadge: {
    position: "absolute",
    width: 32,
    height: 32,
    backgroundColor: colors.brandYellow,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCenterText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#111827",
  },

  // Food Box Styles
  foodBoxContainer: {
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  bentoTray: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 8,
    position: "relative",
  },
  compartmentRow: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  compartment: {
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#475569",
  },
  compLarge: {
    flex: 1.2,
  },
  compCol: {
    flex: 1,
    gap: 6,
  },
  compSmall: {
    flex: 1,
  },
  foodEmoji: {
    fontSize: 28,
  },
  compLabel: {
    fontSize: 9,
    color: "#E2E8F0",
    fontWeight: "700",
    marginTop: 2,
  },
  hygieneTag: {
    position: "absolute",
    bottom: -6,
    right: 8,
    backgroundColor: colors.brandYellow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#111827",
  },
  hygieneText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#111827",
  },

  // Map Route Styles
  mapContainer: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  streetGrid: {
    ...StyleSheet.absoluteFill,
  },
  streetH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: "#F3F4F6",
  },
  streetV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: "#F3F4F6",
  },
  routePath: {
    ...StyleSheet.absoluteFill,
  },
  routeLeg1: {
    position: "absolute",
    bottom: 40,
    left: 80,
    width: 6,
    height: 110,
    backgroundColor: "#2563EB",
    borderRadius: 3,
  },
  routeLeg2: {
    position: "absolute",
    top: 110,
    left: 80,
    width: 140,
    height: 6,
    backgroundColor: "#2563EB",
    borderRadius: 3,
  },
  routeLeg3: {
    position: "absolute",
    top: 50,
    left: 214,
    width: 6,
    height: 66,
    backgroundColor: "#2563EB",
    borderRadius: 3,
  },
  destPin: {
    position: "absolute",
    top: 30,
    left: 202,
    alignItems: "center",
  },
  destDot: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  riderMarker: {
    position: "absolute",
    bottom: 30,
    left: 68,
    alignItems: "center",
    justifyContent: "center",
  },
  markerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.brandYellow,
    borderWidth: 2,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  markerPulse: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(245, 183, 0, 0.4)",
    zIndex: 1,
  },

  // Celebration Star Styles
  celebContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 12,
  },
  starOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FEF3C7",
    borderColor: colors.brandYellow,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    fontSize: 38,
  },
  confetti1: {
    position: "absolute",
    top: 4,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandYellow,
  },
  confetti2: {
    position: "absolute",
    top: 12,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  confetti3: {
    position: "absolute",
    bottom: 8,
    left: 14,
    width: 7,
    height: 7,
    borderRadius: 2,
    backgroundColor: "#3B82F6",
  },
  confetti4: {
    position: "absolute",
    bottom: 12,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
  },
});
