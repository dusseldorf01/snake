import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import type { IClientOnly } from '@/components/ClientOnly/interfaces';
import cssCommon from '@/styles/common.css';

const AppLoader = () => (
  <div className={cssCommon.centerContent}>
    <Loader />
  </div>
);

const ClientOnly = ({ children }: IClientOnly) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly;
