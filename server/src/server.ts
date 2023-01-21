// Esse server será uma Back-end API Restful

import Fastify from 'fastify'
import cors from '@fastify/cors' // package para permiter acesso do front end aos recursos do back end
import {appRoutes} from './routes'

const app = Fastify()

app.register(cors) // ativação do cors. Pode ser feito especificações para escolher quem pode ou não acessar. Para esse caso, feito dessa maneira, qualquer aplicação pode acessar.
app.register(appRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(() => {
    console.log('HTTP Server running!')
})