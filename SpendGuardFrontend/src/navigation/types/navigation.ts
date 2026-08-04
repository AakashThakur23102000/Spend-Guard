import type { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
    Dashboard: { name?: string } | undefined;
};

export type AppStackParamList = {
    SplashScreen: undefined;
    LoginPage: undefined;
    BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
};
