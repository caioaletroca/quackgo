export type SearchResult = {
  FirstURL: string;
  Result: string;
  Text: string;
};

export type SubRelatedTopic = {
  Name: string;
  Topics: SearchResult[];
};

export type RelatedTopic = SearchResult | SubRelatedTopic;
