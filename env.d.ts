// FIX: The reference to 'vite/client' was causing an error and has been removed as it's no longer necessary.
// The application now uses process.env.API_KEY, and the declaration below provides the necessary types.
declare var process: {
    env: {
        API_KEY?: string;
    };
};
