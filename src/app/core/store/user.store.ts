import { Injectable, signal } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private _signal = signal<IUser | undefined>(this.localStorage);

  readonly store = this._signal.asReadonly();

  get localStorage(): IUser | undefined {
    const local = localStorage.getItem('cryption');

    if (local) return JSON.parse(local);
    return undefined;
  }

  set localStorage(value: IUser) {
    localStorage.setItem('cryption', JSON.stringify({ ...value }));
  }

  update(value: Partial<IUser>): void {
    this._signal.set({
      ...this.store()!,
      ...value,
    });
    this.localStorage = this.store()!;
  }

  init(value: IUser): void {
    this.localStorage = value;
    this._signal.set(value);
  }

  clear(): void {
    this._signal.set(undefined);
    localStorage.removeItem('cryption');
  }
}
