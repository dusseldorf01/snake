import Header from '@/components/Header';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children:ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <Header />
    <main className="page-content">
      {children}
    </main>
  </>
);

export default DefaultLayout;
