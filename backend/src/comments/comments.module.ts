import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/entities/comments.entity';
import { Users } from 'src/entities/users.entity';
import { Posts } from 'src/entities/posts.entity';
import { NotificationsModule } from 'src/notifications/notifications.module'; 
@Module({
  imports: [TypeOrmModule.forFeature([Comments, Users, Posts]),
   NotificationsModule,
],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
