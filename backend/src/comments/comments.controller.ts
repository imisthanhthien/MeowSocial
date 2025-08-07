import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('post/:postId')
findByPost(@Param('postId') postId: number) {
  return this.commentsService.findByPost(+postId); // Phải trả về mảng
}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('content') content: string) {
    return this.commentsService.update(id, content);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
