import { useEffect, useState } from 'react';

const withClientOnlyRender = (Component: any) => (props: any) => {
  const Wrapper = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (loading) {
        setLoading(false);
      }
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return loading ? <div /> : <Component {...props} />;
  };

  return <Wrapper />;
};

export default withClientOnlyRender;
