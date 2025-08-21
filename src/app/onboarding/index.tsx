// app/onboarding/index.tsx
import { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet 
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  FadeIn,
  SlideInRight,
  ZoomIn,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MMKVStorage } from '../../services/MMKVSetup';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: 1,
    title: "Welcome to VocabMaster",
    subtitle: "Learn vocabulary efficiently with smart flashcards and spaced repetition",
    emoji: "👋",
    backgroundColor: COLORS.primary,
  },
  {
    id: 2,
    title: "Organize Your Words",
    subtitle: "Create collections to group words by topics, difficulty, or any way you like",
    emoji: "📚",
    backgroundColor: COLORS.secondary,
  },
  {
    id: 3,
    title: "Smart Review System",
    subtitle: "Our algorithm helps you review words at the perfect time for better retention",
    emoji: "🧠",
    backgroundColor: COLORS.warning,
  },
  {
    id: 4,
    title: "Track Your Progress",
    subtitle: "Monitor your learning journey with detailed statistics and achievements",
    emoji: "📊",
    backgroundColor: COLORS.info,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      const progress = Math.abs(event.translationX) / SCREEN_WIDTH;
      scale.value = 1 - progress * 0.1;
    })
    .onEnd((event) => {
      const threshold = SCREEN_WIDTH / 3;
      
      if (event.translationX < -threshold && currentIndex < ONBOARDING_DATA.length - 1) {
        // Swipe left - next slide
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          translateX.value = 0;
          scale.value = withSpring(1);
        }, 150);
      } else if (event.translationX > threshold && currentIndex > 0) {
        // Swipe right - previous slide
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
        setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          translateX.value = 0;
          scale.value = withSpring(1);
        }, 150);
      } else {
        // Bounce back
        translateX.value = withSpring(0);
        scale.value = withSpring(1);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SCREEN_WIDTH / 2],
      [1, 0.7]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
      opacity,
    };
  });

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    try {
      // Mark onboarding as completed
      const storage = MMKVStorage.getInstance();
      storage.set('onboarding_completed', true);
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      router.replace('/(tabs)');
    }
  };

  const currentSlide = ONBOARDING_DATA[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: currentSlide.backgroundColor }]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.slideContainer, animatedStyle]}>
          
          {/* Skip Button */}
          {currentIndex < ONBOARDING_DATA.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* Content */}
          <View style={styles.contentContainer}>
            <Animated.Text 
              key={`emoji-${currentSlide.id}`}
              entering={ZoomIn.delay(200)}
              style={styles.emoji}
            >
              {currentSlide.emoji}
            </Animated.Text>
            
            <Animated.Text 
              key={`title-${currentSlide.id}`}
              entering={FadeIn.delay(300)}
              style={styles.title}
            >
              {currentSlide.title}
            </Animated.Text>
            
            <Animated.Text 
              key={`subtitle-${currentSlide.id}`}
              entering={FadeIn.delay(400)}
              style={styles.subtitle}
            >
              {currentSlide.subtitle}
            </Animated.Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {ONBOARDING_DATA.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentIndex && styles.progressDotActive
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <Animated.View 
            entering={SlideInRight.delay(500)}
            style={styles.buttonContainer}
          >
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>
                {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

        </Animated.View>
      </GestureDetector>
    </View>
  );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: SPACING.lg,
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: SPACING['2xl'],
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  skipText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emoji: {
    fontSize: 120,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  progressDotActive: {
    backgroundColor: COLORS.white,
    width: 24,
  },
  buttonContainer: {
    paddingBottom: SPACING.xl,
  },
  actionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
});