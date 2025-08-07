import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepo: Repository<Notifications>,
  ) {}

  async create(notification: Partial<Notifications>) {
    const newNoti = this.notificationRepo.create(notification);
    return this.notificationRepo.save(newNoti);
  }

  async findAll() {
    return this.notificationRepo.find({ relations: ['user'] });
  }

  async findByUserId(userId: number) {
    return this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsSeen(id: number) {
    await this.notificationRepo.update(id, { seen: true });
    return { message: 'Notification marked as seen' };
  }

  async delete(id: number) {
    await this.notificationRepo.delete(id);
    return { message: 'Notification deleted' };
  }
}
