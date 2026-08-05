import { View } from 'react-native'
import React, { PropsWithChildren, useMemo } from 'react'
import { useAppSelector } from '../hooks/storeHooks';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

const ScreenContainer = ({ children }: PropsWithChildren) => {
    const COLORS = useAppSelector((state) => state.theme.colors);
    const styles = useMemo(
        () => ScaledSheet.create({
            screen: {
                flex: 1,
                backgroundColor: COLORS.background1,
                paddingVertical: verticalScale(2),
                paddingHorizontal: scale(2)
            },
        }),
        [COLORS]
    );

    return (
        <View style={styles.screen}>
            {children}
        </View>
    )
}

export default ScreenContainer