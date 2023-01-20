import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { useNavigation } from '@react-navigation/native'// permite navegação entre telas


export function BackButton() {
    const { goBack } = useNavigation();// volta pra tela anterior
    return (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        >
            <Feather
                name="arrow-left"
                size={32}
                color={colors.zinc[400]}
            />
        </TouchableOpacity>
    )
}