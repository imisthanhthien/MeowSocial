import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from 'src/entities/likes.entity';
import { Users } from 'src/entities/users.entity';
import { Posts } from 'src/entities/posts.entity';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Users, Posts])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
