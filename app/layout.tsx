import type { Metadata, Viewport } from 'next';
import { APP_NAME, APP_TAGLINE, PLAY_STORE_URL, WEB_HOST } from '@/lib/config';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${WEB_HOST}`),
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: `${APP_NAME} — ${APP_TAGLINE}.`,
  applicationName: APP_NAME,
  icons: {
    icon: [
      {
        url: '/icons/favicon-light.png',
        type: 'image/png',
        sizes: '32x32',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icons/favicon-dark.png',
        type: 'image/png',
        sizes: '32x32',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icons/icon-light-192.png',
        type: 'image/png',
        sizes: '192x192',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icons/icon-dark-192.png',
        type: 'image/png',
        sizes: '192x192',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    url: `https://${WEB_HOST}`,
    siteName: APP_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: APP_NAME,
    description: APP_TAGLINE,
  },
  appLinks: {
    android: {
      package: 'com.kshitij_khowal.MetroConnect',
      url: PLAY_STORE_URL,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
