# VELTHON Student Hub

Public frontend hosted by **hafarouk** on GitHub Pages. Designed and developed by VELTHON Design and Development.

This repository contains public application code and branding only. Passwords, password verifiers, server secrets, authentication databases and study material must never be committed here. There is no public account registration. The owner provisions invited accounts in the separate authentication service.

## Access and privacy

The sign-in page and static frontend files are publicly downloadable, as required by public GitHub Pages hosting. Authentication and server session checks run in a separate HTTPS backend. GitHub Pages cannot execute PHP or protect static files with server-side passwords. The app does not use PHP.

Study material is stored in a per-user encrypted IndexedDB vault in the browser. It is not uploaded to this repository or synced between devices. The local vault requires the account password; first sign-in needs the authentication service. The Pages origin has its own workspace, so data from another site must be moved with the app's encrypted backup/restore.

Previously provisioned offline workspaces can be unlocked without the server. Revocation cannot reach a disconnected device. Protect the device and use a strong, unique account password. Anyone able to run a modified copy of the public frontend can alter their own local app; they do not gain another person's encrypted data or an authenticated server session.

Online sessions expire after one hour, are bound to the frontend origin, are revoked by online logout, and are invalidated when an account is disabled or its password verifier changes. Cross-site session tokens stay only in memory and are excluded from local vault records, backups, URLs and the service-worker cache. Third-party cookies are not required. Closing or reloading the page clears the in-memory token.

## Trial limitations

This is a trial, not a security certification. Optional document and local model tools download pinned libraries/models on first use from approved public services. Recognition may be inaccurate. Browser storage can be evicted; export encrypted backups. Physical iPad/Android stylus, speech and offline engine coverage still needs device testing. Email/cloud/calendar OAuth account integration is not implemented; local file and ICS imports are available.

## Security reports

Do not post credentials or private records in public issues. Contact the repository owner privately. See SECURITY.md for control details and remaining limitations.



## Web 0.4.0 — microphone and notebook studio

- Microphone input test, raw/processed dBFS and software gain readout, user-gesture audio-context unlock/resume, stale-device and permission errors. Lecture capture disables browser noise suppression/AGC and uses software gain with a compressor (automatic up to 16×; lecture-hall up to 32×). The saved recording and speech engine share the processed signal. A visible interruption warning reports suspended audio, muted input and stalled frames.
- Compact notebook title and top toolbars; expandable ink/page/text settings; split-screen and full-width writing. Pen, pencil, highlighter, pixel/stroke erasers, box/lasso selection, move, resize, ink rotation, layer order, copy/cut/paste/duplicate, undo/redo, typed text and formatting, line/arrow/rectangle/ellipse/triangle/diamond, smart shape conversion, fill/dashes/grid snap, image/table insertion, transient laser pointer, six paper templates, background colour, zoom, stylus-only mode and keyboard shortcuts. Shift constrains circles/squares and line angles.
- Handwriting to reviewed editable text uses the browser recognizer if available, otherwise the prepared free OCR engine. Photo Scan to Text supports camera capture or image upload, crop, rotation, document contrast, editable OCR, note insertion/new-note creation, copy/text export, and retained original photos. Recognition is local; initial engine/model downloads require internet. Cursive, equations and complex layouts still need review.
- PNG/PDF exports preserve the rendered page. SVG exports editable vector ink/text/images; erased pixels and some styling differ, so use PNG/PDF for exact appearance.

Validation: JavaScript syntax and asset-reference checks; quiet-input/silence/clipping/interruption and shape-recognition checks; Chromium interactions for drawing, undo/redo, selection, transforms, text and the scan review/insertion flow (OCR result stubbed); synthetic microphone integration verifies the actual Web Audio/MediaRecorder graph and saved decodable non-silent audio. Physical iPad/Android microphone pickup and recognition accuracy require a device/room test. Existing 15-minute recording limit remains.


## Web 0.4.1 — connected agenda, study media and visible ink controls

- An agenda sidebar displays upcoming and pinned events with provider calendar/event colours where available. Labels suggest exam/deadline urgency from titles. It supports a date range, important-only filter, event details and a collapsible/mobile drawer. Selected Google and Outlook calendars refresh every five minutes while the page is open, visible and online. Recurrences are expanded by provider APIs, event IDs are deduplicated, cancellations/removals are reconciled in the sync window, and local events are preserved.
- The Google GIS and Microsoft MSAL (PKCE) connection adapters request read-only calendar access and isolate sessions to the signed-in Student Hub user. Access tokens remain in memory, event copies use the existing encrypted workspace, and disconnect removes cached provider events. Google can revoke an active grant; Microsoft grant revocation is managed at the provider. No inbox messages are read. **The deployment has no Google/Microsoft application IDs configured yet. Real account sign-in requires owner app registration and each user's consent.** See calendar-setup.html. This is not a completed live account connection.
- External-consent notices precede provider sign-in helpers, music embeds, video searches/players and external platform navigation. No provider passwords or client secrets are requested in Student Hub. Each provider's own consent/terms/privacy and school restrictions still apply; an in-app notice is not a legal-compliance guarantee.
- The music dock collapses to one play icon within the existing footer. It opens provider controls for supported Spotify, Apple Music and SoundCloud links, with external-platform access for any HTTPS music site. YouTube Music uses its own tab. Closing an embedded player stops it; lecture capture stops embedded music. External tabs remain under the provider's controls. Full playback, subscriptions and third-party cookie rules can limit embeds.
- “How to” video search fetches real educational results from Internet Archive without an API key; YouTube suggestions require an optional owner-provided YouTube Data API key with website/API restrictions. Platform search links support YouTube, Khan Academy, MIT OpenCourseWare, Coursera and edX. A pasted YouTube video link can also open the floating player. The player moves by dragging its title bar or using arrow keys, resizes by corner or +/- controls, and stays within viewport bounds. Closing stops it. Playback can fail if the source restricts embedding. Embedded videos stop for lecture recording; YouTube also stops when the tab is hidden.
- Ink colour, colour presets, thickness and opacity are always visible above the page. Opacity is saved on drawn objects and can be applied to a selection. Pen, pencil and highlighter have individual opacity defaults.

Validation: existing microphone/shape and notebook tests retained; browser tests cover calendar adapters against fixture APIs, consent cancellation/approval, no token persistence, dedupe/deletion/pinning, responsive sidebar, safe music links, no embedded player before consent, recording interruption, visible ink controls and stroke opacity, video search fixture mapping, drag/size controls and mobile bounds. A real Internet Archive search returned HTTP 200 with CORS support and real matching study-video results. Provider account login, embedded media playback and recognition accuracy still need real-account/device testing; no live OAuth account was connected during testing.


## Web 0.4.2 — memory-conscious scans and explicit file destinations

Photos are decoded with native resize options where supported, capped to 1000/1400/1800 pixels on the longest edge, and previewed at a smaller size. File/object URLs replace full-resolution data-URL copies. Temporary image surfaces and idle model workers are released; OCR loads one selected language, supports cancellation, times out and terminates after the task. Optimized scan images are stored as separately encrypted binary records, and notes retain only identifiers. Full-resolution originals are offered for explicit saving rather than copied into note JSON. Existing inline photos remain readable. Handwriting reuses an offscreen drawing buffer and bounds undo history to reduce repeated allocation.

Save & cloud storage prepares one item at a time: passphrase-encrypted workspace/scan backup, notes, notebook PNG, optimized scan, original attachment, recording or any user-picked file. Local saving and the native Files/share picker are available according to browser/device capabilities. Direct Google Drive (drive.file) and OneDrive app-folder (Files.ReadWrite.AppFolder) uploads have separate explicit file/account consent. The deployment still needs owner Google/Microsoft app IDs, enabled APIs/permissions and user authorization before direct cloud/calendar connections work. No provider account was connected in development, no automatic cloud background sync is enabled, and device copies are not removed automatically. Larger files are directed to the native provider workflow; Google uploads over 5 MB use bounded resumable chunks. Cloud storage frees neither RAM nor device copies by itself; reduced image/model allocations address scan memory pressure.

Workspace backup version 2 includes optimized scan records and restores through the existing backup import, remaining compatible with version 1 imports. Original documents and recordings are exported individually. Backup scans are capped to 20 MB to avoid assembling an unbounded archive in memory. Users must retain their passphrase and a safe copy.

Validation adds a 12-megapixel photo reduced to at most 1 megapixel, encrypted binary photo round-trip, portable encrypted backup inspection, one-language OCR worker cleanup, offscreen canvas reuse across 100 paints, and explicit Google/OneDrive upload adapters against fixture APIs. Actual camera-process memory limits, cloud OAuth consent/permissions and media playback still require a physical device and configured provider accounts.


## Web 0.4.3 — search corrections and per-user connection clarity

The earlier video metadata query required every word, including phrases such as “how to solve a”, and could return zero matches even when shorter topic queries had results. The search now removes question/action filler, handles singular/plural variants, retries a broader metadata query when needed, ranks title matches and provides working provider navigation when no YouTube API key is configured. Offline mode offers an explicit Go online and search action. External search navigation uses a native link directly from the consent submit gesture, with a visible fallback link; delayed window.open after dialog closure is removed from these search flows.

Saved-material search now indexes typed notebook text boxes as well as reviewed OCR, document/lecture text and source titles. Short formulas are no longer discarded. Enter and the Search button share a search handler, and the default scope searches all of the current user's material instead of silently inheriting an empty library selection. Local keyword search can run while another task is busy. Web and Videos are distinct explicit destinations; web search does not upload workspace documents or recordings.

Email connections remain per-student OAuth consent with account selection. The shared provider application registration is separate from the owner's mailbox and must still be configured before calendar/Drive/OneDrive sign-in can be activated. No owner or student email account is connected by this change.

Validation reproduced zero video results for “how to solve a quadratic equation” and missing typed-note/short-formula/title matches, then verified corrected local results and 26 real matching Internet Archive results for the full question. Browser checks cover Enter/button searches, stale-scope recovery, local search during a busy task, offline→online search, broader result fallback, consent-driven native Google/YouTube navigation, CORS/security enforcement and mobile bounds. A standalone browser's direct real-network fetch was blocked by its test proxy certificate (ERR_CERT_AUTHORITY_INVALID); no certificate checks were disabled. Real API responses were checked through the configured trusted HTTP client, and browser flow/API response handling was validated with fixtures.
