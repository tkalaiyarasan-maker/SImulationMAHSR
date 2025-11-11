// FIX: The reference to 'vite/client' was causing an error and has been removed as it's no longer necessary.
// The application now uses process.env.API_KEY, and the declaration below provides the necessary types.

// FIX: To resolve the "Cannot redeclare block-scoped variable 'process'" error,
// we augment the existing global `NodeJS.ProcessEnv` interface. This avoids conflicts
// by merging our type definition with any existing definitions for `process.env`.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY?: string;
    }
  }
}

// Adding an empty export treats this file as a module.
export {};
