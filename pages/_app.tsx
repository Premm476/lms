import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/cross-browser.css';

// Define proper session type
type PageSession = {
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    emailVerified?: boolean | null;
    avatar?: string | null;
    bio?: string | null;
    lastAccessed?: Date | null;
  };
  expires: string;
};

type PageProps = {
  [key: string]: unknown;
  session?: PageSession;
};

type AuthOptions = {
  required?: boolean;
  role?: string;
};

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    auth?: AuthOptions;
  };
  pageProps: PageProps;
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      {Component.auth ? (
        <AuthWrapper auth={Component.auth}>
          <Component {...pageProps} />
        </AuthWrapper>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function AuthWrapper({
  children,
  auth,
}: {
  children: ReactNode;
  auth: AuthOptions;
}) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: auth.required !== false,
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      const callbackUrl = router.pathname !== '/' ? `?callbackUrl=${encodeURIComponent(router.asPath)}` : '';
      router.push(`/login${callbackUrl}`);
      return;
    }

    if (auth.role && session.user?.role !== auth.role) {
      router.push('/unauthorized');
    }
  }, [session, status, auth.role, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (auth.role && session?.user?.role !== auth.role) {
    return <div className="flex justify-center items-center h-screen">Unauthorized</div>;
  }

  return <>{children}</>;
}

export default MyApp;