import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        const users = await prisma.user.findMany();
        console.log('Database connection successful. Users:', users);
    } catch (error) {
        console.error('Database connection failed:', error);
        if (error.code === 'P1001') {
            console.error('Cannot reach database server at the specified host and port');
        } else if (error.code === 'P1017') {
            console.error('Database server has closed the connection');
        }
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
