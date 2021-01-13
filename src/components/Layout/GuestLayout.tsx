import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children:ReactNode
}

const GuestLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <main className="page-content">
      {children}
    </main>
  </>
);

export default GuestLayout;
