import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/service/request.service';
import { UserStore } from 'src/app/core/store/user.store';
import { ISetupDataPartial } from '../robo/interface/steup.interface';

@Injectable()
export class UserBotsService extends RequestService<ISetupDataPartial> {
  private _store = inject(UserStore);

  constructor() {
    super();
    this.collectionName = 'user';
    this.subCollection = {
      id: this._store.store()!.id!,
      collectionName: 'bost',
    };
  }

  fetch(): Observable<ISetupDataPartial[]> {
    return this.get();
  }

  insert(data: ISetupDataPartial): Observable<void | string> {
    return this.addData(
      {
        active: data.active,
        brokerMaxBalanceToUse: data.brokerMaxBalanceToUse,
        brokerUserBalance: data.brokerUserBalance,
        description: data.description,
        id: data.id,
        name: data.name,
        profit: data.profit,
        reactivate: true,
      },
      { id: data.id, toastText: 'Dados incluídos!' },
    );
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

  toggleReactivate(id: string, status: boolean): Observable<void | string> {
    return this.updateData(
      id,
      { reactivate: status },
      { toastText: `Reativer robô ${status ? 'ativado' : 'desativado'}` },
    );
  }
}
