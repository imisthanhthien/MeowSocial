import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entities/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Users } from 'src/entities/users.entity';
import { Posts } from 'src/entities/posts.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepo: Repository<Comments>,
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,

    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private notificationsService: NotificationsService,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const { userId, postId, content } = createCommentDto;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException('Post not found');

    const comment = this.commentRepo.create({
      user,
      post,
      content,
    });
    const savedComment = await this.commentRepo.save(comment);
    const userIdNumber = Number(userId);

    if (post.user.id !== userId) {

      const existingNoti = await this.notificationsService.findOneIdOnly({
        type: 'comment',
        sourceId: post.id,
        actorId: userIdNumber,
      });

      if (!existingNoti) {
        await this.notificationsService.create({
          type: 'comment',
          sourceId: post.id,
          user: post.user,
          actor: user,
        });
      }
    }
    return savedComment;
  }

  async findAll() {
    return this.commentRepo.find({ relations: ['user', 'post'] });
  }

  async findByPost(postId: number) {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number) {
    return this.commentRepo.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }

  async update(id: number, content: string) {
    await this.commentRepo.update(id, { content });
    return this.findById(id);
  }

  async remove(id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const notificationId = await this.notificationsService.findOneIdOnly({
      type: 'comment',
      sourceId: Number(id),
      actorId: comment.user.id,
    });
    console.log('Check tìm notification:', {
      type: 'comment',
      sourceId: id,
      actorId: comment.user.id
    });

    if (notificationId) {
      await this.notificationsService.delete(notificationId);
    }
    return this.commentRepo.delete(id);
  }
}
