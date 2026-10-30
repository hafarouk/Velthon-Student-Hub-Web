# VELTHON v052 — writing latency and direct tools

## Changes
- During freehand pen, pencil and highlighter input, draw only newly received segments after the first frame. Reconcile the completed page once when the stroke ends. Shapes, erasing and object edits retain full rendering for correctness.
- Avoid assigning identical status text repeatedly. These assignments previously triggered the global translation observer during drawing.
- Add lightweight append commands to undo history for new strokes, avoiding JSON copies of all existing strokes at pen-down. Keep snapshot undo for object edits; mixed undo/redo is covered by regression tests.
- Read canvas geometry once per coalesced input batch.
- Expand the top quick toolbar from 4 to 16 direct controls: pen, eraser, undo/redo, pencil, highlighter, line, rectangle, ellipse, text, lasso, pan, Smart shapes, Ink → text, image and scan. Keep the vertical rail and grouped menus. Narrow layouts allow the quick strip to scroll.
- Replace the page-turn block with a 26 px triangular bottom-right corner. It advances to the next existing page or creates a page when at the end. Accessible name, keyboard control and normal previous/next buttons remain.
- Refresh the offline shell to use v052 assets.

## Validation
- `node student-hub/test-notebook-v052.cjs`: PASS for legacy pages, independent page data, input fallback, animation-frame batching, mount cleanup, page recovery, append undo/redo and mixed snapshot edit undo/redo.
- Stress regression: a page with 500 committed strokes and 60 live movement frames incurs zero full-page redraws during movement; one reconciliation occurs after pen-up. This verifies rendering work, not a physical-device latency benchmark.
- `node student-hub/test-unit.cjs`: PASS for existing audio/shape/asset checks.
- Browser preview: top-bar pencil selection synchronises with the vertical rail, drawing produces a stroke, undo/redo work, and clicking the triangle creates page two. Full notebook and split layout inspected.
- Syntax and active shell references checked. Real Samsung tablet/stylus timing remains unverified in this environment.

## Still pending from the overall project
Live recording/transcription repair; broader model/resource optimisation; complete translations; distinct school/university redesign; updated full design and sanity documentation. This release does not claim those items fixed. Existing account restrictions, consents and audio-retention rules are unchanged.
