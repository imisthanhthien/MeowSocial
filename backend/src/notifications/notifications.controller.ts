import { Controller, Post, Get, Body, Param, Delete, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() body: any) {
    return this.notificationsService.create(body);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.notificationsService.findByUserId(userId);
  }

  @Patch(':id/seen')
  markSeen(@Param('id') id: number) {
    return this.notificationsService.markAsSeen(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notificationsService.delete(id);
  }
}
