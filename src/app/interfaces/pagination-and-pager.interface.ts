export interface PaginationDataInterface {
    targetSource: PaginationAndPagerInterface | undefined | null,
    data: PaginationAndPagerInterface[];
}

export interface PaginationAndPagerInterface {
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    page: string;
}