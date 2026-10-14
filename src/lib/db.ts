// Import PrismaClient from the auto-generated Prisma package
import { PrismaClient } from '@prisma/client';

// Augment Node's global object type to prevent duplicate instances during hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse existing PrismaClient instance if it exists, or instantiate a single new one
export const db = globalForPrisma.prisma ?? new PrismaClient();

// If we are in development mode, attach the client instance to globalThis
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;