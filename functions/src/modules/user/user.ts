import * as adm from 'firebase-admin';
import { IUser } from './interfaces/user.interface';

async function getAll() {
  const collection = await adm.firestore().collection('user').get();
  return collection.docs.map((it) => it.data()) as IUser[];
}

export default { getAll };
