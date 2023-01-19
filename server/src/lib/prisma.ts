import {PrismaClient} from '@prisma/client' //import para permitir acesso a db pelo back end

export const prisma = new PrismaClient({
    log: ['query']
}) // agora já tem acesso ao db

