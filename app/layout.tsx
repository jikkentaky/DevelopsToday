import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "@/assets/globals.scss";
import styles from "./layout.module.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Find and explore delicious recipes from around the world",
  icons: {
    icon: [
      {
        url: "/image/book.png",
      },
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={`container ${styles.header}`}>
          <h1 className={styles.headerTitle}>
            <Link href="/" className={styles.headerLink}>
              <span role="img" aria-label="Recipe Book">📖</span>
              Recipe Book
            </Link>
          </h1>
        </header>
        <main className={`container ${styles.main}`}>
          {children}
        </main>
        <footer className={`container ${styles.footer}`}>
          <p>© {new Date().getFullYear()} Recipe Book. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}