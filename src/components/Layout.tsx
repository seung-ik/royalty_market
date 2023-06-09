import React, { PropsWithChildren } from "react";
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
const UserStatus = dynamic(() => import('./tychetoss/UserStatus'), {
  ssr: false,
});

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>royalty_market</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserStatus />
      <div style={{ width: '100%', display: 'flex' }}>
        <button onClick={() => router.push('/calendar')}>달력페이지</button>
        <button onClick={() => router.push('/')}>메인페이지</button>
        <button onClick={() => router.push('/file')}>파일페이지</button>
        <button onClick={() => router.push('/betting')}>베팅페이지</button>
        <button onClick={() => router.push('/crud')}>api_routes</button>
        <button onClick={() => router.push('/tychetoss')}>tychetoss</button>
      </div>
      {children}
    </div >
  )
}

export default Layout;
