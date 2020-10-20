import { SpotifyImage } from './album';

export interface Artist {
  name: string;
  image: SpotifyImage;
  genres: string[];
}

export interface ArtistResponse {
  external_urls: any;
  followers: any;
  genres: string[];
  href: string;
  id: string;
  images: any[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
