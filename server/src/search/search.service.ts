import { Injectable } from '@nestjs/common';
import { RelatedTopic, SubRelatedTopic, SearchResult } from '../types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

type SearchResponse = {
  RelatedTopics: RelatedTopic[];
};

@Injectable()
export class SearchService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async search(query: string): Promise<SearchResult[]> {
    const url = this.configService.get<string>('searchApi');

    try {
      const response = await firstValueFrom(
        this.httpService.get<SearchResponse>(url, {
          params: {
            q: query,
            format: 'json',
          },
        }),
      );

      return this.parseSearchResult(response.data);
    } catch (error) {
      // Apparently DuckDuckGo don't like if the query field is empty
      // It returns 403 forbidden, but for us, empty should just return empty for the Front-end
      // Here we catch all Axios errors and return empty, if not, throw as normal.
      if (error instanceof AxiosError) {
        return [];
      }

      throw error;
    }
  }

  paginate(results: SearchResult[], page: number, limit: number) {
    const total = results.length;

    if (page * limit > total) {
      return [];
    }

    return results.slice(page * limit, page * limit + limit);
  }

  /**
   * Parses the RelatedTopics fields into a array of SearchResults
   * @param data search results
   * @returns
   */
  private parseSearchResult(data: SearchResponse) {
    return data.RelatedTopics.reduce((sum, topic) => {
      if (topic.hasOwnProperty('Name')) {
        return [...sum, ...(topic as SubRelatedTopic).Topics];
      }

      return [...sum, topic];
    }, []).map((item) => ({
      FirstURL: item.FirstURL,
      Result: item.Result,
      Text: item.Text,
    }));
  }
}
