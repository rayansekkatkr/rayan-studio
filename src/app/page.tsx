import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { normalizeLocale } from "@/lib/i18n";

export default function RootPage() {
  const acceptLanguage = headers().get("accept-language") ?? "";
  const locale = normalizeLocale(acceptLanguage);
  redirect(`/${locale}`);
}
