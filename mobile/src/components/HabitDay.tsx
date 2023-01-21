import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) /5;

export const dayMarginBetween = 8;
// calculando o tamnho da tela que permite ter 7 quadradinhos. Dimensions.get('screen')/width irá pegar o tamanho da tela do dispositivo que abriu o app. Os calculos serão feitos então, dividindo pelos dias da semana e subtraindo o que será de padding.
export const daySize = (Dimensions.get('screen').width/weekDays) - (screenHorizontalPadding + 5);

interface Props extends TouchableOpacityProps {
    amount?: number;
    completed?: number;
    date: Date;
};

export function HabitDay({amount = 0, completed = 0, date,...rest}: Props) {
    const amountCompletedPercentage = amount > 0 ? generateProgressPercentage(amount, completed) : 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : amountCompletedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : amountCompletedPercentage > 0 && amountCompletedPercentage <= 20,
                ["bg-violet-800 border-violet-600"] : amountCompletedPercentage > 20 && amountCompletedPercentage <= 40,
                ["bg-violet-700 border-violet-500"] : amountCompletedPercentage > 40 && amountCompletedPercentage <= 60,
                ["bg-violet-600 border-violet-500"] : amountCompletedPercentage > 60 && amountCompletedPercentage <= 80,
                ["bg-violet-500 border-violet-400"] : amountCompletedPercentage > 80,
                ["border-white border-3 "] : isCurrentDay
            })}
            style={{width:daySize, height: daySize}}
            activeOpacity={0.7}
            {...rest}
        />
    );
}