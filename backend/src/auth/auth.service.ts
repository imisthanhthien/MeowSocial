import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private jwtService: JwtService
    
  ) {}

  //register User
async register(name: string, email: string, password: string) {
  const existing = await this.userRepo.findOne({ where: { email } });
  if (existing) throw new BadRequestException('Email đã tồn tại');

  const hashed = await bcrypt.hash(password, 10); // hash Password
  const newUser = this.userRepo.create({ name, email ,password: hashed});
  const savedUser = await this.userRepo.save(newUser);
  return {
  message: 'Đăng ký thành công',
  user: {
    id: savedUser.id,
    email: savedUser.email,
    name: savedUser.name,
  },
};
}

  //login User
  async login(email: string, password: string) {
  const user = await this.userRepo.findOne({ where: { email } });
  if (!user || !user.password) {
    console.log('❌ Không tìm thấy user hoặc user không có password');
  throw new UnauthorizedException('Sai email hoặc mật khẩu');
}

const isMatch = await bcrypt.compare(password, user.password);
 console.log('🔑 Kết quả so sánh password:', isMatch);
  if (!isMatch) throw new UnauthorizedException('Sai mật khẩu');
  

 const payload = { sub: user.id, email: user.email }; // sub = subject 
  
  const token = this.jwtService.sign(payload, {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
});
 console.log('✅ Đăng nhập thành công, user ID:', user.id);

  return {
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
  };
}
}
