import { createAction, props } from "@ngrx/store";
import { AnimalData } from "../interfaces/animal-data.interface";
import { AnimalSearch } from "../interfaces/animal-search.interface";

export const getSearchFor = createAction('[Animals] Get Search For');

export const setSearchFor = createAction('[Animals] Set Search For', props<{ payload: AnimalSearch }>());

export const getAnimals = createAction('[Animals] Get Animals');

export const setAnimals = createAction('[EvenOrOdd Component] Set Data', props<{ payload: AnimalData }>());

