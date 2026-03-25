import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';

export const proxy = createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|media|_next|.*\\..*).*)'],
};
