import { ReactNode } from 'react';
import cssCommon from '@/styles/common.css';

interface DefaultLayoutProps {
  children:ReactNode
}

const GuestLayout = ({ children }: DefaultLayoutProps) => (
  <div className={cssCommon.pageContainer}>
    <main className={cssCommon.pageContent}>
      {children}
    </main>
  </div>
);

export default GuestLayout;
