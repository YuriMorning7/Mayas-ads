import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

// App icon badge setup (only visible in non-production builds)
const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    { text: Env.APP_ENV, type: 'banner', color: 'white' },
    { text: Env.VERSION.toString(), type: 'ribbon', color: 'white' },
  ],
};

// Main Expo configuration
export default ({ config }: ConfigContext): ExpoConfig => {
  const baseConfig: ExpoConfig = {
    ...config,
    name: Env.NAME || 'Mayas Ads',
    description: `${Env.NAME || 'Mayas Ads'} Mobile App by Devz0`,
    owner: Env.EXPO_ACCOUNT_OWNER || 'devz0',
    slug: 'mayas-ads',
    version: Env.VERSION.toString(),
    assetBundlePatterns: ['**/*'],
    updates: { fallbackToCacheTimeout: 0 },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    extra: {
      ...ClientEnv,
      eas: { projectId: Env.EAS_PROJECT_ID || 'YOUR-EAS-PROJECT-ID' },
    },
  };

  // Only include managed workflow fields if no native folders exist
  if (!config.android || !config.ios) {
    baseConfig.scheme = Env.SCHEME || 'mayasads';
    baseConfig.orientation = 'portrait';
    baseConfig.icon = './assets/icon.png';
    baseConfig.userInterfaceStyle = 'automatic';
    baseConfig.ios = {
      supportsTablet: true,
      bundleIdentifier: Env.BUNDLE_ID || 'com.devz0.mayasads',
      infoPlist: { ITSAppUsesNonExemptEncryption: false },
    };
    baseConfig.android = {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#2E3C4B',
      },
      package: Env.PACKAGE || 'com.devz0.mayasads',
    };
    baseConfig.plugins = [
      [
        'expo-splash-screen',
        {
          backgroundColor: '#2E3C4B',
          image: './assets/splash-icon.png',
          imageWidth: 150,
        },
      ],
      ['expo-font', { fonts: ['./assets/fonts/Inter.ttf'] }],
      'expo-localization',
      'expo-router',
      ['app-icon-badge', appIconBadgeConfig],
      ['react-native-edge-to-edge'],
    ];
  }

  return baseConfig;
};
