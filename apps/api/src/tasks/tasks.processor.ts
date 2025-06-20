import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class TasksWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TasksWorker.name);
  private worker: Worker;
  private isInitialized = false;

  constructor(private readonly mailService: MailService) {
    this.logger.log('📦 TasksWorker instance created');
  }

  onModuleInit() {
    if (this.isInitialized) {
      this.logger.warn('⚠️ Worker already initialized. Skipping...');
      return;
    }

    this.isInitialized = true;
    this.logger.log('🚀 Initializing BullMQ Worker for queue: provision');

    this.worker = new Worker(
      'provision',
      async (job: Job) => {
        this.logger.log(`🎯 Processing job [${job.name}] with ID ${job.id}`);
        try {
          switch (job.name) {
            case 'create-cpanel-account':
              this.logger.log('🛠 Creating cPanel account...');
              // implement your logic here
              break;

            case 'setup-vps':
              this.logger.log('🖥 Setting up VPS...');
              // implement your logic here
              break;

            case 'provision-email':
              this.logger.log('📧 Provisioning email...');
              console.log(job.data);
              await this.mailService.sendOrderEmailWithInvoice(job.data);
              break;

            default:
              this.logger.warn(`⚠️ Unknown job name: ${job.name}`);
          }
        } catch (err) {
          this.logger.error(
            `❌ Error processing job ${job.id}: ${err.message}`,
            err.stack,
          );
          throw err; // re-throw so the job is marked as failed
        }
      },
      {
        connection: {
          host: 'localhost',
          port: 6379,
        },
      },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`✅ Job ${job.id} [${job.name}] completed`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(
        `❌ Job ${job?.id} [${job?.name}] failed: ${err.message}`,
        err.stack,
      );
    });
  }

  async onModuleDestroy() {
    this.logger.log('🧹 Shutting down TasksWorker...');
    if (this.worker) {
      await this.worker.close();
      this.logger.log('✅ Worker closed successfully');
    }
  }
}
