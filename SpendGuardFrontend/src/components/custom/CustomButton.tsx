import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';

import Animated, {
    LinearTransition,
    FadeInRight,
    FadeOutLeft,
    Easing,
} from 'react-native-reanimated';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import { scale } from 'react-native-size-matters';

import { useAppSelector } from '../../hooks/storeHooks';
import Text from '../Text';
import { fontFamily } from '../../config/fontFamily';
import { fontSize } from '../../config/fontSize';

const ICONS = {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialDesignIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
};

type IconLibrary = keyof typeof ICONS;

interface ButtonProps extends TouchableOpacityProps {
    title?: string;
    iconName?: string;
    iconLibrary?: IconLibrary;
    iconPosition?: 'left' | 'right';
    iconSize?: number;
    iconColor?: string;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconOnly?: boolean;
}

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const CustomButton = ({
    title,
    iconName,
    iconLibrary = 'AntDesign',
    iconPosition = 'right',
    iconSize = scale(18),
    iconColor,
    buttonStyle,
    textStyle,
    iconOnly = false,
    ...props
}: ButtonProps) => {
    const COLORS = useAppSelector(state => state.theme.colors);

    const IconComponent = ICONS[iconLibrary];

    const color = iconColor ?? COLORS.btnText;

    const icon =
        iconName && IconComponent ? (
            <IconComponent
                name={iconName}
                size={iconSize}
                color={color}
            />
        ) : null;

    return (
        <AnimatedTouchableOpacity
            layout={LinearTransition.easing(Easing.out(Easing.linear))}
            activeOpacity={0.8}
            style={[
                {
                    alignSelf: 'flex-start',
                    backgroundColor: props.disabled
                        ? COLORS.btnDisabledColor
                        : COLORS.btnColor,
                    borderRadius: scale(100),
                    paddingHorizontal: iconOnly ? scale(18) : scale(20),
                    paddingVertical: iconOnly ? scale(18) : scale(12.5),
                },
                buttonStyle,
            ]}
            {...props}
        >
            <View style={styles.content}>
                {iconPosition === 'left' && icon}

                {!iconOnly && title && (
                    <Animated.View
                        entering={FadeInRight.duration(250)}
                        exiting={FadeOutLeft.duration(200)}
                    >
                        <Text
                            style={[
                                {
                                    color: COLORS.btnText,
                                    fontFamily: fontFamily.GoogleSans.bold,
                                    fontSize: fontSize.regular,
                                },
                                textStyle,
                            ]}
                        >
                            {title}
                        </Text>
                    </Animated.View>
                )}

                {iconPosition === 'right' && icon}
            </View>
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(8),
    },
});

export default CustomButton;