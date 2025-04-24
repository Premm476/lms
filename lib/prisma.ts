import { PrismaClient } from "@prisma/client";

type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';
type PrismaLogDefinition = {
  level: PrismaLogLevel;
  emit: 'stdout' | 'event';
};

declare global {
  var prisma: PrismaClient | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Cache the modified URL to prevent repeated modifications
const dbUrl = (() => {
  const baseUrl = process.env.DATABASE_URL;
  if (baseUrl.includes('authPlugins=mysql_native_password')) {
    return baseUrl;
  }
  return baseUrl.includes('?') 
    ? `${baseUrl}&authPlugins=mysql_native_password`
    : `${baseUrl}?authPlugins=mysql_native_password`;
})();

const prismaOptions = {
  datasources: {
    db: {
      url: dbUrl
    }
  },
  log: [
    { level: 'error', emit: 'stdout' } as PrismaLogDefinition,
    { level: 'warn', emit: 'stdout' } as PrismaLogDefinition
  ]
};

const prisma = global.prisma || new PrismaClient(prismaOptions);

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;