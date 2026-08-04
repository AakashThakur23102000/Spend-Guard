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

const SplashScreen = () => {
    const COLORS = useAppSelector((state) => state.theme.colors);

    const logoScale = useSharedValue(1);
    const isAllTaskCompleted = useSharedValue(false);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
    }));

    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            backgroundColor: COLORS.background1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })

    const callOnAnimationComplete = () => {
        // Animation End
        console.log('-------------------------Navigated-------------------------------------');
        // navigation.replace(...)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('✅ All startup tasks completed');
            isAllTaskCompleted.value = true;
        }, 5000);

        // Animation Start
        logoScale.value = withRepeat(
            withSequence(
                withTiming(1.3, {
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                }),

                withTiming(
                    1,
                    {
                        duration: 1000,
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
            clearTimeout(timer);
            cancelAnimation(logoScale);
        };
    }, []);


    return (
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
    );
};

export default SplashScreen;