import { Injectable, signal } from '@angular/core';
import { IAuth } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private _signal = signal<IAuth | undefined>(this.localStorage);

  readonly store = this._signal.asReadonly();

  get localStorage(): IAuth | undefined {
    const local = localStorage.getItem('cryption');

    if (local) return JSON.parse(local);
    return undefined;
  }

  set localStorage(value: IAuth) {
    localStorage.setItem('cryption', JSON.stringify({ ...value }));
  }

  update(value: Partial<IAuth>): void {
    this._signal.set({
      ...this.store()!,
      ...value,
    });
    this.localStorage = this.store()!;
  }

  init(value: IAuth): void {
    this.localStorage = value;
    this._signal.set(value);
  }

  clear(): void {
    this._signal.set(undefined);
    localStorage.removeItem('cryption');
  }
}
