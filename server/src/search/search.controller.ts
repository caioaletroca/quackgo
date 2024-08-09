import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Response, SearchResults } from '../types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() query: { q: string }): Promise<Response<SearchResults[]>> {
    return {
        data: await this.searchService.search(query.q)
    }
  }
}
