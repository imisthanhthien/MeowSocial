// follows.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follows } from 'src/entities/follows.entity';
import { Users } from 'src/entities/users.entity';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Follows, Users])],
  providers: [FollowsService],
  controllers: [FollowsController],
})
export class FollowsModule {}
