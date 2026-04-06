import { UserInterface } from "./user.interface";

export interface UserStateInterface {
    isLoading: boolean;
    data: UserInterface[];
    error: string | null;
}