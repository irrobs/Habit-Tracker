import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons'; //import da lib do expo de icons, nesse caso a Feather
import colors from 'tailwindcss/colors'; //import das cores do tailwind
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo.svg'
// é necessário intalar um biblioteca para poder usar svg no React Native(react-native-svg) e uma para poder renderizar o svg(permite usar o svg como component. É o: react-native-svg-transformer)
export function Header() {
    const { navigate } = useNavigation();
    return (
        <View className="w-full flex-row items-center justify-between">
            <Logo />

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
              onPress={() => navigate('new')}
            >
            < Feather
               name="plus"
               color={colors.violet[500]}
               size={20}
            />

            <Text className="text-white ml-3 font-semibold text-base">
                 Novo
            </Text>
            </TouchableOpacity>
        </View>
    )
}