import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';

import { ActionChangeDTO } from '../models/action.dto';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';

import { ActionService } from './action.service';

@Controller('action')
@UseInterceptors(NotFoundInterceptor)
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  public async getAll() {
    return await this.actionService.getAll();
  }

  @Get('/:id')
  public async getByID(@Param('id') id: string) {
    return await this.actionService.getByID(id);
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateActionDTO: ActionChangeDTO,
  ) {
    return await this.actionService.update(id, updateActionDTO);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    return await this.actionService.remove(id);
  }
}
