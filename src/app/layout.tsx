import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ne Kadar Yakar? - Güncel Yakıt ve Yol Maliyeti Hesaplama",
  description: "Rotanızı oluşturun, aracınızı seçin ve yakıt maliyetinizi otoyol ve gişe ücretleri ile anında hesaplayın.",
  openGraph: {
    title: "Ne Kadar Yakar? - Güncel Benzin ve Yol Maliyeti Hesaplama",
    description: "Rotanızı oluşturun, aracınızı seçin ve yakıt maliyetinizi anında hesaplayın.",
    siteName: "Ne Kadar Yakar",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png/1d4ed8/ffffff?text=Ne+Kadar+Yakar",
        width: 1200,
        height: 630,
        alt: "Ne Kadar Yakar Kapak",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ne Kadar Yakar? - Yol Maliyeti Hesaplama",
    description: "Yakıt masraflarını arkadaşlarınla bölüş ve hesapla.",
    images: ["https://via.placeholder.com/1200x630.png/1d4ed8/ffffff?text=Ne+Kadar+Yakar"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ne Kadar Yakar",
    "description": "Araç yakıt tüketimi, gişe ücretleri ve masraf bölüşme hesaplama aracı.",
    "applicationCategory": "Utility",
    "operatingSystem": "All"
  };

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-3W36H4PLXM`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3W36H4PLXM', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Header />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      </body>
    </html>
  );
}
