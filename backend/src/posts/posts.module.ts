import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Users } from 'src/entities/users.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
