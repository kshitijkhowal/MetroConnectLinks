import { ANDROID_PACKAGE, IOS_BUNDLE_ID } from '@/lib/config';

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function getAppleTeamId(): string {
  return process.env.APPLE_TEAM_ID?.trim() ?? '';
}

function getAndroidSha256Fingerprints(): string[] {
  return (process.env.ANDROID_SHA256_FINGERPRINTS ?? '')
    .split(',')
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
}

export function getAppleAppSiteAssociationResponse(): Response {
  const teamId = getAppleTeamId();
  const details = teamId
    ? [
        {
          appID: `${teamId}.${IOS_BUNDLE_ID}`,
          paths: ['*'],
        },
      ]
    : [];

  return jsonResponse({
    applinks: {
      apps: [],
      details,
    },
  });
}

export function getAssetLinksResponse(): Response {
  const fingerprints = getAndroidSha256Fingerprints();
  const body =
    fingerprints.length === 0
      ? []
      : [
          {
            relation: ['delegate_permission/common.handle_all_urls'],
            target: {
              namespace: 'android_app',
              package_name: ANDROID_PACKAGE,
              sha256_cert_fingerprints: fingerprints,
            },
          },
        ];

  return jsonResponse(body);
}
