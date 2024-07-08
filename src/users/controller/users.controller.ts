import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { PaginationDto } from '../../pagination/pagination.dto';
import { PaginationService } from '../../pagination/service/pagination.service';
import { AuthGuard } from '../../auth/auth.guard';
import { PaginationResult } from 'src/pagination/pagination.types';
import { Roles } from '../../roles/roles.decorator';
import { RoleName } from '../../roles/roles.enum';
import { RolesGuard } from '../../roles/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly paginationService: PaginationService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleName.ADMIN)
  @Get()
  @HttpCode(206)
  @ApiBearerAuth()
  @ApiResponse({
    status: 206,
    description:
      'Partial Content - Returns array of users without password based on page and limit query params',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid page or limit',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Missing or invalid authentication token, or user has not required role',
  })
  async getUsers(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResult<Omit<User, 'password'>>> {
    const users = await this.usersService.getUsers();
    return this.paginationService.paginate(users, paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User id',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns a user without password and roles',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication token',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found by id',
  })
  getUser(
    @Param() getUserDto: GetUserDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    return this.usersService.getUser(getUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User id',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok - Returns updated user without password and roles',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication token',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found by id',
  })
  updateUser(
    @Param() getUserDto: GetUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password' | 'roles'>> {
    return this.usersService.updateUser(getUserDto, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Returns no content',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication token',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - User not found by id',
  })
  deleteUser(@Param() getUserDto: GetUserDto): Promise<void> {
    return this.usersService.deleteUser(getUserDto);
  }
}
