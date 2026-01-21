import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: {
    default: "Vera Temizlik | Antalya'nın En Güvenilir Temizlik Şirketi",
    template: "%s | Vera Temizlik"
  },
  description: "Antalya'da profesyonel ev temizliği, ofis temizliği, villa temizliği ve daha fazlası. Çevre dostu ürünler ve uzman kadromuzla 12 yıldır hizmetinizdeyiz. Hemen teklif alın!",
  keywords: ["Antalya temizlik", "ev temizliği", "ofis temizliği", "villa temizliği", "profesyonel temizlik", "temizlik şirketi", "Antalya", "dış cephe temizliği", "inşaat sonrası temizlik"],
  authors: [{ name: "Vera Temizlik" }],
  creator: "Vera Temizlik",
  publisher: "Vera Temizlik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://veratemizlik.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vera Temizlik | Antalya'nın En Güvenilir Temizlik Şirketi",
    description: "Antalya'da profesyonel ev temizliği, ofis temizliği, villa temizliği ve daha fazlası. 12 yıllık deneyim, 5000+ mutlu müşteri.",
    url: "https://veratemizlik.com",
    siteName: "Vera Temizlik",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vera Temizlik | Antalya Profesyonel Temizlik",
    description: "Antalya'da profesyonel temizlik hizmetleri. Ev, ofis, villa temizliği ve daha fazlası.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0056b3" />
      </head>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
