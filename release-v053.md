# VELTHON v053 — tablet handwriting repair and conversion flow

## User-reported issues
v052 still felt slow on the tablet; its bottom triangle was difficult to find. Smart shapes and text conversion did not provide a reliable, clear workflow. The user's annotated screenshot requests the triangle at the top-right of the page.

## Changes
- Retain the painted page between ordinary pen/pencil/highlighter strokes. Append new segments and strokes without repainting the existing page at every pen-down and pen-up. Full redraws remain for shape conversion, erasing, object edits, paper changes and mounting.
- Delay autosave until 1.5 seconds after changes and defer it while a pen gesture is active. Explicit saves still complete before page switches and locking. Use an independent structured snapshot and a dedicated web state-save method to remove redundant JSON bridge copies. Encryption and vault format are unchanged; recording and other consent/audit actions keep their existing request path.
- English mutation updates perform no translation walks. French/Spanish updates process changed subtrees instead of scanning the entire document, and observer callbacks do not process the translator's own writes. Existing translation coverage gaps remain a separate task.
- Move the page-turn control to the top-right of the visible writing area as marked in the supplied screenshot, above the footer, with a gold triangular + control aligned to the actual canvas edge. Turning a page uses a short corner-fold animation; its temporary bitmap is bounded to at most 1024 × 1024 and released afterwards. Reduced-motion settings skip the effect. Click advances or creates a page. Add a small v053 indicator beside the notebook selector.
- Smart shapes accepts quick two-point lines. Its setting is stored on the page, inherited by new pages and synchronised across top/side shortcuts. Unit tests exercise automatic and manual shape conversion.
- Tool feedback persists across queued paints and appears as a visible status notification instead of being silently overwritten.
- Ink → text offers engine preparation at the point of use. A first-use confirmation explains any switch to Online and model download; no switch occurs if declined. Keep the prepared OCR worker for the ensuing conversion, crop to the written region, bound image dimensions and use a Blob to avoid another large base64 bridge copy. Present recognised text for review before insertion; preserve the source ink.
- OCR/model preparation is blocked during active/finalising recording to avoid competing recognition workloads. Handwriting remains available.
- Offline shell loads the same v053 assets. No user data, vault, model cache or credentials are purged.

## Verified
- Notebook regression: old notes, linked pages, stroke fallback, mount cleanup, append and snapshot undo/redo, 500-stroke continuous writing, and 100 short pen-down/move/up cycles: PASS. The 100 short strokes cause zero full-page redraws after mounting. This is a rendering-work test, not a measured Samsung latency benchmark.
- Smart shapes: stored toggle, automatic two-point line and manual Recognize shape: PASS. Conversion feedback survives scheduled paints.
- Autosave: defers while drawing, saves after idle, independent snapshot and native fallback: PASS.
- Capture regression using the active v053 bridge: PASS. Existing consent/audit request routing is retained; no claim that the user's real microphone/live-transcript problem is solved.
- Browser: 1024 × 650 tablet viewport shows the triangle above the footer and page creation works. Top and side Smart shape indicators agree.
- Browser translation: French dynamic text translates, English restoration works, and 100 English status mutations incur zero translation DOM walks.
- Real OCR browser test: generated printed image recognised as “VELTHON student notes”. A synthetic block-ink HELLO sample reached the editable review dialog but was misread as Hcl LO. The review field was corrected to HELLO and inserted successfully with the original ink retained. Handwriting accuracy remains PARTIAL; cursive/equations remain limited by the recognition engine.

## Remaining
Physical Samsung stylus responsiveness, diverse handwriting recognition acceptance, real recording/live-transcript repair, full translations, distinct school/university themes and refreshed overall design/sanity handover remain open. Browser fixtures use disposable accounts and synthetic data and are excluded from publication.
