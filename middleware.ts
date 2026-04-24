import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except api, Next internals, static files, and metadata files
    '/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|favicon|sitemap|robots|.*\\..*).*)',
  ],
};
