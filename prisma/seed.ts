// Import PrismaClient and the Role enum directly from the generated Prisma Client
import { PrismaClient, Role } from '@prisma/client';

// Instantiate a single PrismaClient instance to connect to your Neon PostgreSQL database
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing records in correct relation order (child records first) to avoid foreign key violations
  await prisma.attendanceLog.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Default Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@abuad.edu.ng',
      fullName: 'ABUAD System Admin',
      passwordHash: '$2b$10$e8N8pZ5.9hQzK1o.H7sE7u4vK1o.H7sE7u4vK1o.H7sE7u4vK1o', // Placeholder hashed string
      role: Role.ADMIN,
    },
  });

  // 3. Create Default Lecturer User
  const lecturer = await prisma.user.create({
    data: {
      email: 'lecturer@abuad.edu.ng',
      fullName: 'Dr. Ojo Oluwapelumi',
      passwordHash: '$2b$10$e8N8pZ5.9hQzK1o.H7sE7u4vK1o.H7sE7u4vK1o.H7sE7u4vK1o', // Placeholder hashed string
      role: Role.LECTURER,
    },
  });

  // 4. Create Default Student User
  const student = await prisma.user.create({
    data: {
      email: 'student@abuad.edu.ng',
      fullName: 'Afe Babalola Student',
      passwordHash: '$2b$10$e8N8pZ5.9hQzK1o.H7sE7u4vK1o.H7sE7u4vK1o.H7sE7u4vK1o', // Placeholder hashed string
      role: Role.STUDENT,
      matricNumber: '20/ENG02/001',
    },
  });

  // 5. Create Default Test Course assigned to the Lecturer
  const course = await prisma.course.create({
    data: {
      code: 'CSC 401',
      title: 'Software Engineering Principles',
      lecturerId: lecturer.id,
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log({ admin, lecturer, student, course });
}

// Run the seeding logic and handle error catching & connection cleanup cleanly
main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Always disconnect Prisma Client to avoid leaving open connections on Neon
    await prisma.$disconnect();
  });