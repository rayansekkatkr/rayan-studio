import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { preferredLocaleFromHeader } from "@/lib/i18n";

export default async function RootPage() {
  const requestHeaders = await headers();
  const locale = preferredLocaleFromHeader(requestHeaders.get("accept-language"));
  redirect(`/${locale}`);
}
