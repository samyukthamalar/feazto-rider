/**
 * Screen 3: Document Authentication
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 3)
 * "Rider uploads a document photo (demo)."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { WorkflowBar } from '../../src/components/common/WorkflowBar';
import { colors } from '../../src/constants/colors';
import { spacing } from '../../src/constants/spacing';
import { typography } from '../../src/constants/typography';
import { useUIStore } from '../../src/store/uiStore';

export default function DocumentAuthScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);

  const [dlUploaded, setDlUploaded] = useState(true);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(true);
  const [selfieUploaded, setSelfieUploaded] = useState(true);

  const handleUploadAll = () => {
    showToast('Documents uploaded successfully! Processing verification...', 'success');
    router.push('/(auth)/verification-process' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WorkflowBar currentStep={3} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Document Verification</Text>
          <Text style={styles.subtitle}>
            Upload your documents to get verified.
          </Text>
        </View>

        {/* Document Items List */}
        <View style={styles.docsList}>
          {/* 1. Driving License */}
          <TouchableOpacity
            style={[styles.docCard, dlUploaded && styles.docCardActive]}
            onPress={() => {
              setDlUploaded(!dlUploaded);
              showToast(dlUploaded ? 'Driving License removed' : 'Driving License attached', 'info');
            }}
          >
            <View style={styles.docIconBox}>
              <Ionicons name="card-outline" size={24} color="#111827" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Driving License</Text>
              <Text style={styles.docSub}>(Front & Back)</Text>
            </View>
            <View style={[styles.statusPill, dlUploaded && styles.statusPillSuccess]}>
              <Text style={[styles.statusPillText, dlUploaded && styles.statusPillTextSuccess]}>
                {dlUploaded ? '✓ Uploaded' : 'Upload'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* 2. Aadhaar Card */}
          <TouchableOpacity
            style={[styles.docCard, aadhaarUploaded && styles.docCardActive]}
            onPress={() => {
              setAadhaarUploaded(!aadhaarUploaded);
              showToast(aadhaarUploaded ? 'Aadhaar removed' : 'Aadhaar Card attached', 'info');
            }}
          >
            <View style={styles.docIconBox}>
              <Ionicons name="document-text-outline" size={24} color="#111827" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Aadhaar Card</Text>
              <Text style={styles.docSub}>(Front)</Text>
            </View>
            <View style={[styles.statusPill, aadhaarUploaded && styles.statusPillSuccess]}>
              <Text style={[styles.statusPillText, aadhaarUploaded && styles.statusPillTextSuccess]}>
                {aadhaarUploaded ? '✓ Uploaded' : 'Upload'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* 3. Selfie with ID */}
          <TouchableOpacity
            style={[styles.docCard, selfieUploaded && styles.docCardActive]}
            onPress={() => {
              setSelfieUploaded(!selfieUploaded);
              showToast(selfieUploaded ? 'Selfie removed' : 'Selfie with ID attached', 'info');
            }}
          >
            <View style={styles.docIconBox}>
              <Ionicons name="camera-outline" size={24} color="#111827" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Selfie with ID</Text>
              <Text style={styles.docSub}>Clear face capture</Text>
            </View>
            <View style={[styles.statusPill, selfieUploaded && styles.statusPillSuccess]}>
              <Text style={[styles.statusPillText, selfieUploaded && styles.statusPillTextSuccess]}>
                {selfieUploaded ? '✓ Uploaded' : 'Upload'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Upload Documents"
            onPress={handleUploadAll}
            style={styles.uploadBtn}
          />
          <Text style={styles.captionText}>
            Rider uploads a document photo (demo).
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  header: {
    marginVertical: 12,
  },
  title: {
    ...typography.h2,
    fontSize: 24,
    color: '#111827',
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 4,
  },
  docsList: {
    gap: 14,
    marginVertical: 16,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  docCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  docIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  docSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  statusPillSuccess: {
    backgroundColor: '#D1FAE5',
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  statusPillTextSuccess: {
    color: '#065F46',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  uploadBtn: {
    width: '100%',
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
