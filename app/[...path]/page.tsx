import type { Metadata } from 'next';
import { DeepLinkLanding } from '@/components/DeepLinkLanding';
import { APP_NAME, APP_TAGLINE, flattenSearchParams, getLinkTitle } from '@/lib/config';

type DeepLinkPageProps = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: DeepLinkPageProps): Promise<Metadata> {
  const { path } = await params;
  const title = getLinkTitle(path);

  return {
    title,
    description: `Open ${title} in ${APP_NAME}. ${APP_TAGLINE}.`,
  };
}

export default async function DeepLinkPage({ params, searchParams }: DeepLinkPageProps) {
  const { path } = await params;
  const query = flattenSearchParams(await searchParams);

  return <DeepLinkLanding pathSegments={path} query={query} />;
}
