import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { normalizeLocale } from "@/lib/i18n";

export default async function RootPage() {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language") ?? "";
  const locale = normalizeLocale(acceptLanguage);
  redirect(`/${locale}`);
}
