import { NextResponse } from 'next/server';
import i18nConfig from './i18nConfig';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    const locales = i18nConfig.locales;
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = segments.length > 0 && locales.includes(segments[0]);
    
    if (hasLocale) {
        return NextResponse.next();
    }
    url.pathname = `/${i18nConfig.defaultLocale}${pathname}`;
    request.nextUrl.pathname = url.pathname; 

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
};
