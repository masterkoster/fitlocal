import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FitLocal - Personalized Nutrition & Workout Planning',
  description: 'Get personalized nutrition and workout plans based on your gym and supermarket',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
