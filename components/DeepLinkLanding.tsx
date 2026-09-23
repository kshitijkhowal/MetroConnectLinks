'use client';

import { useEffect, useMemo, useState } from 'react';
import { MetroMark } from '@/components/MetroMark';
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
    <main className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-5 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#1976d2]/25 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#00a651]/15 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-[140%] -translate-x-1/2 rotate-6 bg-gradient-to-r from-transparent via-[#1976d2] to-transparent" />
        <div className="absolute left-1/2 top-24 h-px w-[140%] -translate-x-1/2 -rotate-3 bg-gradient-to-r from-transparent via-[#e30613]/70 to-transparent" />
      </div>

      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#121a2b]/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="flex items-center gap-3">
          <MetroMark className="h-12 w-12 shrink-0" />
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">{APP_NAME}</p>
            <p className="text-sm text-slate-400">{APP_TAGLINE}</p>
          </div>
        </div>

        <div className="mt-8">
          {isAndroid ? (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Open {title}
              </h1>
              <p className="mt-3 text-[15px] leading-6 text-slate-300">
                If MetroConnect is installed, tap the button below. Chrome will not open a local
                debug build by itself, so this needs a tap.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Coming soon on this device
              </h1>
              <p className="mt-3 text-[15px] leading-6 text-slate-300">
                MetroConnect is currently available on Android. Meanwhile you can check it on
                Google Play{title === APP_NAME ? '.' : ` — including ${title.toLowerCase()}.`}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {isAndroid ? (
            <a
              href={customSchemeUrl}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#1976d2] px-5 text-sm font-semibold text-white transition hover:bg-[#1565c0]"
            >
              Open in MetroConnect
            </a>
          ) : null}

          <a
            href={PLAY_STORE_URL}
            className={`inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
              isAndroid
                ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                : 'bg-[#1976d2] text-white hover:bg-[#1565c0]'
            }`}
          >
            Get it on Google Play
          </a>
        </div>

        {isAndroid ? null : (
          <p className="mt-5 text-center text-xs text-slate-500">
            iPhone, iPad, and other devices are on the way.
          </p>
        )}
      </section>
    </main>
  );
}
