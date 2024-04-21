/// <reference types="vite/client" />

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

declare const process : {
  env: {
    STORIES_SERVICES_API_BASE_URL: string;
    STORIES_SERVICES_DISABLED: string;
  }
}
