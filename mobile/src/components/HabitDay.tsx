import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) /5;

export const dayMarginBetween = 8;
// calculando o tamnho da tela que permite ter 7 quadradinhos. Dimensions.get('screen')/width irá pegar o tamanho da tela do dispositivo que abriu o app. Os calculos serão feitos então, dividindo pelos dias da semana e subtraindo o que será de padding.
export const daySize = (Dimensions.get('screen').width/weekDays) - (screenHorizontalPadding + 5);

interface Props extends TouchableOpacityProps {};

export function HabitDay({...rest}: Props) {
    return (
        <TouchableOpacity
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{width:daySize, height: daySize}}
            activeOpacity={0.7}
            {...rest}
        />
    );
}