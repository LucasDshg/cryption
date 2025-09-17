import * as adm from 'firebase-admin';

type TFcmToken = {
  id: string;
  token: string;
  phone: string;
  idUser: string;
  createAt: Date;
};

async function getTokenUserById(id: string): Promise<TFcmToken | undefined> {
  const user = await adm
    .firestore()
    .collection('fcm')
    .where('idUser', '==', id)
    .limit(1)
    .get();

  if (user.empty) return undefined;

  return user.docs[0].data() as TFcmToken;
}

export default {
  getTokenUserById,
};
