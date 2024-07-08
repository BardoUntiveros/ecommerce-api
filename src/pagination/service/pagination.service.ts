import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../pagination.dto';
import { PaginationResult } from '../pagination.types';

@Injectable()
export class PaginationService {
  paginate<T>(items: T[], paginationDto: PaginationDto): PaginationResult<T> {
    let { page, limit } = paginationDto;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 5;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = items.slice(startIndex, endIndex);

    return {
      page: page,
      totalCount: items.length,
      data: results,
    };
  }
}
