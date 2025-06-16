import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylist } from "./playlist";
import { Show, SimplifiedAudiobooks, SimplifiedEpisode, Track } from "./track";
import { Image } from "./commonType";

export const enum SEARCH_TYPE {
    Album ="album",
    Artist = "artist",
    Playlist ="playlist",
    Track = "track",
    Show = "show",
    Episode = "episode",
    Audiobook ="audiobook",
}

export interface SearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    album?: ApiResponse<SimplifiedAlbum>;
    tracks?: ApiResponse<Track>;
    playlists?: ApiResponse<SimplifiedPlaylist>;
    show?: ApiResponse<Show>;
    episode?: ApiResponse<SimplifiedEpisode>;
    audiobook?: ApiResponse<SimplifiedAudiobooks>;
}

export interface Category {
    href: string;
    icons: Image[];
    id: string;
    name: string;
}

export interface GetCategoriesRequest {
    locale?: "kr_KR";
    limit?: number;
    offset?: number;
}

export interface GetCategoriesResponse {
    categories: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: number | null;
        total: number;
        items: Category[];
    }
}