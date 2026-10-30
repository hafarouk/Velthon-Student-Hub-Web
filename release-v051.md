# VELTHON Student Hub — Phase 1 / v051

## Delivered in this phase

- Fix freehand strokes on browsers whose `getCoalescedEvents()` returns an empty array; fall back to the current pointer event.
- Batch notebook redraws to one animation frame, rather than repainting the canvas for every pointer movement. Cancel stale scheduled paints when mounting another page.
- Add linked pages within a notebook, previous/next navigation, page counts, a folded-corner control and a short page-turn animation. Reduced-motion settings disable the animation. Swipe navigation is limited to the bottom page strip so drawing gestures remain available.
- The header plus now adds a page to the current notebook. A separate New notebook button starts an independent notebook.
- Legacy notes remain independent notebooks. Each page retains its existing handwriting-record format; ink, reviewed text and scan references remain compatible with backups and current exports. Exports still operate on the current page; whole-notebook PDF export is future work.
- Reduce desktop rail icons to 18 px, buttons to 28 px, and rail width to 34 px. Coarse pointers keep larger 34 px tap targets. Keep hover tool names and all menus.
- Add six rail shortcuts: Smart shapes, Recognize shape, Ink → text, Insert image, Insert table and Scan to text. The rail now has 22 controls.
- Release temporary PNG export canvases and the main OCR rendering canvas after image extraction. This reduces temporary resource use; it does not eliminate the memory needed by speech/OCR models.
- Refresh the offline shell to v051 with the same notebook assets as online.

## Validation

- `node test-notebook-v051.cjs`: PASS. Covers legacy page preservation, linking, independent strokes, JSON recovery, deleted notebook root, empty/coalesced/ordinary pointer input, one scheduled redraw for a burst of movements, save and remount cleanup.
- `node test-unit.cjs` from the workspace root: PASS. Existing audio/shape/asset regression checks remain green.
- Changed JavaScript syntax and release shell asset references: PASS.
- Browser QA with disposable local fixture: drawing a stroke, adding a second page, moving between pages, retaining the first-page stroke and its undo history, blank second page, and Smart shapes shortcut: PASS.
- Browser measurement: 22 rail controls, 18 px icons, 28 px desktop buttons, 34 px rail width. Full notebook and split view inspected.
- Browser fixture uses synthetic account/storage; physical Samsung stylus input, memory pressure, real encrypted-storage recovery and a complete classroom recording are not certified by these checks.

## Next phases (still open)

1. Recording/live transcript: reproduce real engine failure, optimise startup/stop, expose accurate capture and transcription readiness, validate remote audio plus microphone where browser permissions permit. A website cannot silently obtain operating-system speaker audio; browser permission requirements remain.
2. Resource use and storage: reduce translation mutation work and competing model workloads; document actual browser vault, cached models, server account/consent records and hosting logs, with retention and measured resource limits.
3. Student experience: distinct school/university themes, full-interface translation coverage, consistent offline tool catalogue and clear online-only availability.
4. Full sanity dashboard refresh, updated HLD/LLD/scope/recovery package and real-device acceptance checklist.

## Restrictions preserved

No changes to invited-account access, external account permissions, recording consent, audio retention, backend hosting, credentials or stored production user content. No storage purge is part of this release.
