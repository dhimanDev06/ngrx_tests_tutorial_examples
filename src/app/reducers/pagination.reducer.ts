import { createReducer, on } from "@ngrx/store";
import * as PaginationActions from '../actions/pagination.actions'
import { PaginationAndPagerInterface, PaginationDataInterface } from "../interfaces/pagination-and-pager.interface";

export const initialState: PaginationDataInterface = {
    data: [
        { itemsPerPage: 5, currentPage: 1, totalPages: 0, page: 'users' },
        { itemsPerPage: 5, currentPage: 1, totalPages: 0, page: 'animals' },
    ],
    targetSource: undefined
}

export const paginationReducer = createReducer(
    initialState,
    on(PaginationActions.setPager, (state, {itemsPerPage, page}) => 
        ({...state, data: modifyPageData(state, itemsPerPage, page), targetSource: undefined })
    ),
    on(PaginationActions.setCurrentPage, (state, {currentPage, totalPages, page}) => 
        ({...state, data: modifyCurrentPage(state, currentPage, totalPages, page), targetSource: undefined })
    ),
    on(PaginationActions.setTotalPages, (state, {totalPages, itemsPerPage, page}) => 
        ({...state, data: modifyTotalPages(state, totalPages, itemsPerPage, page), targetSource: undefined })
    ),
    on(PaginationActions.setDataSource, (state, {page}) => 
        ({...state, targetSource: getTargetDataSource(state, page) }) 
    )
);

export const modifyPageData = (state: PaginationDataInterface, itemsPerPage: number, page: string): PaginationAndPagerInterface[] => {
    let data: PaginationAndPagerInterface[] = structuredClone(state.data);
    let targetIndex = data.findIndex(item => item.page === page);

    if(targetIndex > -1) {
        let modifiy: PaginationAndPagerInterface = data[targetIndex];
        modifiy.itemsPerPage = itemsPerPage;
        modifiy.currentPage = 1;
        data[targetIndex] = modifiy;
    }

    return data;
}

export const modifyCurrentPage = (state: PaginationDataInterface, currentPage: number, totalPages: number, page: string): PaginationAndPagerInterface[] => {
    let data: PaginationAndPagerInterface[] = structuredClone(state.data);

    let targetIndex = data.findIndex(item => item.page === page);

    if(targetIndex > -1) {
        let modifiy: PaginationAndPagerInterface = data[targetIndex];
        modifiy.currentPage = currentPage;
        modifiy.totalPages = totalPages;
        data[targetIndex] = modifiy;
    }

    return data;
}

export const modifyTotalPages = (state: PaginationDataInterface, totalPages: number, itemsPerPage: number, page: string): PaginationAndPagerInterface[] => {
    let data: PaginationAndPagerInterface[] = structuredClone(state.data);

    let targetIndex = data.findIndex(item => item.page === page);

    if(targetIndex > -1) {
        let modifiy: PaginationAndPagerInterface = data[targetIndex];
        modifiy.totalPages = totalPages;
        modifiy.itemsPerPage = itemsPerPage;
        data[targetIndex] = modifiy;
    }

    return data;
}

export const getTargetDataSource = (state: PaginationDataInterface, page: string) => {
    let data: PaginationAndPagerInterface[] = structuredClone(state.data);

    let targetIndex: number = data.findIndex(item => item.page === page);

    if(targetIndex > -1)
    {
        return data[targetIndex];
    }

    return undefined;
}