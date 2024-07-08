import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    // Check if file is present
    if (!value) {
      throw new BadRequestException('File is required');
    }

    // Validating file type
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const fileType = value.mimetype;
    if (!fileTypes.includes(fileType)) {
      throw new BadRequestException(
        `El tipo de archivo no es válido. Debe ser ${fileTypes.join(' o ')}`,
      );
    }

    // Validating max file size
    const maxKB = 200;
    if (value.size > maxKB * 1024) {
      throw new BadRequestException('La imagen no puede pesar más de 200KB');
    }

    return value;
  }
}

export { FileValidationPipe };
