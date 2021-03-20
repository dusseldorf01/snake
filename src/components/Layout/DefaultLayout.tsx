import Header from '@/components/Header';
import { ReactNode } from 'react';
import cssCommon from '@/styles/common.css';

interface DefaultLayoutProps {
  children:ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <Header />
    <main className={cssCommon.pageContent}>
      {children}
    </main>
  </>
);

export default DefaultLayout;
