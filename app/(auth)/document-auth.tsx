/**
 * Screen 3: Document Authentication
 * Source of truth: FEAzTO 20-Screen Reference Workflow (Screen 3)
 * "Rider uploads a document photo (demo)."
 */

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../src/constants/colors";
import { typography } from "../../src/constants/typography";
import { useAuthStore } from "../../src/store/authStore";
import { useUIStore } from "../../src/store/uiStore";

type DocumentId =
  | "profilePhoto"
  | "governmentId"
  | "drivingLicense"
  | "vehicleRc"
  | "vehicleInsurance";
type StoredDocument = {
  name: string;
  uri: string;
  mimeType: string;
  kind: "image" | "pdf";
};
type DocumentRecord = Record<DocumentId, StoredDocument | null>;
type PickSource = "camera" | "gallery" | "files";

const DOCUMENTS_KEY = "feazto_kyc_documents";
const VERIFICATION_STATUS_KEY = "feazto_kyc_verification_status";
const REQUIRED_DOCUMENTS: {
  id: DocumentId;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "profilePhoto", title: "Profile Photo", icon: "person-circle-outline" },
  { id: "governmentId", title: "Government ID", icon: "card-outline" },
  { id: "drivingLicense", title: "Driving License", icon: "car-outline" },
  { id: "vehicleRc", title: "Vehicle RC", icon: "document-text-outline" },
  {
    id: "vehicleInsurance",
    title: "Vehicle Insurance",
    icon: "shield-checkmark-outline",
  },
];
const EMPTY_DOCUMENTS: DocumentRecord = {
  profilePhoto: null,
  governmentId: null,
  drivingLicense: null,
  vehicleRc: null,
  vehicleInsurance: null,
};

export default function DocumentAuthScreen() {
  const router = useRouter();
  const showToast = useUIStore((state) => state.showToast);
  const setVerificationStatus = useAuthStore(
    (state) => state.setVerificationStatus,
  );
  const [documents, setDocuments] = useState<DocumentRecord>(EMPTY_DOCUMENTS);
  const [isHydrated, setIsHydrated] = useState(false);
  const [pickerDocument, setPickerDocument] = useState<DocumentId | null>(null);
  const [previewDocument, setPreviewDocument] = useState<StoredDocument | null>(
    null,
  );
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const savedDocuments = await AsyncStorage.getItem(DOCUMENTS_KEY);
        if (savedDocuments)
          setDocuments({ ...EMPTY_DOCUMENTS, ...JSON.parse(savedDocuments) });
      } catch {
        showToast("Saved documents could not be loaded", "warning");
      } finally {
        setIsHydrated(true);
      }
    };
    void loadDocuments();
  }, [showToast]);

  useEffect(() => {
    if (!showSubmissionSuccess) return;
    const navigationTimer = setTimeout(
      () => router.replace("/(auth)/verification-status" as any),
      1500,
    );
    return () => clearTimeout(navigationTimer);
  }, [router, showSubmissionSuccess]);

  const saveDocument = async (
    documentId: DocumentId,
    document: StoredDocument | null,
  ) => {
    const nextDocuments = { ...documents, [documentId]: document };
    setDocuments(nextDocuments);
    try {
      await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(nextDocuments));
    } catch {
      showToast("Document details could not be saved", "warning");
    }
  };

  const handlePick = async (source: PickSource) => {
    if (!pickerDocument) return;
    const documentId = pickerDocument;
    setPickerDocument(null);
    try {
      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          showToast("Camera permission is required to take a photo", "warning");
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          cameraType:
            documentId === "profilePhoto"
              ? ImagePicker.CameraType.front
              : ImagePicker.CameraType.back,
          quality: 1,
        });
        if (result.canceled) return;
        const asset = result.assets[0];
        await saveDocument(documentId, {
          name: asset.fileName || `${documentId}.jpg`,
          uri: asset.uri,
          mimeType: asset.mimeType || "image/jpeg",
          kind: "image",
        });
        return;
      }

      if (source === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 1,
        });
        if (result.canceled) return;
        const asset = result.assets[0];
        await saveDocument(documentId, {
          name: asset.fileName || `${documentId}.jpg`,
          uri: asset.uri,
          mimeType: asset.mimeType || "image/jpeg",
          kind: "image",
        });
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type:
          documentId === "profilePhoto"
            ? ["image/*"]
            : ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;
      const asset = result.assets[0];
      const isPdf =
        asset.mimeType === "application/pdf" ||
        asset.name.toLowerCase().endsWith(".pdf");
      const isImage =
        asset.mimeType?.startsWith("image/") ||
        /\.(jpe?g|png|gif|webp|heic)$/i.test(asset.name);
      if (!isPdf && !isImage) {
        showToast("Choose an image or PDF file", "warning");
        return;
      }
      await saveDocument(documentId, {
        name: asset.name,
        uri: asset.uri,
        mimeType: asset.mimeType || (isPdf ? "application/pdf" : "image/*"),
        kind: isPdf ? "pdf" : "image",
      });
    } catch {
      showToast("The selected document could not be opened", "error");
    }
  };

  const allUploaded = REQUIRED_DOCUMENTS.every(
    ({ id }) => documents[id] !== null,
  );
  const handleSubmit = async () => {
    if (!isHydrated || !allUploaded || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await AsyncStorage.setItem(VERIFICATION_STATUS_KEY, "PENDING");
      setVerificationStatus("PENDING");
      setShowSubmissionSuccess(true);
    } catch {
      showToast("Submission status could not be saved", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Document Verification</Text>
          <Text style={styles.subtitle}>
            Add all five documents to submit your profile for verification.
          </Text>
        </View>

        <View style={styles.docsList}>
          {REQUIRED_DOCUMENTS.map(({ id, title, icon }) => {
            const document = documents[id];
            return (
              <View
                key={id}
                style={[styles.docCard, document && styles.docCardActive]}
              >
                <View style={styles.docRow}>
                  {document?.kind === "image" ? (
                    <Image
                      source={{ uri: document.uri }}
                      style={styles.docPreview}
                    />
                  ) : (
                    <View style={styles.docIconBox}>
                      <Ionicons
                        name={document ? "document-text-outline" : icon}
                        size={24}
                        color="#111827"
                      />
                    </View>
                  )}
                  <View style={styles.docInfo}>
                    <Text style={styles.docName}>{title}</Text>
                    <Text style={styles.docSub} numberOfLines={1}>
                      {document?.name ||
                        (id === "profilePhoto" ? "Image" : "Image or PDF")}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.statusText,
                      document && styles.statusTextSuccess,
                    ]}
                  >
                    {document ? "Uploaded ✓" : "Required"}
                  </Text>
                </View>
                {document ? (
                  <View style={styles.fileActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => setPreviewDocument(document)}
                    >
                      <Text style={styles.actionText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => setPickerDocument(id)}
                    >
                      <Text style={styles.actionText}>Replace</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => void saveDocument(id, null)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setPickerDocument(id)}
                  >
                    <Ionicons
                      name="cloud-upload-outline"
                      size={17}
                      color="#111827"
                    />
                    <Text style={styles.uploadButtonText}>Upload</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!allUploaded || !isHydrated || isSubmitting) &&
                styles.submitButtonDisabled,
            ]}
            disabled={!allUploaded || !isHydrated || isSubmitting}
            onPress={() => void handleSubmit()}
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={pickerDocument !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerDocument(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Choose upload source</Text>
            {(["camera", "gallery", "files"] as PickSource[]).map((source) => (
              <TouchableOpacity
                key={source}
                style={styles.sourceButton}
                onPress={() => void handlePick(source)}
              >
                <Ionicons
                  name={
                    source === "camera"
                      ? "camera-outline"
                      : source === "gallery"
                        ? "images-outline"
                        : "folder-open-outline"
                  }
                  size={20}
                  color="#111827"
                />
                <Text style={styles.sourceText}>
                  {source === "camera"
                    ? "Camera"
                    : source === "gallery"
                      ? "Gallery"
                      : "Files"}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setPickerDocument(null)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={previewDocument !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewDocument(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.previewSheet}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPreviewDocument(null)}
            >
              <Ionicons name="close" size={24} color="#111827" />
            </TouchableOpacity>
            {previewDocument?.kind === "image" ? (
              <Image
                source={{ uri: previewDocument.uri }}
                style={styles.largePreview}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.pdfPreview}>
                <Ionicons
                  name="document-text-outline"
                  size={56}
                  color="#111827"
                />
                <Text style={styles.pdfLabel}>PDF document</Text>
                <TouchableOpacity
                  style={styles.openFileButton}
                  onPress={() =>
                    previewDocument &&
                    void Linking.openURL(previewDocument.uri).catch(() =>
                      showToast(
                        "This PDF cannot be opened on this device",
                        "warning",
                      ),
                    )
                  }
                >
                  <Text style={styles.openFileText}>Open PDF</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.previewFilename} numberOfLines={2}>
              {previewDocument?.name}
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSubmissionSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSubmissionSuccess(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.successSheet}>
            <Ionicons name="checkmark-circle" size={46} color="#E7B600" />
            <Text style={styles.successTitle}>
              Documents Submitted Successfully
            </Text>
            <Text style={styles.successSubtitle}>
              Your KYC status is now Under Review.
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setShowSubmissionSuccess(false);
                router.replace("/(auth)/verification-status" as any);
              }}
            >
              <Text style={styles.submitButtonText}>View Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    marginVertical: 12,
  },
  title: {
    ...typography.h2,
    fontSize: 24,
    color: "#111827",
    fontWeight: "800",
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: 4,
  },
  docsList: {
    gap: 12,
    marginTop: 16,
  },
  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  docCardActive: {
    borderColor: "#E7B600",
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  docIconBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  docPreview: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  docSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    flexShrink: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
  },
  statusTextSuccess: {
    color: "#111827",
  },
  uploadButton: {
    minHeight: 42,
    marginTop: 12,
    borderRadius: 7,
    backgroundColor: "#F7C600",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  uploadButtonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },
  fileActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    minHeight: 36,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
  },
  actionText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "700",
  },
  removeText: {
    color: "#B42318",
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
  },
  submitButton: {
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: "#F7C600",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  submitButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  modalSheet: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },
  sourceButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sourceText: {
    ...typography.body1,
    color: "#111827",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 14,
  },
  cancelText: {
    ...typography.body2,
    color: "#6B7280",
    fontWeight: "700",
  },
  previewSheet: {
    minHeight: 340,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 6,
  },
  largePreview: {
    width: "100%",
    height: 280,
  },
  pdfPreview: {
    alignItems: "center",
    gap: 12,
    paddingTop: 30,
  },
  pdfLabel: {
    ...typography.body1,
    color: "#111827",
  },
  openFileButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "#F7C600",
  },
  openFileText: {
    color: "#111827",
    fontWeight: "700",
  },
  previewFilename: {
    ...typography.caption,
    color: "#4B5563",
    marginTop: 12,
    textAlign: "center",
  },
  successSheet: {
    alignItems: "center",
    gap: 14,
    margin: 24,
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  successSubtitle: {
    ...typography.body2,
    color: "#4B5563",
    textAlign: "center",
  },
  captionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
  },
});
