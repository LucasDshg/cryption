import { Injectable, signal } from '@angular/core';
import { IClient } from '../interfaces/client.interface';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private _signal = signal<IClient | undefined>(this.localStorage);

  store = this._signal.asReadonly();
  isDemo = signal<boolean>(false);

  get localStorage(): IClient | undefined {
    const local = localStorage.getItem('dahorta');

    if (local) return JSON.parse(local);
    return undefined;
  }

  set localStorage(value: IClient) {
    localStorage.setItem('store', JSON.stringify({ ...value }));
  }

  set update(value: Partial<IClient>) {
    this._signal.set({
      ...this.store()!,
      ...value,
    });
    this.localStorage = this.store()!;
  }

  init(value: IClient): void {
    this.localStorage = value;
    this._signal.set(value);
  }

  clear(): void {
    this._signal.set(undefined);
    localStorage.removeItem('dahorta');
  }
}
