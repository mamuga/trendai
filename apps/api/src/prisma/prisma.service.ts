import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { P } from "@repo/db"

@Injectable()
export class PrismaService extends P.PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Successfully connected to the database');
        } catch (error) {
            this.logger.error('Failed to connect to the database', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
            this.logger.log('Successfully disconnected from the database');
        } catch (error) {
            this.logger.error('Failed to disconnect from the database', error);
        }
    }
}

