import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مجلس اتحادِ ملت",
  description: "فکری ہم آہنگی، علمی مکالمہ اور ملی وحدت کے لیے مشترکہ پلیٹ فارم",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ur" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
