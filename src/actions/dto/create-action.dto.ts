import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ActionType } from './action.enum';

export class CreateActionDto {
  @ApiProperty()
  @IsEnum(ActionType)
  actionType: ActionType;

  @ApiProperty({ required: true })
  @IsString()
  gift: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  recipient?: string;
}
