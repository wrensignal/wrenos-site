# WRE-108 CTA Behavior Contract

Date: 2026-03-19
Scope: homepage deploy/self-host CTA behavior

## Routes

- `deploy` CTA:
  - primary: Privy handshake path when configured
  - fallback: `https://github.com/wrensignal/wrenOS/blob/main/RAILWAY_DEPLOY.md`
- `selfHost` CTA:
  - canonical: `https://github.com/wrensignal/wrenOS#quick-start`

## State machine

### Deploy CTA
1. **signed-in/direct configured**
   - Condition: `window.WRENOS_PRIVY_DEPLOY_URL` exists
   - Action: open direct deploy URL
   - Event: `cta_auth_success` (`mode=direct_privy_url`)

2. **signed-out / handshake required**
   - Condition: `window.WRENOS_PRIVY_HANDSHAKE` exists
   - Action: invoke handshake with timeout
   - Success path:
     - if `result.deployUrl` valid, open it
     - Event: `cta_auth_success` (`mode=handshake`)
   - Failure/drop-off path:
     - no deploy URL, handshake error, or timeout -> fallback route
     - Events: `cta_auth_dropoff` or `cta_auth_fail`

3. **handshake not configured**
   - Condition: no direct URL and no handshake function
   - Action: open fallback Railway deploy guide
   - Event: `cta_auth_dropoff` (`reason=handshake_not_configured`)

### Self-host CTA
- Always route to canonical quickstart URL.
- Event: `cta_click` with `route=selfHost`.

## Analytics events

- `cta_click`
- `cta_auth_start`
- `cta_auth_success`
- `cta_auth_fail`
- `cta_auth_dropoff`

Event payload includes route + timestamp + selected metadata.

## No dead-end guarantees

- Every deploy-path failure state falls back to Railway deploy guide.
- Self-host path is hard-routed to canonical quickstart URL.
- Unsafe hrefs are rejected and tracked as `cta_auth_fail`.
