const assert = require("node:assert/strict");
const test = require("node:test");

const { getGoogleSiteVerification } = require("../src/lib/seo-verification");

test("getGoogleSiteVerification returns a trimmed Google Search Console token", () => {
  assert.equal(
    getGoogleSiteVerification({
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "  google-site-verification-token  ",
    }),
    "google-site-verification-token",
  );
});

test("getGoogleSiteVerification omits empty verification tokens", () => {
  assert.equal(getGoogleSiteVerification({}), undefined);
  assert.equal(getGoogleSiteVerification({ NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "" }), undefined);
  assert.equal(getGoogleSiteVerification({ NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "   " }), undefined);
});
