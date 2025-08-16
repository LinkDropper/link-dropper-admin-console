'use client';

import React from 'react';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/uiStore';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className={styles.container}>
      {/* 상단 네비게이션 */}
      <TopNavigation />

      <div className={styles.content}>
        {/* 사이드바 */}
        <Sidebar />

        {/* 메인 콘텐츠 */}
        <main
          className={`${styles.main} ${sidebarCollapsed ? styles.mainCollapsed : ''}`}
        >
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
