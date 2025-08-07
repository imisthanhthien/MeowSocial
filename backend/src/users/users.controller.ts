import { Controller, Get, Put, Delete, Param, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET profile user
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.userId);
    return {
      message: 'Thông tin người dùng từ JWT',
      user,
    };
  }

  //GET id User
@Get(':id')
async getUserById(@Param('id') id: number) {
  const user = await this.usersService.findPublicProfile(id);
  if (!user) {
    throw new NotFoundException('Không tìm thấy người dùng');
  }
  return {
    message: 'Thông tin công khai người dùng',
    user,
  };
}
// Update Profile User
@UseGuards(JwtAuthGuard)
@Put('update-profile')
async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
   console.log('👉 req.user:', req.user);
  await this.usersService.updateProfile(req.user.userId, dto);
  return { message: 'Cập nhật hồ sơ thành công' };
}

// Change Password User
@UseGuards(JwtAuthGuard)
@Put('change-password')
async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
  await this.usersService.changePassword(req.user.userId, dto);
  return { message: 'Đổi mật khẩu thành công' };
}

//Delete User
@UseGuards(JwtAuthGuard)
@Delete('delete')
async deleteAccount(@Req() req) {
  await this.usersService.deleteById(req.user.userId);
  return { message: 'Tài khoản đã bị xóa' };
}
}
