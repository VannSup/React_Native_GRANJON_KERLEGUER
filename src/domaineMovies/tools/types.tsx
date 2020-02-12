export type Movie = {
  title: string;
  alternative_titles: [string];
  year: number;
  image: string;
  color: string;
  score: number;
  rating: number;
  actors: [string];
  actor_facets: [string];
  genre: [string];
  objectID: string;
};

export type ApiResult = {
  hits: Movie[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: string;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
};
