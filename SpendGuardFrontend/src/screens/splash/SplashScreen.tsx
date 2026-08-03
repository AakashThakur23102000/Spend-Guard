import { Image, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/storeHooks'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { ImageSource } from '../../config/ImageSource'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const SplashScreen = () => {
    const COLORS = useAppSelector((state) => state.theme.colors)
    const initialDimension = useSharedValue(scale(150));

    const imgCardAnimatedStyle = useAnimatedStyle(() => ({
        width: initialDimension.value,
        height: initialDimension.value,
    }))

    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            backgroundColor: COLORS.background1,
            justifyContent: "center",
            alignItems: "center"
        }
    })

    useEffect(() => {
        initialDimension.value =
            withRepeat(
                withSequence(
                    withTiming(scale(150), { duration: 1000 },
                        (finishedSequence) => { console.log("finishedSequence --- ", finishedSequence) }),
                    withTiming(scale(200), { duration: 1000 }),
                    withTiming(scale(150), { duration: 1000 },
                        (finishedSequence) => { console.log("finishedSequence --- ", finishedSequence) }),
                    withTiming(scale(200), { duration: 1000 }),
                ),
                -1,
                true,
                (finished) => {
                    console.log(finished)
                }
            )
    }, [])

    return (
        <View style={styles.screen}>
            <Animated.View style={imgCardAnimatedStyle}>
                <Image source={ImageSource.APP_LOGO} style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain"
                }} />
            </Animated.View>
        </View>
    )
}

export default SplashScreen
