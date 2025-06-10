import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { Copyright, ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
    limit?: number,
    offset?: number,
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[],
    name?: string,
    owner?: Owner;
    public?: boolean;
    snapshot_id?: string;
    type?: "playlist";
    uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist{
    tracks?:{
        href?: string;
        total?: number;
    };
}

export interface Playlist extends BasePlaylist{
    // tracks?: {
    //     href: string;
    //     limit: number;
    //     next: string | null;
    //     offset: number;
    //     previous: string | null;
    //     total: number;
    // };
    tracks?: ApiResponse<PlaylistTrack>;
}

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: Track | Episode;
}

export interface Track {
    albums?: SimplifiedAlbum;
    artists?: Artist;
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: {
        isrc?: string;
        ean?: string;
        upc?: string;
    };
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: {};
    restrictions?: {
        reason?: string;
    };
    name?: string;
    popularity?: string;  
    preview_url?: string | null;
    track_number?: number;
    type?: "track";
    uri?: string;
    is_local?: boolean;
}

export interface Episode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: string;
    restrictions?: {
        reason?: string;
    };
    show: Show;
}

export interface Show {
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
} 