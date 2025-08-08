import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepo: Repository<Notifications>,
  ) { }

  async create(notification: Partial<Notifications>) {
    const newNoti = this.notificationRepo.create(notification);
    return this.notificationRepo.save(newNoti);
  }

  async findAll() {
    return this.notificationRepo.find({ relations: ['user'] });
  }

  async findOneIdOnly(criteria: {
    type: string;
    sourceId: number;
    actorId: number;

  }): Promise<number | null> {
    const existing = await this.notificationRepo.findOne({
      where: {
        type: criteria.type,
        sourceId: criteria.sourceId,
        actor: { id: criteria.actorId },
      },
      select: ['id'],
    });

    return existing?.id || null;
  }

  async findByUserId(userId: number) {
    return this.notificationRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'actor'],
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

  async findOne(options: FindOneOptions<Notifications>) {
    return this.notificationRepo.findOne(options);
  }

}
