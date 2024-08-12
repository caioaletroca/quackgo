import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import http from '../config/http';
import api from '../config/api';
import { SearchResult } from 'src/types';

const EmptyResult = {
  FirstURL: ``,
  Result: '',
  Text: '',
};

const generateResults = (): SearchResult[] => {
  return Array(50)
    .fill(0)
    .map((_, index) => ({
      ...EmptyResult,
      FirstURL: `${index}`,
    }));
};

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          load: [http, api],
        }),
      ],
      providers: [SearchService],
    }).compile();

    searchService = app.get<SearchService>(SearchService);
  });

  describe('root', () => {
    it('should return empty', async () => {
      expect(await searchService.search('')).toHaveLength(0);
    });

    it('should return non empty', async () => {
      const results = await searchService.search('quack');

      expect(results).not.toHaveLength(0);
      expect(results[0]).toEqual({
        FirstURL: expect.any(String),
        Result: expect.any(String),
        Text: expect.any(String),
      });
    });

    it('should return empty if limit is zero', async () => {
      const data = generateResults();

      expect(await searchService.paginate(data, 0, 0)).toHaveLength(0);
    });

    it('should return empty if data is empty', async () => {
      expect(await searchService.paginate([], 0, 0)).toHaveLength(0);
    });

    it('should return empty if page and limit is higher than data size', async () => {
      const data = generateResults();

      expect(await searchService.paginate(data, 100, 25)).toHaveLength(0);
    });

    it('should paginate correctly', async () => {
      const data = generateResults();

      const firstPage = await searchService.paginate(data, 0, 10);
      const secondPage = await searchService.paginate(data, 1, 10);

      expect(firstPage).toHaveLength(10);
      expect(firstPage[0].FirstURL).toBe('0');
      expect(secondPage).toHaveLength(10);
      expect(secondPage[0].FirstURL).toBe('10');
    });
  });
});
