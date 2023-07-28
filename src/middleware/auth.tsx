import { useEffect } from 'react';
import { useRouter } from 'next/router';

const checkAuth = () => {
  const token = localStorage.getItem('token')

  return token ? true : false;
};

const Auth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!checkAuth()) {
        router.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default Auth;
