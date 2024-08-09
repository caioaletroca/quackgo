export type SearchResults = {
    FirstURL: string;
    Result: string;
    Text: string;
}

export type SubRelatedTopic = {
    Name: string;
    Topics: SearchResults[]
};

export type RelatedTopic = SearchResults | SubRelatedTopic;