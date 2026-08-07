import React, { useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

import ScreenContainer from '../../components/ScreenContainer';
import Text from '../../components/Text';
import CustomInput from '../../components/custom/CustomInput';
import CustomButton from '../../components/custom/CustomButton';

import { useAppSelector } from '../../hooks/storeHooks';
import { fontFamily } from '../../config/fontFamily';
import { fontSize } from '../../config/fontSize';
import { ImageSource } from '../../config/ImageSource';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/types/navigation';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const COLORS = useAppSelector(state => state.theme.colors);
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const styles = useMemo(
        () =>
            ScaledSheet.create({
                screen: {
                    flex: 1,
                    justifyContent: 'center',
                },

                logoSection: {
                    alignItems: 'center',
                },

                logoWrapper: {
                    width: scale(90),
                    height: scale(90),
                },

                appName: {
                    marginTop: verticalScale(8),
                    fontSize: fontSize.extra_extra_large,
                    fontFamily: fontFamily.GoogleSans.bold,
                },

                tagline: {
                    marginTop: verticalScale(4),
                    color: COLORS.textColor,
                    textAlign: 'center',
                },

                form: {
                    marginTop: verticalScale(15),
                    rowGap: verticalScale(5),
                },

                signUpButton: {
                    width: '100%',
                    marginTop: verticalScale(10),
                },

                dividerContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: verticalScale(10),
                },

                divider: {
                    flex: 1,
                    height: 1,
                    backgroundColor: COLORS.inputBorderDefault,
                },

                dividerText: {
                    marginHorizontal: scale(12),
                    color: COLORS.textColor,
                    fontSize: fontSize.small,
                },

                googleButton: {
                    width: '100%',
                    backgroundColor: COLORS.cardColor,
                    borderWidth: 1,
                    borderColor: COLORS.inputBorderDefault,
                },

                googleButtonText: {
                    color: COLORS.textColor2,
                },

                footer: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: verticalScale(28),
                },

                footerText: {
                    color: COLORS.textColor,
                },

                loginText: {
                    color: COLORS.btnColor,
                    fontFamily: fontFamily.GoogleSans.bold,
                },
            }),
        [COLORS],
    );

    return (
        <ScreenContainer>
            <View style={styles.screen}>
                {/* Logo */}
                <View style={styles.logoSection}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={ImageSource.APP_LOGO}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                    <Text style={styles.appName}>
                        Create Account
                    </Text>

                    <Text style={styles.tagline}>
                        Join SpendGuard and take control of your spending.
                    </Text>
                </View>

                {/* Sign Up Form */}
                <View style={styles.form}>
                    <CustomInput
                        label="Name"
                        placeholder="Your full name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        textContentType="name"
                        autoComplete="name"
                        leftIconLibrary="MaterialCommunityIcons"
                        leftIconName="account-outline"
                    />

                    <CustomInput
                        label="Email"
                        placeholder="name@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="email"
                        textContentType="emailAddress"
                        leftIconLibrary="MaterialCommunityIcons"
                        leftIconName="email-outline"
                    />

                    <CustomInput
                        label="Password"
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoComplete="new-password"
                        textContentType="newPassword"
                        leftIconLibrary="MaterialCommunityIcons"
                        leftIconName="lock-outline"
                    />

                    <CustomInput
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        autoComplete="new-password"
                        textContentType="newPassword"
                        leftIconLibrary="MaterialCommunityIcons"
                        leftIconName="lock-check-outline"
                    />

                    <CustomButton
                        title="Create Account"
                        buttonStyle={styles.signUpButton}
                    />
                </View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />

                    <Text style={styles.dividerText}>
                        OR CONTINUE WITH
                    </Text>

                    <View style={styles.divider} />
                </View>

                {/* Google Sign Up */}
                <CustomButton
                    title="Continue with Google"
                    iconLibrary="AntDesign"
                    iconName="google"
                    iconPosition="left"
                    buttonStyle={styles.googleButton}
                    textStyle={styles.googleButtonText}
                    iconColor="#DB4437"
                />

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>

                    <Pressable>
                        <Text style={styles.loginText} onPress={() => navigation.navigate("LoginPage")}>
                            {' '}Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenContainer>
    );
};

export default SignUpScreen;