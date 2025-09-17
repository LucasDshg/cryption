import * as crypto from 'crypto';
import { Request, Response } from 'express';
import * as adm from 'firebase-admin';
import { IUser } from '../interfaces/user.interface';

const algorithm = 'aes-256-cbc';

export const login = async (
  req: Request,
  res: Response<any>,
): Promise<void> => {
  try {
    const { key, code } = req.body;
    const result = await adm.firestore().collection('user').doc(code).get();

    const data = decrypt((result.data() as any).privateKey, key) as IUser;
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createAccount = async (
  req: Request,
  res: Response<any>,
): Promise<void> => {
  const data: IUser = req.body;
  const key = generateRandomKey();
  const result = encrypt(data, key);

  const code: string | number = Math.floor(
    100000 + Math.random() * 999999,
  ).toString();

  await adm
    .firestore()
    .collection('user')
    .doc(code)
    .set({ privateKey: result.value });

  res.status(200).send({ key: result.secretKey, code });
};

function generateRandomKey(): string {
  const aesKey = crypto.randomBytes(32);
  return aesKey.toString('hex');
}

function encrypt(data: Object, secretKey: string) {
  const key = crypto.createHash('sha256').update(secretKey).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return { value: iv.toString('hex') + ':' + encrypted, secretKey };
}

function decrypt(data: string, secretKey: string): Object {
  const key = crypto.createHash('sha256').update(secretKey).digest();
  const parts = data.split(':');
  if (parts.length !== 2) {
    throw new Error(
      'Invalid encrypted text format. Expected IV:EncryptedData.',
    );
  }
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedData = parts[1];

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return JSON.parse(decrypted);
}
