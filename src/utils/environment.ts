const LOCAL_HOST = 'http://localhost:3000';

export function getBaseUrl() {
  return process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_URL
    : LOCAL_HOST;
}