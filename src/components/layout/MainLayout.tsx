/**
 * MainLayout Component
 * Wraps content with header and footer
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClassName?: string;
}

export function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
  containerClassName = 'min-h-screen',
}: MainLayoutProps) {
  return (
    <div className={containerClassName}>
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
