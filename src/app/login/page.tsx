'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<'kakao' | 'google' | null>(null);

  const handleKakaoLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    
    if (!clientId) {
      alert('카카오 클라이언트 ID가 설정되지 않았습니다. 관리자에게 문의하세요.');
      return;
    }

    try {
      setIsLoading('kakao');
      
      const redirectUrl = `${window.location.origin}/dashboard`;
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${redirectUrl}`;

      window.location.href = kakaoAuthUrl;
    } catch (error) {
      console.error('Kakao login error:', error);
      setIsLoading(null);
      alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY;
    
    if (!clientId) {
      alert('구글 클라이언트 ID가 설정되지 않았습니다. 관리자에게 문의하세요.');
      return;
    }

    try {
      setIsLoading('google');
      
      const redirectUrl = `${window.location.origin}/dashboard`;
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline&state=${redirectUrl}`;

      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google login error:', error);
      setIsLoading(null);
      alert('구글 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image
              src="/link_dropper-favicon.png"
              alt="Link Dropper Logo"
              width={48}
              height={48}
              priority
            />
          </div>
          <h1 className={styles.title}>Link Dropper</h1>
          <p className={styles.subtitle}>관리자 콘솔</p>
        </div>

        <div className={styles.loginForm}>
          <p className={styles.description}>
            관리자 계정으로 로그인하여 링크드로퍼를 관리하세요
          </p>

          <div className={styles.socialButtons}>
            <button 
              className={`${styles.socialButton} ${styles.kakaoButton} ${isLoading === 'kakao' ? styles.loading : ''}`}
              onClick={handleKakaoLogin}
              disabled={isLoading !== null}
              aria-label="카카오 계정으로 로그인"
            >
              {isLoading === 'kakao' ? (
                <div className={styles.loadingSpinner} />
              ) : (
                <div className={styles.socialIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M10 0C4.477 0 0 3.58 0 8c0 2.827 1.87 5.304 4.64 6.64l-.896 3.267c-.082.298.325.533.551.318L7.93 15.68c.68.09 1.375.137 2.07.137 5.523 0 10-3.58 10-8S15.523 0 10 0z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
              {isLoading === 'kakao' ? '로그인 중...' : '카카오로 로그인'}
            </button>

            <button 
              className={`${styles.socialButton} ${styles.googleButton} ${isLoading === 'google' ? styles.loading : ''}`}
              onClick={handleGoogleLogin}
              disabled={isLoading !== null}
              aria-label="구글 계정으로 로그인"
            >
              {isLoading === 'google' ? (
                <div className={styles.loadingSpinner} />
              ) : (
                <div className={styles.socialIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18.12 8.18h-.46v-.04H10v3.64h4.68c-.68 1.94-2.48 3.36-4.68 3.36a5.36 5.36 0 110-10.72c1.36 0 2.6.5 3.54 1.32l2.58-2.58A8.96 8.96 0 0010 1.04a8.96 8.96 0 108.12 7.14z" fill="#4285F4"/>
                    <path d="M2.32 6.3l3.04 2.22c.74-2.16 2.76-3.66 5.14-3.66 1.36 0 2.6.5 3.54 1.32l2.58-2.58A8.96 8.96 0 0010 1.04a8.96 8.96 0 00-7.68 5.26z" fill="#EA4335"/>
                    <path d="M10 18.96a8.92 8.92 0 006.12-2.38l-2.82-2.38c-.78.56-1.78.9-2.9.9a5.32 5.32 0 01-4.68-3.36l-3.04 2.34A8.96 8.96 0 0010 18.96z" fill="#34A853"/>
                    <path d="M18.12 8.18h-.46v-.04H10v3.64h4.68c-.34.98-.88 1.84-1.58 2.52l2.82 2.38c-.2.18 3.08-2.26 3.08-7.68 0-.74-.08-1.46-.22-2.14l-.66-.68z" fill="#FBBC05"/>
                  </svg>
                </div>
              )}
              {isLoading === 'google' ? '로그인 중...' : 'Google로 로그인'}
            </button>
          </div>

          <div className={styles.footer}>
            <p className={styles.notice}>
              관리자만 접근할 수 있습니다. 승인된 계정으로만 로그인 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
