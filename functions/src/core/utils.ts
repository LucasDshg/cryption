import * as functions from 'firebase-functions';

const firestore = functions.region('southamerica-east1').firestore;
const https = functions.region('southamerica-east1').https;

function formatDate(date: any): string {
  return date.toDate().toLocaleDateString('pt-br', {
    timeZone: 'UTC',
  });
}

function stringToDate(date: string, time: string): Date {
  return new Date(date.split('/').reverse().join('-') + ` ${time}`);
}

function timeStamp(date: Date): Date {
  return stringToDate(
    new Date(date).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    }),
    '00:00:00',
  );
}

function payload(title: string, text: string): any {
  return {
    notification: {
      title,
      body: text
        ? text.length <= 100
          ? text
          : text.substring(0, 97) + '...'
        : '',
    },
  };
}

export default {
  firestore: firestore,
  https: https,
  formatDate,
  stringToDate,
  timeStamp,
  payload,
};
