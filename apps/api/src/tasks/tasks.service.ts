import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(@InjectQueue('provision') private provisionQueue: Queue) {}

  async queueCpanel(user: any) {
    await this.provisionQueue.add('create-cpanel-account', user);
  }

  async queueVps(user: any) {
    await this.provisionQueue.add('setup-vps', user);
  }

  async queueEmail(id: string) {
    console.log('Queueing email provisioning for user:', id);
    const job = await this.provisionQueue.add('provision-email', id, {
      removeOnComplete: true,
      attempts: 3,
    });

    console.log('Email provisioning job created:', job.id);
  }
}
