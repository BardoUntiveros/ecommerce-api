import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes/upload-image.pipe';
import { FilesService } from './files.service';
import { File } from './files.entity';
import { GetProductDto } from '../products/dto/get-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AuthGuard)
  // :id -> Product id
  @Post('upload-image/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: 'Created - Returns created file',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid params or payload',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Product not found by id',
  })
  uploadImage(
    @Param() getProductDto: GetProductDto,
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ): Promise<File> {
    return this.filesService.uploadImage(getProductDto, file);
  }
}

export { FilesController };
