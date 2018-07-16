export interface Item {
    etag: string;
    id: string;
    snippet: Snippet;
    player: Player;
    contentDetails: ContentDetails;
}

export interface ContentDetails {
    videoId: string;
    videoPublishedAt?: string;
}

export interface Player {
    embedHtml: string;
}

export interface Snippet {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails?: Thumbnails;
    position: number;
    resourceId: ResourceID;
}

export interface ResourceID {
    videoId: string;
}

export interface Thumbnails {
    default: Default;
    medium: Default;
    high: Default;
    standard?: Default;
    maxres?: Default;
}

export interface Default {
    url: string;
    width: number;
    height: number;
}
