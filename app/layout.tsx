import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { APP_NAME, APP_TAGLINE, PLAY_STORE_URL, WEB_HOST } from '@/lib/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${WEB_HOST}`),
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: `${APP_NAME} — ${APP_TAGLINE}.`,
  applicationName: APP_NAME,
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
