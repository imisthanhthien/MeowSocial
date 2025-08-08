import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from 'src/entities/likes.entity';
import { Posts } from 'src/entities/posts.entity';
import { Users } from 'src/entities/users.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private likesRepo: Repository<Likes>,
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
    @InjectRepository(Posts)
    private postsRepo: Repository<Posts>,
    private notificationsService: NotificationsService,
  ) { }

  async likePost(userId: number, postId: number) {
    const existing = await this.likesRepo.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });

    if (existing) return;

    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    const post = await this.postsRepo.findOne({
      where: { id: postId },
      relations: ['user'], 
    });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');

    const like = this.likesRepo.create({ user, post });
    await this.likesRepo.save(like);

    if (post.user.id !== userId) {

      const existingNoti = await this.notificationsService.findOne({
        where: {
          type: 'like',
          sourceId: post.id,
          user: { id: post.user.id }, 
          actor: { id: user.id },    
        },
      });

      if (!existingNoti) {
        await this.notificationsService.create({
          type: 'like',
          sourceId: post.id,
          user: post.user,
          actor: user,
        });
      }
    }
  }

  async unlikePost(userId: number, postId: number) {
    await this.likesRepo.delete({
      user: { id: userId },
      post: { id: postId },
    });
  }

  async hasLiked(userId: number, postId: number): Promise<boolean> {
    const existing = await this.likesRepo.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    return !!existing;
  }

  async getUsersWhoLikedPost(postId: number) {
    const likes = await this.likesRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });

    return likes.map((like) => {
      const { id, name, email, avatarUrl } = like.user;
      return { id, name, email, avatarUrl };
    });
  }
}
