export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.NG_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.NG_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.NG_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.NG_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.NG_APP_FIREBASE_MEASUREMENT_ID,
  },
  dataBase: '(default)',
  algolia: {
    appId: import.meta.env.NG_APP_ALGOLIA_ID,
    apiKey: import.meta.env.NG_APP_ALGOLIA_KEY,
  },
  mapsKey: import.meta.env.NG_APP_MAPS_KEY,
};
