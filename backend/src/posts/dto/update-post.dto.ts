import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl({}, { message: 'imageUrl phải là đường dẫn hợp lệ' })
  imageUrl?: string;
}
