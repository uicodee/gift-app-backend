import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ActionType } from './action.enum';

export class CreateActionDto {
  @ApiProperty({ required: true })
  @IsString()
  user: string;

  @ApiProperty({ required: true })
  @IsString()
  gift: string;

  @ApiProperty({ required: false })
  @IsString()
  recipient?: string;

  @ApiProperty()
  @IsEnum(ActionType)
  actionType: ActionType;
}
