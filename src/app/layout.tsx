import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import AuthProvider from '@/provider/AuthProvider';
import { cookies } from 'next/headers';
import { SESSION_TOKEN_KEY } from '@/lib/constants/common';
import { getFetch } from '@/lib/requests/customFetch';
import getApiBaseUrl from '@/lib/utils/getApiBaseUrl';
import { UserResponseType, UserType } from '@/lib/types/user';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Link Dropper Admin Console',
  description: '링크 드라퍼 내부 운영 관리툴',
  keywords: ['admin', 'link management', 'dashboard'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(SESSION_TOKEN_KEY);
  const hasSessionToken = !!sessionToken && !!sessionToken.value;

  let user: UserType | null = null;

  if (hasSessionToken) {
    try {
      const response: UserResponseType = await getFetch({
        url: `${getApiBaseUrl()}/user`,
        options: {
          headers: {
            Authorization: `Bearer ${sessionToken.value}`,
          },
          next: {
            tags: ["user"],
          },
        },
      });

      if (!!response && !!response.user) {
        user = response.user;
      }
    } catch (error) {
      console.error("Failed to get user", error);
      user = null;
    }
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider hasSessionToken={!!sessionToken} user={user} >
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
