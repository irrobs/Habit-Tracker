import {FastifyInstance} from 'fastify'
import {z} from 'zod'
import {prisma} from './lib/prisma'
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance) {
    // criação da rota /habits que está acessando o banco de dados para os habitos. Está sendo usado async await por conta da busca pelo banco ser um processo 'demorado', então ele é deixado de forma assincrona
    app.post('/habits', async (request) => {
        // criação de uma autenticação com o zod para que garanta que as informações que serão passadas correspondem com o desejado
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })

        //criação da request
        const {title, weekDays} = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        // pegar o dia que foram feitos os hábitos
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const {date} = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')

        const weekDay = parsedDate.get('day')

        // pegar os hábitos possíveis
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte:date, // mostrar hábitos que foram criados até tal data
                },
                weekDays: {
                    some: {
                        week_day: weekDay, //irá pegar o dia da semana(segunda, terça, etc)
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where:{
                date:parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        //pegando apenas os hábitos completos
        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits, completedHabits,
        }
    })
}

