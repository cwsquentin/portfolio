import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!_next|_static|downloads|images|favicon.ico|robots.txt|sitemap.xml|icons|site.webmanifest).*)'
  ]
};
