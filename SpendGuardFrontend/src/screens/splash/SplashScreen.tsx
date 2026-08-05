import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { ImageSource } from '../../config/ImageSource';
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../navigation/types/navigation';
import ScreenContainer from '../../components/ScreenContainer';

const SplashScreen = () => {
    const walkthrough = useAppSelector((state) => state.walkthrough.isFirstTime)
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    // animations
    const logoScale = useSharedValue(1);
    const isAllTaskCompleted = useSharedValue(false);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
    }));

    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })

    const callOnAnimationComplete = () => {
        if (walkthrough) {
            navigation.navigate("Walkthrough")
        }
    };

    useEffect(() => {
        // check if first time or not
        if (walkthrough) {
            isAllTaskCompleted.value = true;
        }

        // Animation Start
        logoScale.value = withRepeat(
            withSequence(
                withTiming(1.3, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                }),

                withTiming(
                    1,
                    {
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                    },
                    (finished) => {
                        'worklet';
                        if (!finished) return;
                        if (isAllTaskCompleted.value) {
                            cancelAnimation(logoScale);
                            runOnJS(callOnAnimationComplete)();
                        }
                    }
                )
            ),
            -1,
            false
        );
        return () => {
            cancelAnimation(logoScale);
        };
    }, []);


    return (
        <ScreenContainer>
            <View style={styles.screen}>
                <Animated.View
                    style={[
                        {
                            width: scale(150),
                            height: scale(150),
                        },
                        animatedStyle,
                    ]}
                >
                    <Image
                        source={ImageSource.APP_LOGO}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </Animated.View>
            </View>
        </ScreenContainer>
    );
};

export default SplashScreen;