import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@repo/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
        });

        // Type the event properly
        (this.prisma as any).$on('query', (e: Prisma.QueryEvent) => {
            this.logger.log('Query: ' + e.query);
            this.logger.log('Duration: ' + e.duration + 'ms');
        });
    }

    async onModuleInit() {
        try {
            await this.prisma.$connect();
            this.logger.log('Successfully connected to the database');
        } catch (error) {
            this.logger.error('Failed to connect to the database', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        try {
            await this.prisma.$disconnect();
            this.logger.log('Successfully disconnected from the database');
        } catch (error) {
            this.logger.error('Failed to disconnect from the database', error);
        }
    }

    // Schema Models
    get user() { return this.prisma.user; }
    get campaign() { return this.prisma.campaign; }
    get submission() { return this.prisma.submission; }
    get influencer() { return this.prisma.influencer; }
    get brand() { return this.prisma.brand; }
    get campaignInfluencer() { return this.prisma.campaignInfluencer; }
}