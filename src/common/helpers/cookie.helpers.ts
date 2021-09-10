import Cookies from 'js-cookie';
import type {CookieAttributes} from 'js-cookie'
import { IncomingMessage } from 'http';

export const setCookie = (
  key: string,
  value: string | object,
  options?: CookieAttributes
) => {
  if (process.browser) {
    Cookies.set(key, value, {
      path: '/',
      ...options,
    });
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req?: IncomingMessage): string | undefined => {
  return req && !process.browser
    ? getCookieFromServer(key, req)
    : getCookieFromBrowser(key);
};

const getCookieFromBrowser = (key: string) => {
  return Cookies.get(key);
};

const getCookieFromServer = (key: string, req: IncomingMessage) => {
  if (!req?.headers?.cookie) {
    return undefined;
  }
  const rawCookie = req?.headers?.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return decodeURI(rawCookie.split('=')[1]);
};
