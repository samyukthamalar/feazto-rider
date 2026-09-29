/**
 * Screen 11: Navigate to Customer
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 11)
 * "Track delivery location and navigate to customer."
 */

import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapRouteGraphic } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { typography } from '../src/constants/typography';
import { useOrderStore } from '../src/store/orderStore';
import { useUIStore } from '../src/store/uiStore';
import { orderService } from '../services';

export default function NavigateCustomerScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0.2);
  const [distanceKm, setDistanceKm] = useState(2.4);
  const [etaMins, setEtaMins] = useState(8);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Request & read real device location
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          if (isMounted && loc?.coords) {
            setGpsCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
          }
        } else {
          setGpsCoords({ lat: 13.0827, lng: 80.2107 });
        }
      } catch {
        setGpsCoords({ lat: 13.0827, lng: 80.2107 });
      }
    })();

    // Animate rider along route towards customer
    const interval = setInterval(() => {
      setRouteProgress((prev) => {
        if (prev >= 0.95) return 0.95;
        const next = Number((prev + 0.15).toFixed(2));
        setDistanceKm((d) => Math.max(0.3, Number((d - 0.4).toFixed(1))));
        setEtaMins((m) => Math.max(1, m - 1));
        return next;
      });
    }, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleStartNav = async () => {
    try {
      setLoading(true);
      await orderService.startDelivery('2FS28734');
      useOrderStore.getState().advanceStage();
      showToast('Arrived at customer drop-off area!', 'info');
      router.push('/arrive-destination' as any);
    } catch {
      router.push('/arrive-destination' as any);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Navigate to Customer</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Live GPS Status Pill */}
        {gpsCoords && (
          <View style={styles.gpsRow}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsText}>
              Live GPS: {gpsCoords.lat.toFixed(4)}° N, {gpsCoords.lng.toFixed(4)}° E • Chennai Central
            </Text>
          </View>
        )}

        {/* Map View with real animated progress */}
        <View style={styles.mapWrapper}>
          <MapRouteGraphic height={320} progress={routeProgress} />
        </View>

        {/* Floating Destination Bottom Card */}
        <View style={styles.bottomCard}>
          <View style={styles.locationHeaderRow}>
            <View style={styles.locationIconBox}>
              <Ionicons name="location" size={20} color="#EF4444" />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationTitle}>Customer: Arun Kumar</Text>
              <Text style={styles.addressLine}>12, Green Park Street, Chennai - 600028</Text>
              <Text style={styles.locationMeta}>{distanceKm} km • {etaMins} mins remaining</Text>
            </View>
          </View>

          <PrimaryButton
            title={loading ? "Approaching..." : "Arrive at Destination"}
            onPress={handleStartNav}
            loading={loading}
            style={styles.navBtn}
            icon={<Ionicons name="navigate" size={18} color="#111827" style={{ marginRight: 6 }} />}
          />
        </View>

        <Text style={styles.captionText}>
          Track delivery location and navigate to customer.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  mapWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 14,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  addressLine: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
    marginTop: 2,
  },
  locationMeta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  gpsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    alignSelf: 'flex-start',
  },
  gpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  gpsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  navBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});

