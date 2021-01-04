import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children:ReactNode
}

const GuestLayout = ({ children }: DefaultLayoutProps) => (
  <div className="page-container">
    <main className="page-content">
      {children}
    </main>
  </div>
);

export default GuestLayout;
