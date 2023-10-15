// src/types/env.d.ts

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_ORIGIN: string;
      PROD_ORIGIN: string;
      // 他の環境変数も必要に応じて追加
    }
  }
}

export {};
