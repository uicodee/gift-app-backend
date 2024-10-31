import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from './schemas/user.schema';
import { TelegramAuth } from 'src/auth/guards/auth.guard';
import { OrderBy } from './dto/order-by.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth('Authorization')
  @UseGuards(TelegramAuth)
  @ApiOkResponse({ type: User })
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  @ApiQuery({ name: 'orderBy', enum: OrderBy, required: false })
  findAll(@Query('orderBy') orderBy: OrderBy = OrderBy.default) {
    return this.usersService.findAll(orderBy);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
