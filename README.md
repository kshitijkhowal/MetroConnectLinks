# MetroConnect links

Small Next.js site for [metro.kshitijkhowal.in](https://metro.kshitijkhowal.in). The portfolio stays on [kshitijkhowal.in](https://kshitijkhowal.in).

## What a link does

| Device | Behaviour |
| --- | --- |
| Android, app installed | Opens MetroConnect on the matching screen |
| Android, app not installed | Sends the user to [Google Play](https://play.google.com/store/apps/details?id=com.kshitij_khowal.MetroConnect) |
| iPhone, iPad, desktop, anything else | Shows **Coming soon on this device** and a Google Play button |

Examples:

- `https://metro.kshitijkhowal.in`
- `https://metro.kshitijkhowal.in/fareScreen`
- `https://metro.kshitijkhowal.in/fareScreen/rapidMetro`
- `https://metro.kshitijkhowal.in/routeScreen?fromStationId=1&toStationId=2&routePreference=time`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/fareScreen](http://localhost:3000/fareScreen).

## Deploy on Vercel

1. Push this repo to GitHub and import it in [Vercel](https://vercel.com/new).
2. In **this** project (not the portfolio): Settings → Domains → add `metro.kshitijkhowal.in`.
3. At your DNS provider, add only a subdomain record. Leave `kshitijkhowal.in` pointed at the portfolio.

Typical record (use the exact CNAME Vercel shows):

| Type | Name / Host | Value |
| --- | --- | --- |
| CNAME | `metro` | the host from the Vercel domain card, for example `cname.vercel-dns-0.com` |

Do **not** add `kshitijkhowal.in` itself to this project.

Optional environment variables (Project → Settings → Environment Variables):

| Name | Purpose |
| --- | --- |
| `ANDROID_SHA256_FINGERPRINTS` | Play App Signing SHA-256, comma-separated, so Android App Links can skip the browser |
| `APPLE_TEAM_ID` | Apple Team ID for Universal Links when the iOS app ships |

After adding SHA-256 fingerprints, Android can open `https://metro.kshitijkhowal.in/...` directly. Until then, the page uses `metroconnect://` / Android intents, then falls back to Play Store.

### Play Console SHA-256

Play Console → MetroConnect → Test and release → App integrity → App signing → **SHA-256 certificate fingerprint**.

Paste it as `AA:BB:CC:...` in `ANDROID_SHA256_FINGERPRINTS`.

## Native app (MetroConnect)

The mobile app should generate and accept these HTTPS URLs, and declare:

- Android App Links for `https://metro.kshitijkhowal.in`
- iOS associated domains `applinks:metro.kshitijkhowal.in` when iOS is ready

Rebuild the native app after changing `app.json` intent filters / associated domains.
