// src/global.d.ts

export {}; // ← isso evita conflitos se você tiver outros arquivos com declarações globais

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
