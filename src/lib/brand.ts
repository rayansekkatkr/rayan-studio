export const BRAND = {
  name: "Rayan Studio",
  founder: "Rayan Sekkat",
  email: "rayan.sekkat@gmail.com",
  phoneRaw: "+33636365696",
  phoneDisplay: "+33 6 36 36 56 96",
  whatsappUrl: "https://wa.me/33636365696",
  linkedinUrl: "https://www.linkedin.com/in/rayan-sekkat-3911a9294",
  portfolioUrl: "https://portfolio-rayan-sekkat.vercel.app",
  baseUrlFallback: "https://www.rayanstudios.com",
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || BRAND.baseUrlFallback;
}

