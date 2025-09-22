import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/service/request.service';
import { IUser } from './user.interface';

@Injectable()
export class UserService extends RequestService<IUser> {
  constructor() {
    super();
    this.collectionName = 'user';
  }
  fetchById(id: string): Observable<IUser | undefined> {
    return this.getById(id);
  }

  updateToken(id: string, token: string): Observable<void> {
    return this.updateData(id, { token });
  }
}
