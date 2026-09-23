'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  APP_NAME,
  APP_TAGLINE,
  PLAY_STORE_URL,
  getCustomSchemeUrl,
  getLinkTitle,
} from '@/lib/config';
import { getPlatformFromUserAgent, type DevicePlatform } from '@/lib/platform';

type DeepLinkLandingProps = {
  pathSegments: string[];
  query: Record<string, string>;
};

const primaryButtonClass =
  'inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-base font-semibold text-on-primary transition hover:bg-primary-dark';

const outlineButtonClass =
  'inline-flex h-12 items-center justify-center rounded-2xl border border-primary bg-transparent px-5 text-base font-semibold text-primary transition hover:bg-pressed';

export function DeepLinkLanding({ pathSegments, query }: DeepLinkLandingProps) {
  const [platform, setPlatform] = useState<DevicePlatform>('other');
  const title = getLinkTitle(pathSegments);
  const customSchemeUrl = useMemo(
    () => getCustomSchemeUrl(pathSegments, query),
    [pathSegments, query],
  );
  const isAndroid = platform === 'android';

  useEffect(() => {
    const detected = getPlatformFromUserAgent(window.navigator.userAgent);
    setPlatform(detected);
  }, []);

  return (
    <main className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-6 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-16 h-1 w-[120%] -translate-x-1/2 -rotate-6 bg-metro-red/25" />
        <div className="absolute left-1/2 top-28 h-1 w-[120%] -translate-x-1/2 rotate-3 bg-metro-blue/20" />
        <div className="absolute left-1/2 bottom-24 h-1 w-[120%] -translate-x-1/2 rotate-2 bg-metro-green/20" />
      </div>

      <section className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow)]">

        <div className="mt-5 flex items-center gap-3">
          <picture className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line">
            <source srcSet="/icons/icon-dark-192.png" media="(prefers-color-scheme: dark)" />
            <img
              src="/icons/icon-light-192.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </picture>
          <div className="min-w-0">
            <p className="text-lg font-semibold tracking-tight text-foreground">{APP_NAME}</p>
            <p className="text-sm text-muted">{APP_TAGLINE}</p>
          </div>
        </div>

        <div className="mt-8">
          {isAndroid ? (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Open {title}
              </h1>
              <p className="mt-3 text-[15px] leading-6 text-muted">
                If MetroConnect is installed, tap the button below. Chrome will not open a local
                debug build by itself, so this needs a tap.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Coming soon on this device
              </h1>
              <p className="mt-3 text-[15px] leading-6 text-muted">
                MetroConnect is currently available on Android. Meanwhile you can check it on
                Google Play{title === APP_NAME ? '.' : ` — including ${title.toLowerCase()}.`}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {isAndroid ? (
            <a href={customSchemeUrl} className={primaryButtonClass}>
              Open in MetroConnect
            </a>
          ) : null}

          <a
            href={PLAY_STORE_URL}
            className={isAndroid ? outlineButtonClass : primaryButtonClass}
          >
            Get it on Google Play
          </a>
        </div>

        {isAndroid ? null : (
          <p className="mt-5 text-center text-xs text-hint">
            iPhone, iPad, and other devices are on the way.
          </p>
        )}
      </section>
    </main>
  );
}
