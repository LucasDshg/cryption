import * as adm from 'firebase-admin';

type TFcmToken = {
  id: string;
  token: string;
  phone: string;
  idUser: string;
  createAt: Date;
};

async function getTokenUserById(id: string): Promise<TFcmToken | undefined> {
  const user = await adm.firestore().collection('fcm').doc(id).get();

  if (!user.exists) return undefined;

  return user.data() as TFcmToken;
}

export default {
  getTokenUserById,
};
