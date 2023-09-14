
export interface YoutubeApiResponse {
  kind: string;
  etag: string;
  items: Array<Video>;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
