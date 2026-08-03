import { View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/storeHooks'
import { ScaledSheet } from 'react-native-size-matters'
import Text from '../../components/Text'

const SplashScreen = () => {
    const COLORS = useAppSelector((state) => state.theme.colors)
    const styles = ScaledSheet.create({
        screen: {
            flex: 1,
            backgroundColor: COLORS.background1
        }
    })

    return (
        <View style={styles.screen}>
            <Text>
                SplashScreen
            </Text>
        </View>
    )
}

export default SplashScreen
