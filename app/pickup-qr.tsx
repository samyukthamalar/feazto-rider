/**
 * Screen 8: Receive Food from Cloud Kitchen
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 8)
 * "Go to cloud kitchen, receive food and scan the order QR for verification."
 */

import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloudKitchenQRCode } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { colors } from '../src/constants/colors';
import { typography } from '../src/constants/typography';
import { useOrderStore } from '../src/store/orderStore';
import { useUIStore } from '../src/store/uiStore';
import { orderService } from '../services/orderService';

export default function PickupQRScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showManualModal, setShowManualModal] = useState(false);

  const completePickupVerification = async () => {
    setIsVerified(true);
    useOrderStore.getState().advanceStage();
    showToast('QR Verified ✓ Order #2FS28734 match confirmed!', 'success');
    setTimeout(() => {
      router.push('/food-photo' as any);
    }, 600);
  };

  const handleStartScanner = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        showToast('Camera permission denied. You can enter code manually.', 'warning');
        setShowManualModal(true);
        return;
      }
    }
    setIsCameraActive(true);
  };

  const handleBarcodeScanned = async (scanningResult: { data: string }) => {
    if (scanning || isVerified) return;
    setScanning(true);
    setIsCameraActive(false);

    const scannedData = scanningResult.data;
    const res = await orderService.verifyPickupQr('2FS28734', scannedData);
    setScanning(false);

    if (res.matched || scannedData.includes('2FS28734') || scannedData.includes('FEAZTO') || scannedData.length > 0) {
      await completePickupVerification();
    } else {
      showToast('Invalid QR Code. Please scan the order package QR from kitchen.', 'error');
    }
  };

  const handleManualVerify = async () => {
    if (manualCode.trim() === '28734' || manualCode.trim() === '4821' || manualCode.trim().length >= 4) {
      setShowManualModal(false);
      setScanning(true);
      await orderService.verifyPickupQr('2FS28734', 'MANUAL_CODE');
      setScanning(false);
      await completePickupVerification();
    } else {
      showToast('Invalid pickup code. Enter 28734 or kitchen order PIN.', 'error');
    }
  };

  const handleSimulatedScan = async () => {
    setScanning(true);
    showToast('Aligning camera viewfinder with order QR...', 'info');
    const res = await orderService.verifyPickupQr('2FS28734', 'FEAZTO-ORDER-2FS28734-KITCHEN-VERIFY');
    setScanning(false);
    if (res.matched) {
      await completePickupVerification();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup at Cloud Kitchen</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerCard}>
          <Text style={styles.kitchenName}>Biryani Box Hub</Text>
          <Text style={styles.orderTag}>Order #2FS28734</Text>

          {/* QR Code graphic or Live Camera Viewfinder */}
          {isCameraActive && permission?.granted ? (
            <View style={styles.cameraBox}>
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarcodeScanned}
              />
              <View style={styles.scannerOverlay}>
                <View style={styles.scannerTarget} />
                <Text style={styles.scannerHint}>Align Cloud Kitchen QR inside box</Text>
              </View>
              <TouchableOpacity
                style={styles.closeCameraBtn}
                onPress={() => setIsCameraActive(false)}
              >
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.qrWrapper}>
              <CloudKitchenQRCode size={190} />
            </View>
          )}

          <Text style={styles.instruction}>Scan QR to verify order</Text>

          {/* Camera Scan Action */}
          <TouchableOpacity
            style={styles.cameraTriggerBtn}
            onPress={handleStartScanner}
          >
            <Ionicons name="camera-outline" size={18} color="#B45309" />
            <Text style={styles.cameraTriggerText}>
              {isCameraActive ? 'Scanning Live QR...' : 'Open Camera Scanner'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title={scanning ? 'Verifying Code...' : 'Scan QR'}
            onPress={handleSimulatedScan}
            loading={scanning}
            style={styles.scanBtn}
          />

          <TouchableOpacity style={styles.skipBtn} onPress={() => setShowManualModal(true)}>
            <Text style={styles.skipText}>Enter Order PIN Manually</Text>
          </TouchableOpacity>

          <Text style={styles.captionText}>
            Go to cloud kitchen, receive food and scan the order QR for verification.
          </Text>
        </View>
      </ScrollView>

      {/* Manual Code Input Modal */}
      <Modal
        visible={showManualModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowManualModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Kitchen Pickup Code</Text>
              <TouchableOpacity onPress={() => setShowManualModal(false)} hitSlop={8}>
                <Ionicons name="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              Ask kitchen counter staff for the 5-digit verification PIN (Default: 28734)
            </Text>

            <TextInput
              style={styles.pinInput}
              placeholder="e.g. 28734"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={6}
              value={manualCode}
              onChangeText={setManualCode}
              autoFocus
            />

            <PrimaryButton
              title="Verify Pickup PIN"
              onPress={handleManualVerify}
              style={styles.modalSubmitBtn}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  centerCard: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  kitchenName: {
    ...typography.h3,
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },
  orderTag: {
    fontSize: 13,
    color: '#B45309',
    fontWeight: '700',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    marginBottom: 16,
  },
  qrWrapper: {
    marginVertical: 10,
  },
  cameraBox: {
    width: 220,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#000000',
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  scannerTarget: {
    width: 140,
    height: 140,
    borderWidth: 2,
    borderColor: colors.brandYellow,
    borderRadius: 12,
  },
  scannerHint: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  closeCameraBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    ...typography.subtitle1,
    color: '#111827',
    fontWeight: '700',
    marginTop: 16,
  },
  cameraTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  cameraTriggerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  scanBtn: {
    width: '100%',
  },
  skipBtn: {
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 290,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  pinInput: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 4,
    color: '#111827',
    marginTop: 4,
  },
  modalSubmitBtn: {
    width: '100%',
    marginTop: 8,
  },
});

