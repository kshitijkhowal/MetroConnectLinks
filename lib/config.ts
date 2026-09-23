export const APP_NAME = 'MetroConnect';
export const APP_TAGLINE = 'Your Delhi Metro companion';
export const APP_SCHEME = 'metroconnect';
export const ANDROID_PACKAGE = 'com.kshitij_khowal.MetroConnect';
export const IOS_BUNDLE_ID = 'com.KshitijKhowal.MetroConnect';
export const WEB_HOST = 'kshitijkhowal.in';
export const WEB_APP_PREFIX = 'metroconnect';
export const WEB_APP_PATH = `/${WEB_APP_PREFIX}`;

export const PLAY_STORE_URL =
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

const SCREEN_TITLES: Record<string, string> = {
  fareScreen: 'Fare table',
  routeScreen: 'Route',
  map: 'Map',
  settings: 'Settings',
  stationDetailScreen: 'Station',
  lineDetailScreen: 'Line',
  commuteBudgetCalculator: 'Commute budget',
  allLinesScreen: 'All lines',
  stationSelector: 'Choose a station',
  appearance: 'Appearance',
  journeySettings: 'Journey settings',
  about: 'About',
  contributors: 'Contributors',
  privacyPolicy: 'Privacy policy',
  releaseNotes: 'Release notes',
  myProfile: 'Profile',
  login: 'Sign in',
};

export function flattenSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): Record<string, string> {
  const record: Record<string, string> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    const scalar = Array.isArray(value) ? value[0] : value;
    if (scalar) {
      record[key] = scalar;
    }
  }

  return record;
}

export function toAppPath(pathSegments: string[]): string {
  return pathSegments.filter(Boolean).join('/');
}

export function toQueryString(query: Record<string, string>): string {
  const search = new URLSearchParams(query).toString();
  return search ? `?${search}` : '';
}

export function getCustomSchemeUrl(pathSegments: string[], query: Record<string, string>): string {
  const path = toAppPath(pathSegments);
  const origin = path ? `${APP_SCHEME}://${path}` : `${APP_SCHEME}://`;
  return `${origin}${toQueryString(query)}`;
}

export function getAndroidIntentUrl(pathSegments: string[], query: Record<string, string>): string {
  const path = toAppPath(pathSegments) || 'index';
  const fallback = encodeURIComponent(PLAY_STORE_URL);
  return `intent://${path}${toQueryString(query)}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
}

export function getLinkTitle(pathSegments: string[]): string {
  if (pathSegments.length === 0) {
    return APP_NAME;
  }

  const [first] = pathSegments;
  if (SCREEN_TITLES[first]) {
    return SCREEN_TITLES[first];
  }

  return first
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, (letter) => letter.toUpperCase());
}
