import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const javaQuizId = 'java-online-test'; // The ID for the Java program exam
  const instructorEmail = 'instructor@example.com'; // Email for the instructor user

  // Delete all quizzes
  await prisma.quiz.deleteMany({});
  console.log('Deleted all quizzes');

  // Find or create instructor user
  let instructor = await prisma.user.findUnique({
    where: { email: instructorEmail },
  });

  if (!instructor) {
    instructor = await prisma.user.create({
      data: {
        name: 'Java Instructor',
        email: instructorEmail,
        password: 'hashed-password', // Replace with actual hashed password or handle accordingly
        role: 'INSTRUCTOR',
        agreedToTerms: true,
      },
    });
    console.log('Created instructor user:', instructor.email);
  } else {
    console.log('Instructor user already exists:', instructor.email);
  }

  // Find or create course linked to instructor
  let javaCourse = await prisma.course.findFirst({
    where: { instructorId: instructor.id },
  });

  if (!javaCourse) {
    javaCourse = await prisma.course.create({
      data: {
        title: 'Java Programming',
        description: 'Course for Java programming',
        price: 0,
        instructorId: instructor.id,
      },
    });
    console.log('Created Java course:', javaCourse.id);
  } else {
    console.log('Java course already exists:', javaCourse.id);
  }

  // Create the Java program exam with objective type questions
  await prisma.quiz.create({
    data: {
      id: javaQuizId,
      title: 'Java Program Exam',
      course: {
        connect: { id: javaCourse.id },
      },
      questions: {
        create: [
          {
            question: 'What is the size of int in Java?',
            options: '8,16,32,64',
            answer: '32',
          },
          {
            question: 'Which keyword is used to inherit a class in Java?',
            options: 'extends,implements,inherit,super',
            answer: 'extends',
          },
          // Add more objective questions as needed
        ],
      },
    },
  });
  console.log('Created Java program exam with objective questions');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
