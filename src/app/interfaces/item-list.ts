export class ItemList<T> {
    currentPage!: number;    
    pageSize!: number;
    from!: number;
    to!: number;
    totalCount!: number;
    totalPages!: number;
    items!: T[];
}