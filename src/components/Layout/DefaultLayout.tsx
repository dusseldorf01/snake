import Header from '@/components/Header';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children:ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <div className="page-container">
    <Header />
    <main className="page-content">
      {children}
    </main>
  </div>
);

export default DefaultLayout;
