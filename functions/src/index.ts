import * as adm from 'firebase-admin';
import * as functions from 'firebase-functions';
import express from './core/express';
import robo from './modules/robo/robo';

adm.initializeApp({
  credential: adm.credential.cert(functions.config().admin.credentials),
});

export default { express, robo };
