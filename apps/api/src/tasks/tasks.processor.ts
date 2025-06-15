import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, Job } from 'bullmq';

@Injectable()
export class TasksWorker implements OnModuleInit, OnModuleDestroy {
  private worker: Worker;

  onModuleInit() {
    this.worker = new Worker(
      'provision',
      async (job: Job) => {
        switch (job.name) {
          case 'create-cpanel-account':
            console.log('Creating cPanel account:', job.data);
            break;
          case 'setup-vps':
            console.log('Setting up VPS:', job.data);
            break;
          case 'provision-email':
            console.log('Provisioning email:', job.data);
            break;
          default:
            console.log('Unknown job:', job.name);
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
      console.log(`Job ${job.id} has completed!`);
    });

    this.worker.on('failed', (job: any, err) => {
      console.error(`Job ${job.id} failed with error: ${err.message}`);
    });
  }

  async onModuleDestroy() {
    await this.worker.close();
  }
}
