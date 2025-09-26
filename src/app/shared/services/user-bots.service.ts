import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/service/request.service';
import { UserStore } from 'src/app/core/store/user.store';
import { ISetupData } from './robo/interface/steup.interface';

@Injectable()
export class UserBotsService extends RequestService<ISetupData> {
  private _store = inject(UserStore);

  constructor() {
    super();
    this.collectionName = 'user';
    this.subCollection = {
      id: this._store.store()!.id!,
      collectionName: 'bost',
    };
  }

  fetch(): Observable<ISetupData[]> {
    return this.get();
  }

  insert(data: ISetupData): Observable<void | string> {
    return this.addData(data, { id: data.id, toastText: 'Dados incluídos!' });
  }

  remove(id: string): Observable<void | string> {
    return this.removeData(id, { toastText: `Robô excluído` });
  }

  toggleStatus(id: string, status: boolean): Observable<void | string> {
    return this.updateData(
      id,
      { active: status },
      { toastText: `Robô ${status ? 'ativado' : 'desativado'}` },
    );
  }
}
