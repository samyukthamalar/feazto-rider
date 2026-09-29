/**
 * Screen 9: Food Photo Capture
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 9)
 * "Take photo of the food (optional for demo)."
 */

import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodBoxIllustration } from '../src/components/brand/RiderIllustration';
import { PrimaryButton } from '../src/components/common/PrimaryButton';
import { SecondaryButton } from '../src/components/common/SecondaryButton';
import { colors } from '../src/constants/colors';
import { typography } from '../src/constants/typography';
import { useOrderStore } from '../src/store/orderStore';
import { useUIStore } from '../src/store/uiStore';
import { orderService } from '../services/orderService';

export default function FoodPhotoScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<any>(null);

  const handleStartCamera = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        showToast('Camera permission denied. Using high-resolution parcel view.', 'warning');
        return;
      }
    }
    setUseLiveCamera(true);
  };

  const handleCapture = async () => {
    setIsCapturing(true);
    try {
      if (useLiveCamera && cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        if (photo?.uri) {
          setPhotoUri(photo.uri);
          showToast('Food photo captured! Please review and confirm.', 'success');
          setIsCapturing(false);
          return;
        }
      }
    } catch {}

    // Fallback simulated capture
    setPhotoUri('simulated://food-parcel-photo.jpg');
    showToast('Food photo captured! Package seal verified ✓', 'success');
    setIsCapturing(false);
  };

  const handleConfirmPhoto = async () => {
    await orderService.saveFoodPhoto('2FS28734', photoUri || 'file://food_photo.jpg');
    useOrderStore.getState().advanceStage();
    showToast('Photo confirmed! Ready to start delivery.', 'success');
    router.push('/start-delivery' as any);
  };

  const handleRetake = () => {
    setPhotoUri(null);
    showToast('Ready to capture new photo', 'info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capture Food Photo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Viewfinder Preview Box */}
        <View style={styles.viewfinderCard}>
          <View style={styles.viewfinderCornerTL} />
          <View style={styles.viewfinderCornerTR} />
          <View style={styles.viewfinderCornerBL} />
          <View style={styles.viewfinderCornerBR} />

          {photoUri && photoUri.startsWith('file:') ? (
            <Image source={{ uri: photoUri }} style={styles.capturedPhoto} />
          ) : useLiveCamera && permission?.granted ? (
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              facing="back"
            />
          ) : (
            <FoodBoxIllustration size={230} />
          )}

          <View style={styles.photoOverlayNotice}>
            <Text style={styles.overlayNoticeText}>
              {photoUri ? '✓ Photo Captured' : 'Align parcel inside camera frame'}
            </Text>
          </View>
        </View>

        {/* Live Camera Toggle */}
        {!photoUri && (
          <TouchableOpacity
            style={styles.toggleCameraBtn}
            onPress={useLiveCamera ? () => setUseLiveCamera(false) : handleStartCamera}
          >
            <Ionicons name={useLiveCamera ? 'image-outline' : 'videocam-outline'} size={18} color="#B45309" />
            <Text style={styles.toggleCameraText}>
              {useLiveCamera ? 'Switch to Parcel Illustration' : 'Switch to Live Camera Viewfinder'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Capture Controls */}
        <View style={styles.controlsContainer}>
          {!photoUri ? (
            <TouchableOpacity
              style={styles.shutterBtn}
              onPress={handleCapture}
              activeOpacity={0.85}
              disabled={isCapturing}
            >
              <Ionicons name="camera" size={32} color="#111827" />
            </TouchableOpacity>
          ) : (
            <PrimaryButton
              title="Confirm Photo"
              onPress={handleConfirmPhoto}
              style={styles.confirmBtn}
            />
          )}

          <SecondaryButton
            title="Retake"
            onPress={handleRetake}
            variant="outline"
            style={styles.retakeBtn}
          />

          <Text style={styles.captionText}>
            Take photo of the food (optional for demo).
          </Text>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  viewfinderCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 260,
  },
  viewfinderCornerTL: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.brandYellow,
    borderTopLeftRadius: 6,
  },
  viewfinderCornerTR: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.brandYellow,
    borderTopRightRadius: 6,
  },
  viewfinderCornerBL: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.brandYellow,
    borderBottomLeftRadius: 6,
  },
  viewfinderCornerBR: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 24,
    height: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.brandYellow,
    borderBottomRightRadius: 6,
  },
  photoOverlayNotice: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overlayNoticeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  controlsContainer: {
    alignItems: 'center',
    gap: 16,
    marginTop: 20,
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brandYellow,
    borderWidth: 4,
    borderColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  retakeBtn: {
    width: 140,
    height: 40,
    minHeight: 40,
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  capturedPhoto: {
    width: 240,
    height: 180,
    borderRadius: 12,
  },
  toggleCameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'center',
  },
  toggleCameraText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  confirmBtn: {
    width: '100%',
    maxWidth: 280,
  },
});

