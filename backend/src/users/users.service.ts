import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  //findById for User
  async findById(id: number): Promise<Partial<Users> | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'avatarUrl', 'bio', 'createdAt'],
    });
  }

  //findPublicProfile for User
  async findPublicProfile(id: number): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'avatarUrl', 'bio'],
    });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return user;
  }

  //updateProfile for User
  async updateProfile(id: number, dto: UpdateUserDto): Promise<void> {
     console.log('DTO nhận được:', dto);
     console.log('📌 ID nhận được:', id); // 👈 Thêm dòng này
   const result = await this.usersRepository.update(id, dto);
  console.log('Kết quả update:', result);
  }

  //changePassword for User
  async changePassword(id: number, dto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user || !user.password) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10); // hash Password
    user.password = hashedNewPassword;
    await this.usersRepository.save(user);
  }

  //deleteById for User
  async deleteById(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    await this.usersRepository.delete(id);
  }
  
}
