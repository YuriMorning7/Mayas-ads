import '@testing-library/react-native/extend-expect';

// react-hook-form setup for testing
// @ts-ignore
global.window = {};
// @ts-ignore
global.window = global;

// Mock expo-localization for tests
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageTag: 'en-US', isRTL: false }],
  locale: 'en-US',
}));
