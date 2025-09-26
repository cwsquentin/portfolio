import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // ignore les images
  matcher: [
    '/((?!_next|_static|images|favicon.ico|robots.txt|sitemap.xml|icons|site.webmanifest).*)'
  ]
};
