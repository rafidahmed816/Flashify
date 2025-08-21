// app/_layout.tsx (Root Layout)
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKVStorage } from '../services/MMKVSetup';
import { COLORS, FONT_SIZES, SPACING } from '../constants/constants';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize MMKV
      const mmkvInitialized = await MMKVStorage.initialize();
      if (!mmkvInitialized) {
        throw new Error('Failed to initialize storage');
      }

      // Test MMKV connection
      const connectionTest = await MMKVStorage.testConnection();
      if (!connectionTest) {
        console.warn('⚠️ MMKV connection test failed, but continuing...');
      }

      // Check onboarding status
      const storage = MMKVStorage.getInstance();
      const onboardingCompleted = storage.getBoolean('onboarding_completed') ?? false;
      setHasCompletedOnboarding(onboardingCompleted);

      // Simulate splash screen delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to appropriate screen
      if (onboardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }

    } catch (error) {
      console.error('App initialization error:', error);
      // Handle initialization error - maybe show error screen
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>📚</Text>
        <Text style={styles.appName}>VocabMaster</Text>
        <Text style={styles.tagline}>Master vocabulary efficiently</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING['3xl'],
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: FONT_SIZES['6xl'],
    marginBottom: SPACING.md,
  },
  appName: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  versionContainer: {
    marginBottom: SPACING.lg,
  },
  versionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },

});