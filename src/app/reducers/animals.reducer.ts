import { createReducer, on } from "@ngrx/store";
import { getAnimals, setAnimals, getSearchFor, setSearchFor } from "../actions/animals.action";
import { AnimalData } from "../interfaces/animal-data.interface";
import { AnimalSearch } from "../interfaces/animal-search.interface";

export const initialStateAnimalData: AnimalData = {
    data: []
}

export const initialStateAnimalSearch: AnimalSearch = {
    animalName: ''
}

//Below: the on() method determines which Action will be handled.
export const animalDataReducer = createReducer(
    initialStateAnimalData,
    on(getAnimals, (state) => ({ data: [...state.data]})),
    on(setAnimals, (state, {payload}) => 
        ({...state, data: payload.data})
    )
);

//Below: the on() method determines which Action will be handled.
export const animalSearchReducer = createReducer(
    initialStateAnimalSearch,
    on(getSearchFor, (state) => ({ animalName: state.animalName})),
    on(setSearchFor, (state, {payload}) => 
        ({...state, animalName: payload.animalName})
    )
);