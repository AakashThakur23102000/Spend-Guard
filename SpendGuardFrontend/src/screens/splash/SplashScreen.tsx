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
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../navigation/types/navigation';
import ScreenContainer from '../../components/ScreenContainer';
import { StackNavigationProp } from '@react-navigation/stack';

const SplashScreen = () => {
    const walkthrough = useAppSelector((state) => state.walkthrough.isFirstTime)
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

    // animations
    const logoScale = useSharedValue(1);
    const isAllTaskCompleted = useSharedValue(false);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }],
    }));

    const callOnAnimationComplete = () => {
        if (walkthrough) {
            navigation.replace("Walkthrough")
        } else {
            navigation.replace("LoginPage")
        }
    };

    useEffect(() => {
        // check if first time or not
        if (walkthrough) {
            isAllTaskCompleted.value = true;
        } else {
            setTimeout(() => {
                isAllTaskCompleted.value = true;
            }, 3000)
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

const styles = ScaledSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})