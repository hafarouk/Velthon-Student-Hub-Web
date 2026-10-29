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
