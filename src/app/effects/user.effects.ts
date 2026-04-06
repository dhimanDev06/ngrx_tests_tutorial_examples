import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";

@Injectable()
export class UsersEffects {

    private actions$ = inject(Actions);
    private userService = inject(UserService);

    getUsers$ = createEffect(() => 
        //this.actions$ = a stream of Actions.
        this.actions$.pipe(
            //ofType() listens to a single Action. ofType() filters the Action.
            ofType(UserActions.getUsers),
            mergeMap(() => {
                return this.userService
                .getAllUsers()
                .pipe(
                    //Note the last users: that is an object that will be provided.
                    //The last users is placed between curly brackets -> see: props<{ users: UserInterface[] }>() in user.actions.ts
                    map( 
                        (users: UserInterface[]) => UserActions.getUsersSuccess({ users }) 
                    ),
                    catchError(error => of(UserActions.getUsersFailure({ error: error.Message })))
                );
            })
        )
    );

}