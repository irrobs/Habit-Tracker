import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-date-from-year-beginning";
import { HabitDay } from "./habitDay";

const weekDays = [
    'D',
    'S', 
    'T', 
    'Q', 
    'Q', 
    'S', 
    'S',
];

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 //18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = Array <{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  //como o react executa tudo novamente a cada mudança de algum state, é necessário usar o useEffect para evitar que isso ocorra com a chamada http. Para isso, deixar o array vazio, para o useEffect ser chamado apenas quando o componente for exibido em tela a primeira vez
  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
    })
  }, [])

    return (
      <div className="w-full flex">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
          {weekDays.map((weekDay, i) => {
            return (
              <div
                key={`${weekDay}-${i}`}
                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              >
                {weekDay}
              </div>
            )
          })}
        </div>
  
        <div className="grid grid-rows-7 grid-flow-col gap-3">
          {summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })// procurar a data dentro do array de informações do banco de dados
            return (
              <HabitDay 
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount} // se tiver a data no banco, pegar a informação amount
                completed={dayInSummary?.completed} // se tiver a data no banco, pegar a informação completed
              />
            )
          })}

          {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_,i) => {
            return (
                <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
            )
          })}
        </div>
    </div>
    );
}