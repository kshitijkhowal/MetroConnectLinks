export type DevicePlatform = 'android' | 'ios' | 'other';

export function getPlatformFromUserAgent(userAgent: string): DevicePlatform {
  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios';
  }

  return 'other';
}
