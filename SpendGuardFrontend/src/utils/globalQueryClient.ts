import { MutationCache, QueryClient } from "@tanstack/react-query";
import type { NavigationProp } from '@react-navigation/native';
import type { AppStackParamList } from '../navigation/types/navigation';


function GlobalQueryClient({ navigation }: { navigation: NavigationProp<AppStackParamList> }): QueryClient {
    return new QueryClient({
        mutationCache: new MutationCache({
            onSuccess: () => {
                console.log("OnSuccess got hit")
                // navigation.navigate(NavigationPaths.BOTTOM_TAB_STACK, { screen: NavigationPaths.HOME });
            }
        })
    })
}

export default GlobalQueryClient
