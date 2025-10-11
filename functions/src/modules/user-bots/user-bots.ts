import * as adm from 'firebase-admin';
import { IUserBots } from './interfaces/user-bots.interface';

async function getAll(user: string) {
  const collection = await adm
    .firestore()
    .collection('user')
    .doc(user)
    .collection('bost')
    .get();
  return collection.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  })) as IUserBots[];
}

async function getDisabled(user: string) {
  const collection = await adm
    .firestore()
    .collection('user')
    .doc(user)
    .collection('bost')
    .where('active', '==', false)
    .where('reactivate', '==', true)
    .get();
  return collection.docs.map((it) => ({
    ...it.data(),
    id: it.id,
  })) as IUserBots[];
}

export default { getAll, getDisabled };
