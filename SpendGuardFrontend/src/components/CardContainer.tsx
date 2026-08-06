import { View } from 'react-native'
import React, { PropsWithChildren, useMemo } from 'react'
import { useAppSelector } from '../hooks/storeHooks';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

const CardContainer = ({ children }: PropsWithChildren) => {
    const COLORS = useAppSelector((state) => state.theme.colors);
    const styles = useMemo(
        () => ScaledSheet.create({
            screen: {
                backgroundColor: COLORS.cardColor,
                borderRadius: scale(15),
                paddingHorizontal: scale(10),
                paddingVertical: verticalScale(5)
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

export default CardContainer