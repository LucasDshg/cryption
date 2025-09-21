import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
// import express, { Request, Response } from 'express';
// import * as adm from 'firebase-admin';
// import * as functions from 'firebase-functions';
import { createAccount, login } from '../auth/auth.module';
import utils from './utils';

// const validateFirebaseIdToken = async (
//   req: Request,
//   res: Response,
//   next: any,
// ): Promise<void> => {
//   functions.logger.log('Check if request is authorized with Firebase ID token');

//   if (req.url.includes('/valid-phone')) return next();
//   if (
//     (!req.headers.authorization ||
//       !req.headers.authorization.startsWith('Bearer ')) &&
//     !(req.cookies && req.cookies.__session)
//   ) {
//     functions.logger.error(
//       'No Firebase ID token was passed as a Bearer token in the Authorization header.',
//       'Make sure you authorize your request by providing the following HTTP header:',
//       'Authorization: Bearer <Firebase ID Token>',
//       'or by passing a "__session" cookie.',
//     );
//     res.status(403).send('Unauthorized');
//     return;
//   }

//   let idToken;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer ')
//   ) {
//     functions.logger.log('Found "Authorization" header');
//     // Read the ID Token from the Authorization header.
//     idToken = req.headers.authorization.split('Bearer ')[1];
//   } else if (req.cookies) {
//     functions.logger.log('Found "__session" cookie');
//     // Read the ID Token from cookie.
//     idToken = req.cookies.__session;
//   } else {
//     // No cookie
//     res.status(403).send('Unauthorized');
//     return;
//   }

//   try {
//     const decodedIdToken = await adm.auth().verifyIdToken(idToken);
//     functions.logger.log('ID Token correctly decoded', decodedIdToken);
//     (req as any).user = decodedIdToken;
//     return next();
//   } catch (error) {
//     functions.logger.error('Error while verifying Firebase ID token:', error);
//     res.status(403).send('Unauthorized');
//     return;
//   }
// };

export const optionsCors = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'x-timestamp',
  ],
  credentials: false,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true,
};

const app: express.Application = express();
app.use(cors());
app.options('*', cors(optionsCors));
app.use(cookieParser());
app.use(express.json());
// app.use(validateFirebaseIdToken);

app.post('/login', (req, res) => {
  return login(req, res);
});
app.post('/account', (req, res) => {
  return createAccount(req, res);
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
export default { app: utils.https.onRequest(app) };
