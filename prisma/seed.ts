import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '@/lib/auth'; // Adjust path if auth.ts is located elsewhere (e.g., './auth' or '@/utils/auth')

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Generate a real hashed password using our auth utility
  const defaultPasswordHash = await hashPassword('Password123!');

  // 2. Clean existing records in correct relation order (child records first)
  await prisma.attendanceLog.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // 3. Create Default Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@abuad.edu.ng',
      fullName: 'ABUAD System Admin',
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN,
    },
  });

  // 4. Create Default Lecturer User
  const lecturer = await prisma.user.create({
    data: {
      email: 'lecturer@abuad.edu.ng',
      fullName: 'Dr. Ojo Oluwapelumi',
      passwordHash: defaultPasswordHash,
      role: Role.LECTURER,
    },
  });

  // 5. Create Default Student User
  const student = await prisma.user.create({
    data: {
      email: 'student@abuad.edu.ng',
      fullName: 'Afe Babalola Student',
      passwordHash: defaultPasswordHash,
      role: Role.STUDENT,
      matricNumber: '20/ENG02/001',
    },
  });

  // 6. Create Default Test Course assigned to the Lecturer
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

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });