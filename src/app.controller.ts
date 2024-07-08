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
    console.log(process.env.SERVER_PORT);
    console.log(process.env.POSTGRES_HOST);
    console.log(process.env.POSTGRES_DB);
    return this.appService.getDefaultMessage();
  }
}
