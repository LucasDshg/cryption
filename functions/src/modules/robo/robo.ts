import { get, post } from 'axios';
import * as adm from 'firebase-admin';
import * as functions from 'firebase-functions';
import fcm from '../../core/fcm';
import utils from '../../core/utils';
import userBots from '../user-bots/user-bots';
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

async function active(token: string, id: string): Promise<number> {
  const request = await post<any>(
    `${api}/users/setups/${id}/active`,
    {},
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return request.status;
}

const checkWallet = functions
  .region('southamerica-east1')
  .pubsub.schedule('every 2 hours from 07:00 to 23:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    try {
      functions.logger.debug('start verification wallet');
      const users = await user.getAll();
      users.forEach(async (user) => {
        const saldo = await getSaldo(user.bot);
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

const activeBots = functions.pubsub
  .schedule('every day  00:10')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    try {
      functions.logger.debug('start verification bots');
      const users = await user.getAll();

      users.forEach(async (user) => {
        const bots = await userBots.getDisabled(user.id);

        bots.forEach(async (bot) => {
          const result = await active(user.bot, bot.id);
          const userFcm = await fcm.getTokenUserById(user.id);

          if (userFcm) {
            if (result === 201) {
              await adm.messaging().sendEach([
                {
                  ...utils.payload(
                    'Robô ativado!',
                    `O robô ${bot.name} foi ativado novamente.`,
                  ),
                  token: userFcm.token,
                },
              ]);
            } else {
              await adm.messaging().sendEach([
                {
                  ...utils.payload(
                    'Erro ao ativar o robô!',
                    `Não foi possível ativar o robô ${bot.name}.`,
                  ),
                  token: userFcm.token,
                },
              ]);
            }
          }
        });
      });
      functions.logger.debug('end verification bots');
    } catch (error) {
      console.log(error);
      functions.logger.error(error);
    }
  });

export default { checkWallet, activeBots };
