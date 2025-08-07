import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Like a post
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async likePost(@Param('postId') postId: number, @Req() req) {
    await this.likesService.likePost(req.user.userId, postId);
    return { message: 'Đã like bài viết' };
  }

  // Unlike (drop like)
  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async unlikePost(@Param('postId') postId: number, @Req() req) {
    await this.likesService.unlikePost(req.user.userId, postId);
    return { message: 'Đã bỏ like bài viết' };
  }

  //Check User liked post
@UseGuards(JwtAuthGuard)
@Get('check/:postId')
async hasLiked(@Param('postId') postId: number, @Req() req) {
  const userId = req.user.userId;
  const liked = await this.likesService.hasLiked(userId, postId);
  return { liked };
}

  //List liked post
 @Get('post/:postId')
async getLikes(@Param('postId') postId: number) {
  const users = await this.likesService.getUsersWhoLikedPost(postId);

  return {
    likeCount: users.length,
    users,
  };
}
}
