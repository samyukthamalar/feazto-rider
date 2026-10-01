/**
 * FEAzTO Rider - Sign Up / Registration Screen
 * Source of truth: FEAzTO Rider Master Prompt & User Requirements
 * "Professional working registration page for new rider partners."
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
import {
  calculatePasswordStrength,
  registrationService,
  SignUpFormData,
  SignUpValidationErrors,
  validateSignUpForm,
} from '../../services/registrationService';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { colors } from '../../src/constants/colors';
import { typography } from '../../src/constants/typography';
import { useAuthStore } from '../../src/store/authStore';
import { useUIStore } from '../../src/store/uiStore';

export default function SignUpScreen() {
  const router = useRouter();
  const setPhone = useAuthStore((state) => state.setPhone);
  const showToast = useUIStore((state) => state.showToast);

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Field focus tracking for styling
  const [activeField, setActiveField] = useState<string | null>(null);

  // Consolidated form object
  const formData: SignUpFormData = useMemo(
    () => ({
      fullName,
      mobileNumber,
      email,
      password,
      confirmPassword,
      referralCode,
      agreedToTerms,
    }),
    [fullName, mobileNumber, email, password, confirmPassword, referralCode, agreedToTerms]
  );

  // Live validation
  const { isValid, errors } = useMemo(() => validateSignUpForm(formData), [formData]);

  // Password strength calculation
  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password]);

  const markTouched = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleCreateAccount = async () => {
    // Mark all required fields as touched
    setTouchedFields({
      fullName: true,
      mobileNumber: true,
      email: true,
      password: true,
      confirmPassword: true,
      referralCode: true,
      terms: true,
    });

    if (!isValid) {
      const firstError = Object.values(errors)[0] || 'Please fix all required fields';
      showToast(firstError, 'warning');
      return;
    }

    setLoading(true);
    try {
      const result = await registrationService.registerRider(formData);
      setLoading(false);

      if (result.success) {
        const cleanMobile = mobileNumber.replace(/\D/g, '');
        setPhone(cleanMobile);
        showToast(result.message || `Account created! OTP sent to +91 ${cleanMobile}`, 'success');
        // Route directly to OTP Verification
        router.push('/(auth)/otp' as any);
      } else {
        showToast(result.error || 'Registration failed. Please try again.', 'error');
      }
    } catch (err: any) {
      setLoading(false);
      showToast(err?.message || 'Network error during registration.', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              hitSlop={12}
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <View style={styles.headerBrand}>
              <Text style={styles.brandTitle}>
                FEAz<Text style={styles.brandYellow}>TO</Text>
              </Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Heading */}
          <View style={styles.headingBox}>
            <Text style={styles.title}>Rider Registration</Text>
            <Text style={styles.subtitle}>
              Create your partner account to start delivering food and earning daily.
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* 1. Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Full Name <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'fullName' && styles.inputWrapperFocused,
                  touchedFields.fullName && errors.fullName ? styles.inputWrapperError : null,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={touchedFields.fullName && errors.fullName ? '#EF4444' : '#6B7280'}
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Karthik Ramanathan"
                  placeholderTextColor="#9CA3AF"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (!touchedFields.fullName) markTouched('fullName');
                  }}
                  onFocus={() => setActiveField('fullName')}
                  onBlur={() => {
                    setActiveField(null);
                    markTouched('fullName');
                  }}
                  autoCapitalize="words"
                />
              </View>
              {touchedFields.fullName && errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            {/* 2. Mobile Number */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Mobile Number <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'mobile' && styles.inputWrapperFocused,
                  touchedFields.mobileNumber && errors.mobileNumber ? styles.inputWrapperError : null,
                ]}
              >
                <View style={styles.countryCodeBadge}>
                  <Text style={styles.flagEmoji}>🇮🇳</Text>
                  <Text style={styles.countryCodeText}>+91</Text>
                  <View style={styles.countryDivider} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="98765 43210"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={(text) => {
                    setMobileNumber(text);
                    if (!touchedFields.mobileNumber) markTouched('mobileNumber');
                  }}
                  onFocus={() => setActiveField('mobile')}
                  onBlur={() => {
                    setActiveField(null);
                    markTouched('mobileNumber');
                  }}
                />
                {mobileNumber.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setMobileNumber('')}
                    hitSlop={8}
                    style={styles.clearBtn}
                  >
                    <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
              {touchedFields.mobileNumber && errors.mobileNumber ? (
                <Text style={styles.errorText}>{errors.mobileNumber}</Text>
              ) : (
                <Text style={styles.helperText}>A 4-digit OTP will be sent for instant mobile verification</Text>
              )}
            </View>

            {/* 3. Email Address (Optional) */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'email' && styles.inputWrapperFocused,
                  touchedFields.email && errors.email ? styles.inputWrapperError : null,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color={touchedFields.email && errors.email ? '#EF4444' : '#6B7280'}
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="karthik.r@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (!touchedFields.email) markTouched('email');
                  }}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => {
                    setActiveField(null);
                    markTouched('email');
                  }}
                />
              </View>
              {touchedFields.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* 4. Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Password <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'password' && styles.inputWrapperFocused,
                  touchedFields.password && errors.password ? styles.inputWrapperError : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={19}
                  color={touchedFields.password && errors.password ? '#EF4444' : '#6B7280'}
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 8 characters"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (!touchedFields.password) markTouched('password');
                  }}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => {
                    setActiveField(null);
                    markTouched('password');
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={8}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <View style={styles.strengthBox}>
                  <View style={styles.strengthBarsRow}>
                    <View
                      style={[
                        styles.strengthBar,
                        { backgroundColor: passwordStrength.score >= 1 ? passwordStrength.color : '#E5E7EB' },
                      ]}
                    />
                    <View
                      style={[
                        styles.strengthBar,
                        { backgroundColor: passwordStrength.score >= 2 ? passwordStrength.color : '#E5E7EB' },
                      ]}
                    />
                    <View
                      style={[
                        styles.strengthBar,
                        { backgroundColor: passwordStrength.score >= 3 ? passwordStrength.color : '#E5E7EB' },
                      ]}
                    />
                  </View>
                  <View style={styles.strengthMetaRow}>
                    <Text style={[styles.strengthLevelText, { color: passwordStrength.color }]}>
                      Strength: {passwordStrength.level}
                    </Text>
                    <Text style={styles.strengthMessageText}>{passwordStrength.message}</Text>
                  </View>
                </View>
              )}

              {touchedFields.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* 5. Confirm Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                Confirm Password <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'confirmPassword' && styles.inputWrapperFocused,
                  touchedFields.confirmPassword && errors.confirmPassword ? styles.inputWrapperError : null,
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={19}
                  color={touchedFields.confirmPassword && errors.confirmPassword ? '#EF4444' : '#6B7280'}
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (!touchedFields.confirmPassword) markTouched('confirmPassword');
                  }}
                  onFocus={() => setActiveField('confirmPassword')}
                  onBlur={() => {
                    setActiveField(null);
                    markTouched('confirmPassword');
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={8}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {touchedFields.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : confirmPassword.length >= 8 && confirmPassword === password ? (
                <Text style={styles.matchSuccessText}>✓ Passwords match</Text>
              ) : null}
            </View>

            {/* 6. Referral Code (Optional) */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Referral Code</Text>
                <Text style={styles.optionalBadge}>Optional</Text>
              </View>
              <View
                style={[
                  styles.inputWrapper,
                  activeField === 'referral' && styles.inputWrapperFocused,
                  touchedFields.referralCode && errors.referralCode ? styles.inputWrapperError : null,
                ]}
              >
                <Ionicons
                  name="gift-outline"
                  size={19}
                  color="#6B7280"
                  style={styles.inputLeftIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. FEAZTO500"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="characters"
                  maxLength={12}
                  value={referralCode}
                  onChangeText={(text) => {
                    setReferralCode(text.toUpperCase());
                    if (!touchedFields.referralCode) markTouched('referralCode');
                  }}
                  onFocus={() => setActiveField('referral')}
                  onBlur={() => setActiveField(null)}
                />
              </View>
              {touchedFields.referralCode && errors.referralCode ? (
                <Text style={styles.errorText}>{errors.referralCode}</Text>
              ) : (
                <Text style={styles.helperText}>Enter code from an existing rider to unlock ₹500 joining bonus</Text>
              )}
            </View>

            {/* TERMS & CONDITIONS CHECKBOX */}
            <View style={styles.termsRow}>
              <TouchableOpacity
                style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}
                onPress={() => {
                  setAgreedToTerms(!agreedToTerms);
                  markTouched('terms');
                }}
                activeOpacity={0.8}
              >
                {agreedToTerms && <Ionicons name="checkmark" size={16} color="#111827" />}
              </TouchableOpacity>
              <View style={styles.termsTextWrapper}>
                <Text style={styles.termsRegularText}>
                  I agree to the{' '}
                  <Text
                    style={styles.termsLinkText}
                    onPress={() => setShowTermsModal(true)}
                  >
                    Terms & Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={styles.termsLinkText}
                    onPress={() => setShowTermsModal(true)}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
            {touchedFields.terms && errors.terms ? (
              <Text style={styles.termsErrorText}>{errors.terms}</Text>
            ) : null}

            {/* CREATE ACCOUNT BUTTON */}
            <TouchableOpacity
              style={[
                styles.createAccountBtn,
                (!isValid || loading) && styles.createAccountBtnDisabled,
              ]}
              onPress={handleCreateAccount}
              disabled={!isValid || loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <View style={styles.btnLoadingRow}>
                  <ActivityIndicator size="small" color="#111827" />
                  <Text style={styles.btnText}>Creating Account...</Text>
                </View>
              ) : (
                <Text style={styles.btnText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Switch to Login */}
            <View style={styles.switchLoginRow}>
              <Text style={styles.switchLoginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.switchLoginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Compliance & KYC Notice */}
          <View style={styles.kycNoticeCard}>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text style={styles.kycNoticeText}>
              <Text style={styles.kycNoticeBold}>Document verification</Text> (Driving License, Aadhaar, and Vehicle details) will be collected safely in the next step after mobile OTP confirmation.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={showTermsModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>FEAzTO Partner Terms</Text>
              <TouchableOpacity
                onPress={() => setShowTermsModal(false)}
                hitSlop={10}
              >
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalSectionTitle}>1. Rider Partner Engagement</Text>
              <Text style={styles.modalParagraph}>
                By signing up as a delivery partner with FEAzTO, you agree to fulfill customer orders safely, adhere to road safety guidelines, and deliver parcels intact with hygiene seals verified.
              </Text>

              <Text style={styles.modalSectionTitle}>2. Payouts & Settlement</Text>
              <Text style={styles.modalParagraph}>
                Delivery earnings, peak hour surges, rain bonuses, and customer tips will be credited directly to your registered UPI / bank account via daily automated settlement.
              </Text>

              <Text style={styles.modalSectionTitle}>3. Privacy & Document Protection</Text>
              <Text style={styles.modalParagraph}>
                Your KYC documents (Aadhaar, Driving License, RC) are encrypted end-to-end and utilized solely for statutory compliance and rider authentication.
              </Text>
            </ScrollView>

            <PrimaryButton
              title="I Understand & Accept"
              onPress={() => {
                setAgreedToTerms(true);
                setShowTermsModal(false);
              }}
              style={styles.modalAcceptBtn}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBrand: {
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.5,
  },
  brandYellow: {
    color: '#FEC704',
  },
  headingBox: {
    marginVertical: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  fieldContainer: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  requiredStar: {
    color: '#EF4444',
  },
  optionalBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 50,
  },
  inputWrapperFocused: {
    borderColor: '#FEC602',
    backgroundColor: '#FFFFFF',
  },
  inputWrapperError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  inputLeftIcon: {
    marginRight: 10,
  },
  countryCodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  countryDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  eyeBtn: {
    padding: 6,
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
    marginTop: 2,
  },
  helperText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  matchSuccessText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 2,
  },
  strengthBox: {
    marginTop: 6,
    gap: 4,
  },
  strengthBarsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strengthLevelText: {
    fontSize: 11,
    fontWeight: '800',
  },
  strengthMessageText: {
    fontSize: 10,
    color: '#6B7280',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#FEC602',
    borderColor: '#EAB308',
  },
  termsTextWrapper: {
    flex: 1,
  },
  termsRegularText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  termsLinkText: {
    color: '#B45309',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  termsErrorText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
  },
  createAccountBtn: {
    backgroundColor: '#FEC602',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#FEC602',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  createAccountBtnDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  btnLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  switchLoginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  switchLoginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  switchLoginLink: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B45309',
  },
  kycNoticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },
  kycNoticeText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 17,
  },
  kycNoticeBold: {
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  modalScroll: {
    paddingVertical: 8,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  modalParagraph: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  modalAcceptBtn: {
    width: '100%',
    marginTop: 8,
  },
});
