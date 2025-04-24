import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const javaCourseId = 'java-course-id'; // The ID for the Java course
  const javaQuizId = 'java-online-test'; // The ID for the Java program exam

  // Check if the Java course exists, create if not
  let javaCourse = await prisma.course.findUnique({
    where: { id: javaCourseId },
  });

  if (!javaCourse) {
    javaCourse = await prisma.course.create({
      data: {
        id: javaCourseId,
        title: 'Java Programming Course',
        description: 'Course for Java programming fundamentals and advanced topics',
        price: 0,
        level: 'Beginner',
        instructorId: 'instructor-id-placeholder', // Replace with actual instructor ID if needed
      },
    });
    console.log('Created Java programming course');
  } else {
    console.log('Java programming course already exists');
  }

  // Delete all quizzes except the Java program exam
  await prisma.quiz.deleteMany({
    where: {
      id: {
        not: javaQuizId,
      },
    },
  });
  console.log('Deleted all quizzes except the Java program exam');

  // Check if the Java program exam exists
  const javaQuiz = await prisma.quiz.findUnique({
    where: { id: javaQuizId },
  });

  if (!javaQuiz) {
    // Create the Java program exam with objective type questions
    await prisma.quiz.create({
      data: {
        id: javaQuizId,
        title: 'Java Program Exam',
        courseId: javaCourseId,
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
            {
              question: 'Which method is the entry point of a Java program?',
              options: 'main,start,init,run',
              answer: 'main',
            },
            {
              question: 'What is the default value of a boolean variable in Java?',
              options: 'true,false,null,0',
              answer: 'false',
            },
            {
              question: 'Which package is automatically imported in every Java program?',
              options: 'java.lang,java.util,java.io,java.net',
              answer: 'java.lang',
            },
            // Add more objective questions as needed
          ],
        },
      },
    });
    console.log('Created Java program exam with objective questions');
  } else {
    console.log('Java program exam already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
