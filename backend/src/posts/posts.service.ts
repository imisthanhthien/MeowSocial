import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class PostsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>
  ) { }

  async create(dto: CreatePostDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    const post = this.postRepo.create({
      content: dto.content,
      imageUrl: dto.imageUrl,
      user,
    });

    return await this.postRepo.save(post);
  }

  async findAll() {
    return this.postRepo.find({
      relations: ['user', 'comments', 'likes'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'likes'],
    });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');
    return post;
  }

  async findByUserId(userId: number) {
    return this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'comments', 'likes'],
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');
    if (post.user.id !== userId)
      throw new ForbiddenException('Không có quyền chỉnh sửa bài viết này');

    post.content = dto.content ?? post.content;
    post.imageUrl = dto.imageUrl ?? post.imageUrl;

    return this.postRepo.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Bài viết không tồn tại');
    if (post.user.id !== userId)
      throw new ForbiddenException('Không có quyền xoá bài viết này');

    await this.postRepo.delete(id);
    return { message: 'Đã xoá bài viết' };
  }
}
