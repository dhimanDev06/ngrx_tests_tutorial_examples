export interface BookInterface {
    id: string;
    volumeInfo: {
      title: string;
      authors: Array<string>;
    };
}

export interface PostInterface {
    id: string;
    userId: string;
    title: string;
    body: string;
}