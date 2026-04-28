export interface SearchResult<T> {
  hits: T[];
  total: number;
  aggregations?: SearchAggregations;
}

export interface SearchAggregations {
  categories?: AggregationBucket[];
  brands?: AggregationBucket[];
  priceRanges?: AggregationBucket[];
  ratings?: AggregationBucket[];
  [key: string]: AggregationBucket[] | undefined;
}

export interface AggregationBucket {
  key: string;
  label: string;
  count: number;
}

export interface AutocompleteResult {
  suggestions: AutocompleteSuggestion[];
}

export interface AutocompleteSuggestion {
  text: string;
  type: 'product' | 'category' | 'brand';
  id?: number;
  slug?: string;
  imageUrl?: string;
}
