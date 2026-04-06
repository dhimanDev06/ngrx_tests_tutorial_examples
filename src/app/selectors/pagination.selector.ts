import { createSelector } from "@ngrx/store";
import { PaginationAndPagerInterface, PaginationDataInterface } from "../interfaces/pagination-and-pager.interface";

export const selectData = (state: any) => {
    let all = {...state};
    return all.pagination.targetSource;
};

export const selectPage = (page: string) => createSelector(
    selectData,
    (data: PaginationAndPagerInterface) => {
        if(data && data?.page === page) {
            return data;
        }

        return undefined;
    }
);