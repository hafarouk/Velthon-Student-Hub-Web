# Student Hub welcome-page design QA

final result: passed

Source visual truth: /workspace/scratch/43012cbf7c0f/generated_images/exec-9a7cf666-7cf7-4e85-8cb1-ec6e9a7110ab.png (approved after user requested thin square border, larger inset logo and no glow).
Implementation: /workspace/scratch/landing49-desktop-final.jpg.
Full comparison: /workspace/scratch/landing49-comparison-final.jpg.
Focused logo/footer comparison: /workspace/scratch/landing49-brand-comparison.jpg.
Responsive evidence: /workspace/scratch/landing49-responsive-final.jpg (phone correction also inspected again after capture).

## Viewport and normalization

Logged-out landing state, English. Source 1506×1045 pixels normalized to 1279×889. Browser implementation iframe viewport 1505×1045 CSS pixels at 0.85 visual scale; screenshot clip 1279×889 pixels. This uses an actual rendered page, not a rasterized website. Browser window 1363×936. Source and rendered capture were combined in one input for full-page and focused comparisons. Phone 390×844 and tablet 834×1050 CSS iframes were also rendered; phone content client width 375 with its vertical scrollbar, scroll width 375; tablet width and scroll width both 834.

## Findings and comparison history

Initial blocked findings:
- P1: old fixed auth shell clipped lower content. Enabled vertical scrolling in the existing auth shell.
- P2: photo HTML height overrode the intended aspect ratio, enlarging the lower image and pushing the footer out of view. Set image height:auto.
- P2: legacy offline-button rules added a filled background and extra height. Scoped public-page overrides restore the compact underlined control.
- P2: desktop spacing pushed footer below the 1045px comparison viewport. Reduced section, guide and footer spacing, and set explicit heading line heights.
- P2: phone image crop put white hero text over a bright area. Phone layout now places the navy logo/headline section above a right-focused tablet photo.

Final combined comparison shows those issues resolved: full footer is visible, both photographs retain their intended subjects, the complete logo is inside a fine square without a halo, wordmarks are light, and the single-row desktop login/three guides/eight tool entries remain aligned. Phone and tablet show legible text, usable inputs and no horizontal overflow. No actionable P0/P1/P2 finding remains.

## Required fidelity surfaces

- Typography: locally bundled Inter 300/400/500, sharp light hero and wordmarks; no heavy logo lettering. Headline remains two lines. Labels remain readable. Free-font license included.
- Layout rhythm: matched major header, navy hero, compact sign-in strip, lower photo and three guide columns, eight tool links, classic-tools line and small company footer. The photo and logo assets were generated independently from the approved reference rather than flattening the page. Phone stacking is intentional adaptation to protect contrast and preserve the tablet scene.
- Colors: navy/cream/gold retained, positive navy V/white lion/gold book, fine square border without glow. Footer uses the original positive company artwork, not the product emblem or a negative variant.
- Images/icons: rear-view students and indistinct backgrounds, recognizable tablet notebook and laptop recording/transcript, no physical-paper handwriting photo. Raster assets inspected. Thin standard Phosphor library icons with license are used. No custom icon drawings or CSS illustrations.
- Copy/content: headline, tagline, login, trial users, three guides, all eight featured tools and classic tools retained. Provider setup/recognition limitations appear in feature explanations. Intro is explicitly labeled illustrated silent scenes rather than an actual call demonstration.

## Interactions and checks

Verified in the browser: intro modal opens and video decodes to readyState 4, advances and reaches its 11-second end; guide dialogs open; Explore all tools opens the complete list; guide sign-in action closes dialog, scrolls to form and focuses username; normal close restores page. Existing offline unlock is appended by the retained app code. Account handlers and authorization code are unchanged, no personal credentials used for testing. Decorative motion has a labeled pause/resume control and CSS reduced-motion support. No app-source console errors seen; browser-extension metadata telemetry errors were present and are outside the app. Existing assets/audio and capture-control regressions pass.

## Follow-up polish (P3)

The small decorative leaf motifs are omitted. Standard icons are a close thin-line family instead of generated two-colour drawings. Generated illustrative photo screen lettering is approximate and may not be perfectly readable at small sizes; production app screens themselves are unchanged. These do not affect the requested brand hierarchy, product scenes or sign-in flow.

## Implementation checklist

- Complete approved public page with locally bundled assets, font and icon licenses.
- Preserve restricted backend, existing consent receipts and v048 capture behavior.
- Publish only the new public assets, index, service-worker shell, README and this QA report; do not publish QA fixture pages or screenshots.
