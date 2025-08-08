import { Controller, Post, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async likePost(@Param('postId') postId: number, @Req() req) {
    await this.likesService.likePost(req.user.userId, postId);

    return { message: 'Đã like bài viết' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async unlikePost(@Param('postId') postId: number, @Req() req) {
    await this.likesService.unlikePost(req.user.userId, postId);
    console.log('Đã bỏ like bài viết');
    return { message: 'Đã bỏ like bài viết' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/:postId')
  async hasLiked(@Param('postId') postId: number, @Req() req) {
    const userId = req.user.userId;
    const liked = await this.likesService.hasLiked(userId, postId);
    return { liked };
  }

  @Get('post/:postId')
  async getLikes(@Param('postId') postId: number) {
    const users = await this.likesService.getUsersWhoLikedPost(postId);
    return {
      likeCount: users.length,
      users,
    };
  }
}
