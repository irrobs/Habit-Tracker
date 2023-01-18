// Esse server será uma Back-end API Restful

import Fastify from 'fastify'
import {PrismaClient} from '@prisma/client' //import para permitir acesso a db pelo back end
import cors from '@fastify/cors' // package para permiter acesso do front end aos recursos do back end

const app = Fastify()
const prisma = new PrismaClient() // agora já tem acesso ao db

app.register(cors) // ativação do cors. Pode ser feito especificações para escolher quem pode ou não acessar. Para esse caso, feito dessa maneira, qualquer aplicação pode acessar.

// criação da rota /hello que está acessando o banco de dados. Está sendo usado async await por conta da busca pelo banco ser um processo 'demorado', então ele é deixado de forma assincrona
app.get('/hello', async () => {
    const habits = await prisma.habit.findMany()

    return habits
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server running!')
})