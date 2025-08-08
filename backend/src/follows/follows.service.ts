// follows.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follows } from 'src/entities/follows.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followsRepo: Repository<Follows>,
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
  ) { }

  async followUser(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new Error('Không thể tự theo dõi chính mình');
    }

    const existingFollow = await this.followsRepo.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
    });

    if (existingFollow) return;

    const follower = await this.usersRepo.findOneBy({ id: followerId });
    const following = await this.usersRepo.findOneBy({ id: followingId });

    if (!follower || !following) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const follow = this.followsRepo.create({ follower, following });
    return this.followsRepo.save(follow);
  }

  async unfollowUser(followerId: number, followingId: number) {
    await this.followsRepo.delete({
      follower: { id: followerId },
      following: { id: followingId },
    });
  }

  async getFollowers(userId: number) {
    const followers = await this.followsRepo.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });

    return followers.map(f => {
      const { id, name, email, avatarUrl } = f.follower;
      return { id, name, email, avatarUrl };
    });
  }

  async getFollowing(userId: number) {
    const following = await this.followsRepo.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });

    return following.map(f => {
      const { id, name, email, avatarUrl } = f.following;
      return { id, name, email, avatarUrl };
    });
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    const existing = await this.followsRepo.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
    });
    return !!existing;
  }
}
