import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import http from '../config/http';
import api from '../config/api';
import { SearchResult } from 'src/types';
import { SearchController } from './search.controller';

const EmptyResult = {
  FirstURL: ``,
  Result: '',
  Text: '',
};

describe('SearchController', () => {
  let searchController: SearchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          load: [http, api],
        }),
      ],
      controllers: [SearchController],
      providers: [SearchService]
    }).compile();

    searchController = app.get<SearchController>(SearchController);
  });

  describe('root', () => {
    it('should return empty', async () => {
        const params = {
            q: '',
            page: 0,
            limit: 0
        }

      expect(await searchController.search(params)).toEqual({
        data: expect.any(Array),
        meta: {
            page: expect.any(Number),
            limit: expect.any(Number),
            total: expect.any(Number),
        }
      });
    });

    it('should return non empty', async () => {
        const params = {
            q: 'quack',
            page: 0,
            limit: 10
        }

      const results = await searchController.search(params);
        
      expect(results).toEqual({
        data: expect.any(Array),
        meta: {
            page: expect.any(Number),
            limit: expect.any(Number),
            total: expect.any(Number),
        }
      });
      expect(results.data).toHaveLength(10);
    });
  });
});
