import { get } from 'axios';
import * as adm from 'firebase-admin';
import * as functions from 'firebase-functions';
import fcm from '../../core/fcm';
import utils from '../../core/utils';
import user from '../user/user';
import { IWallets } from './interface/wallets.interface';

const api: string = 'https://api.mkstrategie.com';
const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=UTF-8',
  'tenant-id': '01JEGTHF90YNXJ82RFBRY0VD0D',
  Host: 'api.mkstrategie.com',
  Origin: 'https://app.mkstrategie.com',
};
async function getSaldo(token: string): Promise<IWallets[]> {
  const request = await get<IWallets[]>(`${api}/users/wallets`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
}

const checkWallet = utils.firestore
  .document('user/{id}')
  .onUpdate(async (snapshot: any) => {
    // .region('southamerica-east1')
    // .pubsub.schedule('every 4 hours from 07:00 to 23:00')
    // .timeZone('America/Sao_Paulo')
    // .onRun(async () => {
    try {
      functions.logger.debug('start verification wallet');
      const users = await user.getAll();
      console.log(users);

      users.forEach(async (user) => {
        const saldo = await getSaldo(user.token);
        if (user.alertSaldo && saldo[0].balance < user.alertSaldo) {
          const userFcm = await fcm.getTokenUserById(user.id);
          if (userFcm) {
            await adm.messaging().sendEach([
              {
                ...utils.payload(
                  'Alerta de saldo baixo',
                  `Seu saldo no robô é de ${utils.formatterNumber(saldo[0].balance, { currency: 'BRL', style: 'currency' })}`,
                ),
                token: userFcm.token,
              },
            ]);
          }
        }
      });
      functions.logger.debug('end verification wallet');
    } catch (error) {
      functions.logger.error(error);
    }
  });

export default { checkWallet };
