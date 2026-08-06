import { useEffect, useMemo, useRef, useState } from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import { Carousel, CarouselRef, Pagination } from "react-native-reanimated-carousel";
import { View, Platform, PermissionsAndroid } from 'react-native';
import Text from '../../components/Text';
import { useSharedValue } from 'react-native-reanimated';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import WalkthroughImg1 from "../../assets/svg/WALKTHROUGH_IMG_1.svg"
import WalkthroughImg2 from "../../assets/svg/WALKTHROUGH_IMG_2.svg"
import WalkthroughImg3 from "../../assets/svg/WALKTHROUGH_IMG_3.svg"
import { fontSize } from '../../config/fontSize';
import { fontFamily } from '../../config/fontFamily';
import CustomButton from '../../components/custom/CustomButton';
import CardContainer from '../../components/CardContainer';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSwitch from '../../components/custom/CustomSwitch';
import { request, RESULTS, PERMISSIONS, check } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/types/navigation';
import { updateWalkthrough } from '../../store/walkthrough';

const WalkthroughScreen = () => {
    // Styles
    const COLORS = useAppSelector((state) => state.theme.colors);
    const style = useMemo(
        () =>
            ScaledSheet.create({
                screen: {
                    flex: 1,
                },
                imgWrapper: {
                    width: '100%',
                    height: '40%',
                },
                contentWrapper: {
                    height: "60%",
                    paddingHorizontal: scale(24),
                    paddingTop: verticalScale(10),
                },
                title: {
                    fontSize: fontSize.extra_extra_large,
                    fontFamily: fontFamily.GoogleSans.bold,
                },

                subtitle: {
                    fontSize: fontSize.regular,
                    color: COLORS.textColor,
                },

                bottomSection: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: scale(15),
                    paddingVertical: verticalScale(20),
                    alignItems: "center"
                },

                permissionCard: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                },

            }),
        [COLORS]
    );


    // Page
    const dispatch = useAppDispatch()
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
    const ref = useRef<CarouselRef>(null);
    const progress = useSharedValue<number>(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [smsGranted, setSmsGranted] = useState(false);
    const [notificationGranted, setNotificationGranted] = useState(false);
    const [batteryOptimizationGranted, setBatteryOptimizationGranted] = useState(false);

    const requestSmsPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.READ_SMS);

        setSmsGranted(result === RESULTS.GRANTED);
    };
    const requestNotificationPermission = async () => {
        if (Platform.OS !== 'android') return;

        if (Number(Platform.Version) < 33) {
            setNotificationGranted(true);
            return;
        }

        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        setNotificationGranted(
            result === PermissionsAndroid.RESULTS.GRANTED,
        );
    };
    const requestBatteryOptimizationPermission = () => {
        setBatteryOptimizationGranted(true);
    };
    const checkPermissions = async () => {
        // SMS
        const smsResult = await check(PERMISSIONS.ANDROID.READ_SMS);
        setSmsGranted(smsResult === RESULTS.GRANTED);
        // Notifications
        if (Platform.OS === 'android') {
            if (Number(Platform.Version) < 33) {
                setNotificationGranted(true);
            } else {
                const notificationResult = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );
                setNotificationGranted(notificationResult);
            }
        }
        // Battery Optimization
        // We'll implement this properly later.
        setBatteryOptimizationGranted(false);
    };

    const walkthroughData = [
        {
            id: 1,
            title: 'Never miss a due date again',
            subtitle: 'SpendGuard tracks every card, every rupee, and warns you before you overspend.',
            image: <WalkthroughImg1 width={"100%"} height={"100%"} />,
        },
        {
            id: 2,
            title: 'Enable SMS access',
            subtitle: 'SpendGuard reads bank alert messages on-device to log transactions automatically.',
            image: <WalkthroughImg2 width={"100%"} height={"100%"} />,
        },
        {
            id: 3,
            title: 'Know before you owe',
            subtitle: 'See your spend, budget, and due dates at a glance, updated the moment a transaction happens.',
            image: <WalkthroughImg3 width={"100%"} height={"100%"} />,
        },
    ];

    const isAllPermissionsGranted = smsGranted && notificationGranted && batteryOptimizationGranted;

    const onPressNext = async () => {
        // First page -> Go to permission page
        if (currentIndex === 0) {
            ref.current?.scrollTo({
                index: 1,
                animated: true,
            });
            return;
        }

        // Permission page
        if (currentIndex === 1) {
            if (!isAllPermissionsGranted) return;
            ref.current?.scrollTo({
                index: 2,
                animated: true,
            });
        }

        if (currentIndex === 2) {
            // Navigate to Login/Home
            dispatch(updateWalkthrough(false))
            navigation.replace("LoginPage");
        }
    };


    useEffect(() => {
        checkPermissions();
    }, []);
    
    return (
        <ScreenContainer>
            <View style={style.screen}>
                <Carousel
                    ref={ref}
                    progress={progress}
                    style={{
                        flex: 1,
                    }}
                    data={walkthroughData}
                    renderItem={(data) => {
                        return (
                            <View
                                key={data.item.id}
                                style={{
                                    flex: 1,
                                }}>
                                <View style={style.imgWrapper}>
                                    {data.item.image}
                                </View>
                                <View style={style.contentWrapper}>
                                    <Text style={style.title}>
                                        {data.item.title}
                                    </Text>

                                    <Text style={style.subtitle}>
                                        {data.item.subtitle}
                                    </Text>

                                    {data.item.id === 2 && (
                                        <View
                                            style={{
                                                rowGap: verticalScale(5),
                                            }}
                                        >
                                            {/* Read SMS */}
                                            <CardContainer>
                                                <View style={style.permissionCard}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            columnGap: scale(12),
                                                        }}
                                                    >
                                                        <MaterialDesignIcons
                                                            name="message-text-outline"
                                                            size={scale(22)}
                                                            color={COLORS.paginationActiveColor}
                                                        />

                                                        <Text
                                                            style={{
                                                                fontSize: fontSize.large,
                                                                fontFamily: fontFamily.GoogleSans.bold,
                                                            }}
                                                        >
                                                            Read SMS
                                                        </Text>
                                                    </View>

                                                    <CustomSwitch
                                                        value={smsGranted}
                                                        onValueChange={requestSmsPermission}
                                                    />
                                                </View>
                                            </CardContainer>

                                            {/* Notifications */}
                                            <CardContainer>
                                                <View style={style.permissionCard}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            columnGap: scale(12),
                                                        }}
                                                    >
                                                        <MaterialDesignIcons
                                                            name="bell-outline"
                                                            size={scale(22)}
                                                            color={COLORS.paginationActiveColor}
                                                        />

                                                        <Text
                                                            style={{
                                                                fontSize: fontSize.large,
                                                                fontFamily: fontFamily.GoogleSans.bold,
                                                            }}
                                                        >
                                                            Notifications
                                                        </Text>
                                                    </View>

                                                    <CustomSwitch
                                                        value={notificationGranted}
                                                        onValueChange={requestNotificationPermission}
                                                    />
                                                </View>
                                            </CardContainer>

                                            {/* Background Activity */}
                                            <CardContainer>
                                                <View style={style.permissionCard}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            columnGap: scale(12),
                                                        }}
                                                    >
                                                        <MaterialDesignIcons
                                                            name="battery-sync"
                                                            size={scale(22)}
                                                            color={COLORS.paginationActiveColor}
                                                        />

                                                        <Text
                                                            style={{
                                                                fontSize: fontSize.large,
                                                                fontFamily: fontFamily.GoogleSans.bold,
                                                            }}
                                                        >
                                                            Background activity
                                                        </Text>
                                                    </View>

                                                    <CustomSwitch
                                                        value={batteryOptimizationGranted}
                                                        onValueChange={requestBatteryOptimizationPermission}
                                                    />
                                                </View>
                                            </CardContainer>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )
                    }}
                    onSnapToItem={(index) => {
                        setCurrentIndex(index);
                    }}
                // scrollEnabled={false}
                />
                <View style={style.bottomSection}>
                    <Pagination
                        count={walkthroughData.length}
                        progress={progress}
                        dotStyle={{
                            backgroundColor: COLORS.paginationInactiveColor
                        }}
                        activeDotStyle={{
                            backgroundColor: COLORS.paginationActiveColor
                        }}
                        containerStyle={{
                            gap: scale(4),
                        }}
                        onPress={() => null}
                    />
                    <CustomButton
                        title="Get started"
                        iconLibrary="AntDesign"
                        iconName="arrowright"
                        onPress={onPressNext}
                        iconOnly={Boolean(currentIndex)}
                        disabled={currentIndex === 1 && !isAllPermissionsGranted}
                    />
                </View>
            </View>
        </ScreenContainer>
    )
}

export default WalkthroughScreen