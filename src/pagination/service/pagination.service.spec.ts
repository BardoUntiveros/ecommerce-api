import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from './pagination.service';
import { PaginationDto } from '../pagination.dto';

describe('PaginationService', () => {
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    paginationService = module.get<PaginationService>(PaginationService);
  });

  describe('paginate', () => {
    it('should be defined', () => {
      expect(paginationService.paginate).toBeDefined();
    });

    it('should return paginated items even with no query params', () => {
      const items = [
        { id: 'test-id-1' },
        { id: 'test-id-2' },
        { id: 'test-id-3' },
      ];
      const paginationDto: PaginationDto = {
        page: undefined,
        limit: undefined,
      };
      const expectedResult = {
        page: 1,
        totalCount: 3,
        data: [{ id: 'test-id-1' }, { id: 'test-id-2' }, { id: 'test-id-3' }],
      };

      const result = paginationService.paginate(items, paginationDto);

      expect(result).toEqual(expectedResult);
    });

    it('should return paginated items for a single page', () => {
      const items = [{ id: 'test-id-1' }, { id: 'test-id-2' }];
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 5,
      };
      const expectedResult = {
        page: 1,
        totalCount: 2,
        data: [{ id: 'test-id-1' }, { id: 'test-id-2' }],
      };

      const result = paginationService.paginate(items, paginationDto);

      expect(result).toEqual(expectedResult);
    });

    it('should return paginated items for multiple pages', () => {
      const items = [
        { id: 'test-id-1' },
        { id: 'test-id-2' },
        { id: 'test-id-3' },
        { id: 'test-id-4' },
        { id: 'test-id-5' },
        { id: 'test-id-6' },
        { id: 'test-id-7' },
      ];
      const paginationDto: PaginationDto = {
        page: 2,
        limit: 3,
      };
      const expectedResult = {
        page: 2,
        totalCount: 7,
        data: [{ id: 'test-id-4' }, { id: 'test-id-5' }, { id: 'test-id-6' }],
      };

      const result = paginationService.paginate(items, paginationDto);

      expect(result).toEqual(expectedResult);
    });
  });
});
