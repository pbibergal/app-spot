export interface AlbumResponseItem {
  album_group: string;
  album_type: string;
  artists: any;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface AlbumResponse {
  href: string;
  items: AlbumResponseItem[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
}

export interface Album {
  id: string;
  image: string;
  thumbnail: string;
  name: string;
  release_date: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}
