import { RootBody, sharedMetadata, sharedViewport } from "@/app/_shared/root";
import "../globals.css";

export const metadata = sharedMetadata;
export const viewport = sharedViewport;

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <RootBody>{children}</RootBody>
    </html>
  );
}
