import React from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import { Carousel } from "react-native-reanimated-carousel";
import { View } from 'react-native';
import Text from '../../components/Text';

const WalkthroughScreen = () => {
    const data = ["First", "Second", "Third"];
    return (
        <ScreenContainer>
            <Carousel
                style={{
                    flex: 1,
                }}
                data={data}
                renderItem={({ item }) => (
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "red"
                    }}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
        </ScreenContainer>
    )
}

export default WalkthroughScreen