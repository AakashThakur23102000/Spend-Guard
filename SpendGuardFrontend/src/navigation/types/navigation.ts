import type { NavigatorScreenParams } from '@react-navigation/native';

export type AppStackParamList = {
    SplashScreen: undefined;
    LoginPage: undefined;
    Walkthrough: undefined;
    BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
    Dashboard: { name?: string } | undefined;
};