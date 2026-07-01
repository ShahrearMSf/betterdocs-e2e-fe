// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const BASE_URL_2 = process.env.BASE_URL_2;
const BASE_URL_3 = process.env.BASE_URL_3;

const BASE_URL = process.env.BASE_URL;

/**
 * Permalink regression coverage for the FBS-81660 fix family.
 *
 * Two related bugs surfaced in May 2026:
 *   - BetterDocs Free `wpml-archive-slug-404` (commit 382ebb086): the strict
 *     URL-prefix check in validate_request_path() rejected language-prefixed
 *     archive URLs like /en/support/ when the default-language slug was
 *     "soporte". Fix expanded the valid-prefix list to include the docs post
 *     type's currently-registered rewrite[slug] + wpml_get_translated_slug.
 *   - BetterDocs Free `single-doc-permalink-non-latin-404` (commit 256f116):
 *     WPML translations sharing the same post_name + non-Latin doc_category
 *     slugs 404'd. Fix joined doc_category in the is_single_docs lookup and
 *     compared hierarchical category paths in urldecode'd form.
 *
 * The tests below exercise URL shapes that the same strict-validator gate
 * must keep accepting (positive) and rejecting (negative). They use existing
 * live sites — no fixtures planted.
 *
 * Hosts in use:
 *   BASE_URL (betteromation.shahrear.site) — hierarchical doc_category archive
 *   betterdocs.msf.shahrear.site — hierarchical single-doc URLs (4-level deep)
 *   cbotai.shahrear.site — WPML active, Korean /ko/ language prefix
 */

test.describe("Permalink - Hierarchical doc_category archive", () => {
  test("/docs/team/qa/ - level-2 hierarchical category archive returns 200", async ({
    request,
  }) => {
    const res = await request.get(`${BASE_URL}/docs/team/qa/`);
    expect(res.status()).toBe(200);
  });

  test("/docs/some-prefix/some-other-prefix/ - two-segment garbage path 404s", async ({
    request,
  }) => {
    // Regression for the strict-prefix check: random 2-segment paths under
    // /docs/ that don't resolve to a valid category hierarchy must still 404,
    // even though the validator now accepts hierarchical /parent/child/.
    const res = await request.get(
      `${BASE_URL}/docs/some-prefix/some-other-prefix/`
    );
    expect(res.status()).toBe(404);
  });

  test("/docs/some-prefix-that-doesnt-exist/junior-qa-the-sprit-house/ - invalid-prefix + valid-post-slug 404s", async ({
    request,
  }) => {
    // Mirrors the FBS-81660 single-doc-permalink scenario: a known post
    // slug under a category prefix that does not actually own the post must
    // 404 (strict category validation preserved).
    const res = await request.get(
      `${BASE_URL}/docs/some-prefix-that-doesnt-exist/junior-qa-the-sprit-house/`
    );
    expect(res.status()).toBe(404);
  });
});

test.describe("Permalink - Hierarchical single-doc URL (betterdocs.msf.shahrear.site)", () => {
  // betterdocs.msf.shahrear.site uses `/docs/%doc_category%/%postname%/` permalink
  // with a deep hierarchy. Exercises the urldecode'd hierarchical-path check
  // added by FBS-81660 commit 256f116 (single-doc-permalink-non-latin-404).

  test("4-level hierarchical category + single doc returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_3}/index.php/docs/team/lead/coleads/juniorqa/junior-qa-the-sprit-house/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });

  test("3-level hierarchical category archive returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_3}/index.php/docs/team/lead/coleads/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });
});

test.describe("Permalink - Non-Latin doc_category & post slugs (cbotai.shahrear.site)", () => {
  // Direct regression for FBS-81660 single-doc-permalink-non-latin-404
  // (commit 256f116). The fix compares hierarchical category paths in
  // urldecode'd form so non-Latin (Bengali, Arabic, CJK) slugs match.
  // cbotai has live Korean + Bengali categories and one Korean single doc.

  test("Korean category archive /ko/docs/삶/ returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_2}/ko/docs/%ec%82%b6/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });

  test("Korean category archive /ko/docs/오늘/ returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_2}/ko/docs/%ec%98%a4%eb%8a%98/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });

  test("Korean single doc with non-Latin post slug returns 200 directly", async ({
    request,
  }) => {
    // /ko/docs/강둑을-따라서는-어떤-복잡한-생태계가-번성할까요-what/
    // Exercises the exact code path the FBS-81660 fix was for: post lookup
    // disambiguation when the URL contains non-Latin slug bytes.
    const res = await request.get(
      `${BASE_URL_2}/ko/docs/%ea%b0%95%eb%91%91%ec%9d%84-%eb%94%b0%eb%9d%bc%ec%84%9c%eb%8a%94-%ec%96%b4%eb%96%a4-%eb%b3%b5%ec%9e%a1%ed%95%9c-%ec%83%9d%ed%83%9c%ea%b3%84%ea%b0%80-%eb%b2%88%ec%84%b1%ed%95%a0%ea%b9%8c%ec%9a%94-what/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });

  test("Bengali category archive /bn/docs/bবিপদ/ returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_2}/bn/docs/b%e0%a6%ac%e0%a6%bf%e0%a6%aa%e0%a6%a6/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });

  test("Bengali category archive /bn/docs/lজীবন/ returns 200 directly", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_2}/bn/docs/l%e0%a6%9c%e0%a7%80%e0%a6%ac%e0%a6%a8/`,
      { maxRedirects: 0 }
    );
    expect(res.status()).toBe(200);
  });
});

test.describe("Permalink - WPML language-prefixed archive (cbotai.shahrear.site)", () => {
  test("/ko/docs/ - Korean docs archive resolves (FBS-81660 wpml-archive-slug-404)", async ({
    request,
  }) => {
    // The exact bug shape the customer hit: translated archive URL
    // /<lang>/<slug>/ used to 404 after the strict-prefix commit was added.
    // The fix expanded validate_request_path()'s valid-prefix list. This
    // assertion enforces the fix stays in place.
    const res = await request.get(`${BASE_URL_2}/ko/docs/`);
    expect(res.status()).toBe(200);
  });

  test("/ko/encyclopedia/ - Korean encyclopedia archive resolves", async ({
    request,
  }) => {
    const res = await request.get(
      `${BASE_URL_2}/ko/encyclopedia/`
    );
    expect(res.status()).toBe(200);
  });

  test("/ko/docs/<invalid-doc>/ - invalid single-doc under language prefix 404s", async ({
    request,
  }) => {
    // The strict-validator must still 404 a genuine missing doc even when
    // the language prefix is valid — the fix only relaxed prefix matching,
    // not single-doc existence checks.
    const res = await request.get(
      `${BASE_URL_2}/ko/docs/some-fake-doc-xyz/`
    );
    expect(res.status()).toBe(404);
  });
});
