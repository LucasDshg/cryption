import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  collectionSnapshots,
  deleteDoc,
  doc,
  docSnapshots,
  DocumentData,
  Firestore,
  getAggregateFromServer,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { catchError, from, map, Observable, of, shareReplay, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService<T> {
  protected _firestore = inject(Firestore);
  protected _toast = inject(ToastService);
  protected get _collection(): CollectionReference<DocumentData, DocumentData> {
    if (this.subCollection) {
      return collection(
        this._firestore,
        this.collectionName,
        this.subCollection.id,
        this.subCollection.collectionName,
      );
    }

    return collection(this._firestore, this.collectionName);
  }

  protected collectionName!: string;
  protected subCollection?: { id: string; collectionName: string };

  protected get<S = T>(
    options: {
      queryConstraints?: QueryConstraint[];
      cache?: number;
    } = {},
  ): Observable<S[]> {
    let docQuery: any;

    if (options.queryConstraints) {
      docQuery = query(this._collection, ...options.queryConstraints);
    } else {
      docQuery = query(this._collection);
    }

    return from(getDocs(docQuery)).pipe(
      shareReplay(options.cache ?? 0, 1000),
      map((res) => {
        return res.docs.map((it) => {
          const data = it.data() as S;
          return {
            ...data,
            id: it.id,
          } as S;
        });
      }),
    );
  }

  protected valueChanges<S = T>(
    options: {
      queryConstraints?: QueryConstraint[];
    } = {},
  ): Observable<S[]> {
    let docQuery: any;

    if (options.queryConstraints) {
      docQuery = query(this._collection, ...options.queryConstraints);
    } else {
      docQuery = query(this._collection);
    }

    return collectionSnapshots(docQuery).pipe(
      map((res) => {
        return res.map((it) => {
          const data = it.data() as S;
          return {
            ...data,
            id: it.id,
          } as S;
        });
      }),
    );
  }

  protected docChanges<S = T>(id: string): Observable<S> {
    const docQuery = doc(this._firestore, this.collectionName, id);

    return docSnapshots(docQuery).pipe(
      map((res) => {
        const data = res.data() as S;
        return {
          ...data,
          id: res.id,
        } as S;
      }),
    );
  }

  protected getAggregate<T>(options: {
    aggregateSpec: any;
    queryConstraints?: QueryConstraint[];
  }): Observable<T> {
    try {
      let docQuery: any;

      if (options.queryConstraints) {
        docQuery = query(this._collection, ...options.queryConstraints);
      } else {
        docQuery = query(this._collection);
      }

      return from(
        getAggregateFromServer(docQuery, {
          ...options.aggregateSpec,
        }),
      ).pipe(map((res) => res.data() as T));
    } catch (error) {
      window.alert(error);
      return of();
    }
  }

  protected getById<S = T>(
    id: string,
    options: { toastText?: string; cache?: number } = {},
  ): Observable<S | undefined> {
    let docQuery = doc(this._firestore, this.collectionName, id);

    if (this.subCollection) {
      docQuery = doc(
        this._firestore,
        this.collectionName,
        this.subCollection.id,
        this.subCollection.collectionName,
        id,
      );
    }

    return from(getDoc(docQuery)).pipe(
      map((res) => {
        if (!res.exists()) {
          if (options.toastText) this._toast.open(options.toastText, 'dark');
          return undefined;
        }
        const data = res.data() as S;

        return {
          ...data,
          id: res.id,
        } as S;
      }),
    );
  }

  protected addData<S = T>(
    data: S,
    options: { toastText?: string; id?: string } = {},
  ): Observable<void | string> {
    if (options.id) {
      let docRef = doc(this._firestore, this.collectionName, options.id);
      if (this.subCollection) {
        docRef = doc(
          this._firestore,
          this.collectionName,
          this.subCollection.id,
          this.subCollection.collectionName,
          options.id,
        );
      }
      return from(setDoc(docRef, { ...data } as any)).pipe(
        tap(() => {
          if (options.toastText) this._toast.open(options.toastText, 'success');
        }),
        catchError((err) => this._toast.open(err.message, 'danger')),
      );
    }

    return from(addDoc(this._collection, { ...data } as any)).pipe(
      tap(() => {
        if (options.toastText) this._toast.open(options.toastText, 'success');
      }),
      map((res) => res.id),
      catchError((err) => this._toast.open(err.message, 'danger')),
    );
  }

  protected updateData<S = T>(
    id: string,
    data: S,
    options: { toastText?: string } = {},
  ): Observable<void> {
    let docQuery = doc(this._firestore, this.collectionName, id);

    if (this.subCollection) {
      docQuery = doc(
        this._firestore,
        this.collectionName,
        this.subCollection.id,
        this.subCollection.collectionName,
        id,
      );
    }

    return from(updateDoc(docQuery, { ...data } as any)).pipe(
      tap(() => {
        if (options.toastText) this._toast.open(options.toastText, 'success');
      }),
      catchError((err) => this._toast.open(err.message, 'danger')),
    );
  }

  protected overrideData<S = T>(
    id: string,
    data: S,
    options: { toastText?: string } = {},
  ): Observable<void> {
    return from(
      setDoc(doc(this._firestore, this.collectionName, id), {
        ...data,
      } as any),
    ).pipe(
      tap(() => {
        if (options.toastText) this._toast.open(options.toastText, 'success');
      }),
      catchError((err) => this._toast.open(err.message, 'danger')),
    );
  }

  protected removeData(
    id: string,
    options: { toastText?: string } = {},
  ): Observable<void> {
    let docQuery = doc(this._firestore, this.collectionName, id);
    if (this.subCollection) {
      docQuery = doc(
        this._firestore,
        this.collectionName,
        this.subCollection.id,
        this.subCollection.collectionName,
        id,
      );
    }

    return from(deleteDoc(docQuery)).pipe(
      tap(() => {
        if (options.toastText) this._toast.open(options.toastText, 'success');
      }),
      catchError((err) => this._toast.open(err.message, 'danger')),
    );
  }
}
