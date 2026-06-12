function getGoogleSiteVerification(env = process.env) {
  const token = env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  if (typeof token !== "string") {
    return undefined;
  }

  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

module.exports = {
  getGoogleSiteVerification,
};
