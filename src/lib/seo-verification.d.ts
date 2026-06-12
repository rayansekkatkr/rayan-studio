export type SeoVerificationEnv = {
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
};

export function getGoogleSiteVerification(env?: SeoVerificationEnv): string | undefined;
