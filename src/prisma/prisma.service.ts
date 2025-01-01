import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  // Connect to the database when the module is initialized
  async onModuleInit() {
    await this.$connect();
  }

  // Disconnect from the database when the module is destroyed
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Optional: Add a method for clearing the database (useful for tests)
  async cleanDatabase() {
    const tableNames = Reflect.ownKeys(this).filter((key) => typeof this[key as keyof this] === 'object');
    for (const tableName of tableNames) {
      if (typeof tableName === 'string') {
        await (this[tableName as keyof this] as any).deleteMany();
      }
    }
  }
}

