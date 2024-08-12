import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { PaginatedResponse, SearchResult } from '../types';
import { SearchInputDTO } from 'src/dto/SearchInput';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query() { q, page = 0, limit = 10 }: SearchInputDTO,
  ): Promise<PaginatedResponse<SearchResult[]>> {
    const results = await this.searchService.search(q);

    return {
      data: this.searchService.paginate(results, page, limit),
      meta: {
        page,
        limit,
        total: results.length,
      },
    };
  }
}
