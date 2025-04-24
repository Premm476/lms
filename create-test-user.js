import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('testpassword123', 10);
  
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      role: 'STUDENT'
    }
  });
  console.log('Test user created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
