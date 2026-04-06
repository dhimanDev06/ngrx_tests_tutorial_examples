import { createAction, props } from "@ngrx/store";

export const setPager = createAction(
    "[Pager] setPager", 
    props<{ itemsPerPage: number, page: string }>()
);

export const setCurrentPage = createAction(
    "[Pagination] setPagination", 
    props<{ currentPage: number, totalPages: number, page: string }>()
);

export const setTotalPages = createAction(
    "[General] setTotalPages", 
    props<({totalPages: number, itemsPerPage: number, page: string})>()
);

export const setDataSource = createAction(
    "[Pager or Pagination] setDataSource", 
    props<{ page: string }>()
);
