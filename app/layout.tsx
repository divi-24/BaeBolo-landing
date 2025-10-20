import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "BaeBolo - College Dating Reimagined 💞",
  description: "Meet, vibe, and match with people who get your campus energy. Join the waitlist for India's #1 college dating app.",
  keywords: "college dating, student dating app, campus connections, BaeBolo",
  openGraph: {
    title: "BaeBolo - College Dating Reimagined",
    description: "Join the waitlist for India's #1 college dating app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#fe3c72',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
