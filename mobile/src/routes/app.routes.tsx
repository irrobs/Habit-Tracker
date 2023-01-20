import { createNativeStackNavigator } from '@react-navigation/native-stack'

const {Navigator, Screen} = createNativeStackNavigator();

import { Home } from '../screens/Home'
import { New } from '../screens/new'
import { Habit } from '../screens/habit'

export function AppRoutes() {
    // como a home é a primeira rota, ela será exibida ao abri o app
    return(
        <Navigator screenOptions={{ headerShown:false }}>
            <Screen
                name="home"
                component={Home}
            />
    
            <Screen
                name="new"
                component={New}
            />
    
            <Screen
                name="habit"
                component={Habit}
            />
        </Navigator>
    );
}