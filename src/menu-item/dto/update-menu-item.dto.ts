import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  depth?: number;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
