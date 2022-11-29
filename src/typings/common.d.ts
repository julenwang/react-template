declare module '*.png';
declare module '*.jpg';
declare module '*.less';
declare module '*.scss';
declare module '*.svg';
declare module '*.svg?url';

// nodejs environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | undefined;
    MOCK_MODE: 'true' | 'false' | undefined;
    ANALYZE: 'true' | 'false' | undefined;
  }
  // dotenv config
  interface ProcessEnv {}
}
