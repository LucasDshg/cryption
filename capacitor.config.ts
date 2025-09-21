import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cryption',
  webDir: 'www',
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
      backgroundColor: '#e77333',
    },
  },
};

export default config;
