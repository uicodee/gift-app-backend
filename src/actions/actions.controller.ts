import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Action } from './schemas/action.schema';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @ApiBody({ type: CreateActionDto })
  @Post()
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionsService.create(createActionDto);
  }

  @ApiOkResponse({ type: [Action] })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':giftId')
  findGiftAll(@Param('giftId') giftId: string) {
    return this.actionsService.findGiftAll(giftId);
  }

  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionsService.findOne(id);
  }
}
