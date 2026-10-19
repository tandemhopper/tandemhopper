# Tandemhopper publishing rules (mandatory)

**Every new or imported editorial article MUST be created in Sanity CMS, NOT hardcoded in the Next.js repository.** The editor must be able to find and fully edit it in Sanity Studio under **Content / Geschichten**.

## Established publishing workflow

1. Prepare article JSON under `content/imports/<slug>.json` (see existing examples and `scripts/import-sanity.mjs`). Use `category: "fankultur"` for **Kurzmeldungen**. Set `publish: true` when the user asks to put an article live; otherwise leave it as a draft.
2. Commit to `main`. The GitHub Actions workflow `.github/workflows/import-sanity.yml` imports the document into Sanity using the configured token.
3. Wait for GitHub Actions to finish successfully. Verify that the article is visible in Sanity and on the website if published. Do **not** claim publication or editable CMS status without checking.
4. Articles must stay independently editable in Sanity: headline, teaser, body, image and caption. For large lists, use appropriate Sanity body objects such as `fixtureList` rather than inserting immutable JS content.
5. **Do not create/modify `lib/articles.js` for new articles.** That is legacy fallback data, not the editorial CMS. If migrating an old fallback article, import to Sanity first, verify success, and then delete only its fallback entry so there is no duplicate.
6. Do not overwrite previously edited CMS articles from stale import JSON: check the importer markers and current Sanity version before re-running changes.
7. Use only images whose rights permit use, and preserve source, attribution, license and modifications. The article schema supports uploading an image or storing an externally licensed image with credits.

These instructions reflect an explicit repeated editorial requirement from the Tandemhopper owner. Treat CMS-first as default in future article workflows. Changes to the site's code are for technical features, not for editorial publishing.
