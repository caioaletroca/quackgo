import { Injectable } from "@nestjs/common";
import { RelatedTopic, SubRelatedTopic, SearchResults } from "../types";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";

type SearchResponse = {
    RelatedTopics: RelatedTopic[]
}

@Injectable()
export class SearchService {
    constructor(private configService: ConfigService, private readonly httpService: HttpService) {}
    
    async search(query: string): Promise<SearchResults[]> {
        const url = this.configService.get<string>("searchApi");

        const response = await firstValueFrom(this.httpService.get<SearchResponse>(url, {
            params: {
                q: query,
                format: 'json'
            }
        }));

        return this.parseSearchResult(response.data);
    }

    private parseSearchResult(data: SearchResponse) {
        return data.RelatedTopics.reduce((sum, topic) => {
            if(topic.hasOwnProperty('Name')) {
                return [ ...sum, ...(topic as SubRelatedTopic).Topics ];
            }

            return [ ...sum, topic ];
        }, [])
    }
}