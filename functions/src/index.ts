import * as adm from 'firebase-admin';
import * as functions from 'firebase-functions';
import express from './core/express';

adm.initializeApp(functions.config().admin.credentials);

export default { express };
