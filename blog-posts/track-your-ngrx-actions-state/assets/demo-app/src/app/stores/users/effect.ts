import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, mapTo } from 'rxjs/operators';
import { timer } from 'rxjs';

import * as UserActions from './action';

@Injectable()
export class UserEffect {
  counter = 5;
  users = [
    { username: 'Jhon', id: 1 },
    { username: 'Bob', id: 2 },
    { username: 'Fred', id: 3 },
    { username: 'Jack', id: 4 },
  ];

  constructor(private actions$: Actions) {}

  userAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAddRequest),
      switchMap(({ username }) =>
        timer(2000).pipe(
          mapTo(
            UserActions.userAddSuccess({
              user: {
                username,
                id: this.counter++,
              },
            })
          )
        )
      )
    )
  );

  userDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userDeleteRequest),
      switchMap(({ id }) =>
        timer(2000).pipe(
          mapTo(
            UserActions.userDeleteSuccess({
              id,
            })
          )
        )
      )
    )
  );

  userLoadRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userListLoadRequest),
      switchMap(() =>
        timer(2000).pipe(
          mapTo(
            UserActions.userListLoadSuccess({
              users: this.users,
            })
          )
        )
      )
    )
  );
}
