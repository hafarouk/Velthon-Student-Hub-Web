# Security scope

No PHP runtime, PHP packages, SQL interpreter in the browser, server file upload handler or public registration endpoint is deployed by this repository. PHP-specific injection, file inclusion and deserialization issues are therefore not applicable to this implementation; this is not a claim that all vulnerabilities have been eliminated.

Backend protections: password verification with salted PBKDF2; credentials in runtime secrets; opaque random sessions stored as server-keyed hashes; one-hour expiry; origin binding; server-side revocation on logout; disabled-account and changed-verifier checks; persistent per-account/per-IP login attempt limits; generic credential failures; bounded JSON bodies; prepared SQL statements; no authentication data in public source. The service needs a separate hosting account; GitHub Pages only serves the frontend.

Frontend protections: encrypted per-user local vault using AES-GCM and a password-derived key; escaped text rendering; no server session token stored persistently; no arbitrary OAuth grants; a meta Content Security Policy restricting script, worker and connection sources; no credentials in URL parameters or service worker caches.

Limitations: public static assets are not access restricted. GitHub Pages does not let this repository set all security response headers (for example frame-ancestors/X-Frame-Options). The service's same-origin responses have additional security headers. Shared GitHub Pages origin means other content hosted under this owner's github.io origin is inside the same origin trust boundary. Do not host untrusted apps on that origin. A dedicated custom domain would isolate this application better. CDN libraries are version pinned, not fully vendored or comprehensively independently audited. Cached code/models and encrypted browser storage are not centrally erasable. Password-only trial accounts have no MFA or self-service password recovery. Application access does not protect against a compromised browser/device, weak/shared passwords or malicious browser extensions. A formal penetration test has not been performed.

Report security issues privately to the repository owner; never attach real passwords, tokens or student files in public issues.



## v045 — account activity and consent receipts

Settings → Privacy & activity shows only the signed-in account’s records. The backend records successful/failed known-account sign-ins, sign-out and consent decisions. Minimal browser-reported activity is separately labelled; it is not evidence that a document was read or that a physical person performed an action.

Approval requires an unchecked checkbox and the typed displayed account name. The server stores the exact policy text, version, SHA-256 hash, account, scope, decision and authoritative received time, then HMAC-signs the receipt using a runtime-only key. This is an account acknowledgment, not verified identity or a certified electronic signature. Recording approvals apply to individual lecture references; provider approvals are separate from the provider’s OAuth screen. Existing browser-only approval flags are not converted into signed receipts.

Users can download individual JSON receipts, print them, verify their integrity online, export displayed history, load older pages and withdraw scopes. Withdrawal creates another record and stops future app use of the scope; it does not erase existing receipts or revoke separate provider permissions. History is retained up to 365 days. No passwords, tokens, full IP addresses, document/audio contents or search words are placed in this history. English policy text is explicitly versioned; the existing app interface languages remain available.

Offline decisions and actions are kept in the encrypted per-account vault and clearly marked pending until a later authenticated sync. Device timestamps are claims, distinct from server received time. First approval of a current workspace notice requires online sign-in. External-provider approval must be saved online before continuation. Security records and production signing keys never belong in this public repository. The backend source and SQL migration are maintained in the private source repository.

Validation: 23 backend tests cover authentication, user isolation, explicit approval, canonical text/hash, receipt tampering, idempotency, withdrawal, pagination, offline timestamps and retention. Browser consent checks use fictional accounts and a memory-only test service; no real user consent is accepted by automation.
