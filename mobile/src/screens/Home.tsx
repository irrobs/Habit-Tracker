import { View, Text, ScrollView} from "react-native";
import { HabitDay, daySize } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-date-from-year-beginning'
import { useNavigation } from '@react-navigation/native'

const weekDays = ['D','S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 6;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearBeginning.length;

//É necessário tipar o className para poder começar a usar o NativeWind. Isso é feito pelo arquivo app.d.ts
export function Home() {

    const { navigate } = useNavigation();
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text 
                            key= {`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{width: daySize}}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
            >
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearBeginning.map(date => (
                            <HabitDay
                               key={date.toISOString()}
                               onPress={() => navigate('habit', {date: date.toISOString()})}
                            />
                        ))
                    }
        
                    {
                        amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_,index) => (
                            <View
                                key= {index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width:daySize, height: daySize}}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            
        </View>
    )
}