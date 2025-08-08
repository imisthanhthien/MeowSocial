// follows.controller.ts
import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':followerId/follow/:followingId')
  follow(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ) {
    return this.followsService.followUser(followerId, followingId);
  }

  @Delete(':followerId/unfollow/:followingId')
  unfollow(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ) {
    return this.followsService.unfollowUser(followerId, followingId);
  }

  @Get(':userId/followers')
  getFollowers(@Param('userId') userId: number) {
    return this.followsService.getFollowers(userId);
  }

  @Get(':userId/following')
  getFollowing(@Param('userId') userId: number) {
    return this.followsService.getFollowing(userId);
  }

  @Get(':followerId/is-following/:followingId')
  isFollowing(
    @Param('followerId') followerId: number,
    @Param('followingId') followingId: number,
  ) {
    return this.followsService.isFollowing(followerId, followingId);
  }
}
