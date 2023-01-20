import {PrismaClient} from '@prisma/client' //import para permitir acesso a db pelo back end

export const prisma = new PrismaClient({
    log: ['query'] // para mostrar no console as querys que foram feitas
}) // agora já tem acesso ao db

