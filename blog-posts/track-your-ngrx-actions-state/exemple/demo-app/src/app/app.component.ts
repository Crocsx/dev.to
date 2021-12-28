import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable, takeWhile, tap } from 'rxjs';
import { ActionState } from './models/action';
import { getIsLoading, getLoadingState } from './stores/loaders/selector';
import {
  userAddRequest,
  userAddSetKey,
  userDeleteRequest,
  userDeleteSetKey,
  userListLoadRequest,
  userListLoadSetKey,
} from './stores/users/action';
import { User } from './stores/users/models';
import { getUsers } from './stores/users/selector';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  usersLoading$: Observable<boolean>;
  userDeleting$: Observable<boolean>;
  userCreating$: Observable<boolean>;

  users$: Observable<User[]>;
  removeId = null;

  form = new FormBuilder().group({
    username: [''],
  });

  constructor(private store: Store<any>) {
    this.users$ = this.store.pipe(select(getUsers));
    this.usersLoading$ = this.store.pipe(
      select(getIsLoading([userListLoadSetKey]))
    );
    this.userDeleting$ = this.store.pipe(
      select(getIsLoading([userDeleteSetKey]))
    );
    this.userCreating$ = this.store.pipe(select(getIsLoading([userAddSetKey])));

    this.store.dispatch(userListLoadRequest());
  }

  onSubmit() {
    this.form.controls.username.disable();
    this.store.dispatch(userAddRequest({ ...this.form.getRawValue() }));

    this.store
      .pipe(select(getLoadingState([userAddSetKey])))
      .pipe(
        takeWhile(
          (state) =>
            ![ActionState.SUCCEEDED, ActionState.FAILED].includes(state),
          true
        ),
        filter((state) => state === ActionState.SUCCEEDED),
        tap(() => this.form.controls.username.enable())
      )
      .subscribe();
  }

  deleteUser(id: number) {
    this.store.dispatch(userDeleteRequest({ id }));
    this.removeId = id;

    this.store
      .pipe(select(getLoadingState([userDeleteSetKey])))
      .pipe(
        takeWhile(
          (state) =>
            ![ActionState.SUCCEEDED, ActionState.FAILED].includes(state),
          true
        ),
        filter((state) => state === ActionState.SUCCEEDED),
        tap(() => (this.removeId = null))
      )
      .subscribe();
  }
}
