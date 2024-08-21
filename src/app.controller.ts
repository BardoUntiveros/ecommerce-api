import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Default')
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns default message',
  })
  getHello(): string {
    return this.appService.getDefaultMessage();
  }
}
