import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 *
 * Next.js hot-reloads modules in development, which would otherwise create a
 * new PrismaClient on every reload and exhaust the Postgres connection pool
 * within a few minutes. Caching on globalThis survives module reloads.
 *
 * This matters more than usual here: DATABASE_URL points at Supabase's
 * transaction-mode pooler, which has a hard connection ceiling.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
