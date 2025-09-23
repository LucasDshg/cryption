import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cryption.app',
  appName: 'cryption',
  webDir: 'www',
  server: {
    androidScheme: 'http',
  },
  backgroundColor: '#000000ff',
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: false,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      splashImmersive: true,
      backgroundColor: '#000000ff',
    },
  },
};

export default config;
