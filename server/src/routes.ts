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

    //rota para completar/ não-completar(toggle) um hábito
    app.patch('/habits/:id/toggle', async (request) => {
        //:id é o route param => parâmetro de indentificação

        const toggleHabitParams = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitParams.parse(request.params)

        //determina o dia como o dia atual, com o tempo zerado, e converte para Datetime
        const today = dayjs().startOf('day').toDate()

        // variável para procurar o dia atual na tabela day
        let day = await prisma.day.findUnique({
            where: {
                date:today
            }
        })

        // caso o dia não exista, cria ela, se já existir, não faz nada
        if(!day) {
            day = await prisma.day.create({
                data: {
                    date:today
                }
            })
        }

        // buscando na tabela se o hábito já está completo
        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if(dayHabit) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else {
            // Completar o habito
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }
        
    })

    // rota para retornar um resumo, que será uma lista(array) de informações. Por ser uma rota com querys complexas, será necessário fazer o SQL na mão, ou seja, o que for escrito aqui será especifico para cada banco de dados usado, nesse caso, para SQLite
    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
        /* seleciona o id e data da tabela days, ou seja, os dias registrados*/
        SELECT 
            D.id, 
            D.date,
            (
                /* seleciona os hábitos completos*/
                SELECT 
                    cast(count(*) as float)
                FROM day_habits DH 
                WHERE DH.day_id = D.id
            ) as completed,
            (
                /*seleciona os hábitos possiveis*/
                SELECT 
                    cast(count(*) as float)
                FROM habit_week_days HWD
                /*junta com a tabela de habitos para fazer a verificação para mostrar como possiveis apenas os habitos que foram criados no dia ou antes, nenhum depois*/
                JOIN habits H
                    ON H.id = HWD.habit_id
                WHERE
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                    AND H.created_at <= D.date
            ) as amount
        FROM days D
        `

        return summary
    })
}

