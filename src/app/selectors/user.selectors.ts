import { createSelector } from "@ngrx/store";
import { UserStateInterface } from "../interfaces/user-state.interface";

export const selectFeature = (state: UserStateInterface) => state;

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
);

export const userSelector = createSelector(
    selectFeature,
    (state) => state.data
);

export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
);