import { ReactNode } from 'react';
import cssCommon from '@/styles/common.css';

interface DefaultLayoutProps {
  children:ReactNode
}

const GuestLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <main className={cssCommon.pageContent}>
      {children}
    </main>
  </>
);

export default GuestLayout;
