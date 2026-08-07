import React, {
    forwardRef,
    useMemo,
    useState,
} from 'react';
import {
    TextInput,
    TextInputProps,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';

import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import Text from '../Text';

import { useAppSelector } from '../../hooks/storeHooks';
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
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
};

type IconLibrary = keyof typeof ICONS;

interface CustomInputProps extends TextInputProps {
    label?: string;

    error?: string;

    leftIconName?: string;

    rightIconName?: string;

    leftIconLibrary?: IconLibrary;

    rightIconLibrary?: IconLibrary;

    containerStyle?: StyleProp<ViewStyle>;

    inputContainerStyle?: StyleProp<ViewStyle>;

    inputStyle?: StyleProp<TextStyle>;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(
    (
        {
            label,
            error,

            leftIconName,
            rightIconName,

            leftIconLibrary = 'MaterialCommunityIcons',
            rightIconLibrary = 'MaterialCommunityIcons',

            secureTextEntry,

            containerStyle,
            inputContainerStyle,
            inputStyle,

            ...props
        },
        ref,
    ) => {
        const COLORS = useAppSelector(state => state.theme.colors);

        const [isFocused, setIsFocused] = useState(false);

        const [hidePassword, setHidePassword] =
            useState(secureTextEntry);

        const LeftIcon =
            leftIconName
                ? ICONS[leftIconLibrary]
                : null;

        const RightIcon =
            rightIconName
                ? ICONS[rightIconLibrary]
                : null;
        const iconColor = error
            ? COLORS.inputBorderError
            : COLORS.placeholderColor;

        let borderColor = COLORS.inputBorderDefault;

        if (error) {
            borderColor = COLORS.inputBorderError;
        } else if (isFocused) {
            borderColor = COLORS.inputBorderFocused;
        }
        const styles = useMemo(
            () =>
                ScaledSheet.create({
                    container: {
                        width: '100%',
                    },

                    label: {
                        marginBottom: verticalScale(2),
                    },

                    inputContainer: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: scale(15),
                        backgroundColor: COLORS.inputField,
                        borderWidth: 1,
                        paddingHorizontal: scale(16),
                    },

                    input: {
                        flex: 1,
                        fontSize: fontSize.regular,
                        color: COLORS.textColor,
                        fontFamily: fontFamily.GoogleSans.normal,
                        paddingVertical: verticalScale(12),
                        includeFontPadding: false,
                    },
                    error: {
                        marginTop: verticalScale(2),
                        color: COLORS.inputBorderError,
                        fontSize: fontSize.small,
                    },
                }),
            [COLORS],
        );

        return (
            <View style={[styles.container, containerStyle]}>
                {!!label && (
                    <Text style={styles.label}>
                        {label}
                    </Text>
                )}

                <View
                    style={[
                        styles.inputContainer,
                        {
                            borderColor,
                        },
                        inputContainerStyle,
                    ]}
                >
                    {LeftIcon && (
                        <LeftIcon
                            name={leftIconName!}
                            size={scale(22)}
                            color={iconColor}
                            style={{
                                marginRight: scale(10),
                            }}
                        />
                    )}

                    <TextInput
                        ref={ref}
                        {...props}
                        style={[
                            styles.input,
                            inputStyle,
                        ]}
                        placeholderTextColor={
                            COLORS.placeholderColor
                        }
                        secureTextEntry={hidePassword}
                        onFocus={e => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={e => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                    />

                    {secureTextEntry ? (
                        <MaterialCommunityIcons
                            name={
                                hidePassword
                                    ? 'eye-off-outline'
                                    : 'eye-outline'
                            }
                            size={scale(22)}
                            color={
                                iconColor
                            }
                            onPress={() =>
                                setHidePassword(prev => !prev)
                            }
                        />
                    ) : (
                        RightIcon && (
                            <RightIcon
                                name={rightIconName!}
                                size={scale(22)}
                                color={
                                    iconColor
                                }
                            />
                        )
                    )}
                </View>

                {!!error && (
                    <Text style={styles.error}>
                        {error}
                    </Text>
                )}
            </View>
        );
    },
);

export default CustomInput;