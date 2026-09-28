/**
 * FEAzTO Rider - 20-Screen Workflow Interactive Navigator
 * Renders a compact top bar showing current step (1 to 20),
 * allowing seamless next/prev navigation and direct jumping to any screen.
 */

import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { WORKFLOW_SCREENS, WorkflowScreen } from '../../navigation/workflow';

interface WorkflowBarProps {
  currentStep?: number;
}

export const WorkflowBar: React.FC<WorkflowBarProps> = ({ currentStep }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [modalVisible, setModalVisible] = useState(false);

  // Match current step from prop or pathname
  const current =
    WORKFLOW_SCREENS.find((s) => s.step === currentStep) ||
    WORKFLOW_SCREENS.find((s) => s.route === pathname) ||
    WORKFLOW_SCREENS[0];

  const handleSelectScreen = (screen: WorkflowScreen) => {
    setModalVisible(false);
    // @ts-ignore
    router.push(screen.route);
  };

  const handleNext = () => {
    if (current.nextRoute) {
      // @ts-ignore
      router.push(current.nextRoute);
    }
  };

  const handlePrev = () => {
    if (current.prevRoute) {
      // @ts-ignore
      router.push(current.prevRoute);
    }
  };

  return (
    <>
      <View style={styles.bar}>
        {current.prevRoute ? (
          <TouchableOpacity onPress={handlePrev} style={styles.navBtn} hitSlop={8}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navPlaceholder} />
        )}

        <TouchableOpacity
          style={styles.centerBadge}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.stepCircle}>
            <Text style={styles.stepNum}>{current.step}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {current.title}
          </Text>
          <Text style={styles.dropdownIcon}>▾</Text>
        </TouchableOpacity>

        {current.nextRoute ? (
          <TouchableOpacity onPress={handleNext} style={styles.navBtn} hitSlop={8}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navPlaceholder} />
        )}
      </View>

      {/* Screen Selector Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>FEAzTO 20-Screen Workflow</Text>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={8}>
                <Text style={styles.closeBtn}>✕</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.scrollList} contentContainerStyle={styles.listPadding}>
              {WORKFLOW_SCREENS.map((s) => {
                const isActive = s.step === current.step;
                return (
                  <TouchableOpacity
                    key={s.step}
                    style={[styles.itemRow, isActive && styles.itemRowActive]}
                    onPress={() => handleSelectScreen(s)}
                  >
                    <View style={[styles.itemStepCircle, isActive && styles.itemStepActive]}>
                      <Text style={[styles.itemStepText, isActive && styles.itemStepTextActive]}>{s.step}</Text>
                    </View>
                    <View style={styles.itemTextContainer}>
                      <Text style={[styles.itemTitle, isActive && styles.itemTitleActive]}>{s.title}</Text>
                      <Text style={styles.itemSubtitle} numberOfLines={1}>{s.subtitle}</Text>
                    </View>
                    {isActive && <Text style={styles.activeCheck}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 38,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    zIndex: 999,
  },
  navBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#2A2A2A',
  },
  navArrow: {
    color: colors.brandYellow,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  navPlaceholder: {
    width: 28,
  },
  centerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 14,
    gap: 6,
    maxWidth: '75%',
  },
  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.brandYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 10,
    fontWeight: '900',
    color: '#111827',
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dropdownIcon: {
    fontSize: 10,
    color: colors.brandYellow,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  closeBtn: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  scrollList: {
    maxHeight: 460,
  },
  listPadding: {
    padding: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  itemRowActive: {
    backgroundColor: '#FEF3C7',
  },
  itemStepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemStepActive: {
    backgroundColor: colors.brandYellow,
  },
  itemStepText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B7280',
  },
  itemStepTextActive: {
    color: '#111827',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  itemTitleActive: {
    color: '#B45309',
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  activeCheck: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B45309',
    marginLeft: 6,
  },
});
