# MetroConnect links

Small Next.js site for [kshitijkhowal.in](https://kshitijkhowal.in). It turns clickable `https://` links into MetroConnect deep links.

## What a link does

| Device | Behaviour |
| --- | --- |
| Android, app installed | Opens MetroConnect on the matching screen |
| Android, app not installed | Sends the user to [Google Play](https://play.google.com/store/apps/details?id=com.kshitij_khowal.MetroConnect) |
| iPhone, iPad, desktop, anything else | Shows **Coming soon on this device** and a Google Play button |

Examples:

- `https://kshitijkhowal.in/fareScreen`
- `https://kshitijkhowal.in/fareScreen/rapidMetro`
- `https://kshitijkhowal.in/routeScreen?fromStationId=1&toStationId=2&routePreference=time`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/fareScreen](http://localhost:3000/fareScreen).

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the custom domain `kshitijkhowal.in` (and `www` if you use it) in Vercel → Project → Settings → Domains.
4. Point the domain DNS to Vercel:
   - Apex: A record to `10.0.1.2`, or the records Vercel shows
   - `www`: CNAME to `cname.vercel-dns.com`

Optional environment variables (Project → Settings → Environment Variables):

| Name | Purpose |
| --- | --- |
| `ANDROID_SHA256_FINGERPRINTS` | Play App Signing SHA-256, comma-separated, so Android App Links can skip the browser |
| `APPLE_TEAM_ID` | Apple Team ID for Universal Links when the iOS app ships |

After adding SHA-256 fingerprints, Android can open `https://kshitijkhowal.in/...` directly. Until then, the page uses `metroconnect://` / Android intents, then falls back to Play Store.

### Play Console SHA-256

Play Console → MetroConnect → Test and release → App integrity → App signing → **SHA-256 certificate fingerprint**.

Paste it as `AA:BB:CC:...` in `ANDROID_SHA256_FINGERPRINTS`.

## Native app (MetroConnect)

The mobile app should generate and accept these HTTPS URLs, and declare:

- Android App Links for `https://kshitijkhowal.in`
- iOS associated domains `applinks:kshitijkhowal.in` when iOS is ready

Rebuild the native app after changing `app.json` intent filters / associated domains.
