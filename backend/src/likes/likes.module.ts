import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from 'src/entities/likes.entity';
import { Users } from 'src/entities/users.entity';
import { Posts } from 'src/entities/posts.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Notifications } from 'src/entities/notifications.entity';
import { NotificationsModule } from 'src/notifications/notifications.module'; 
@Module({
   imports: [TypeOrmModule.forFeature([Likes, Users, Posts, Notifications]),
   NotificationsModule
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
