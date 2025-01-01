import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsInt()
  depth: number;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
