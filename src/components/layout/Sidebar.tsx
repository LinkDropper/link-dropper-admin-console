'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import useAuthStore from '@/lib/store/userStore';
import styles from './Sidebar.module.css';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  permission?: string;
}

const navItems: NavItem[] = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    name: '사용자 관리',
    href: '/users',
    icon: 'users',
    permission: 'users.read',
  },
  {
    name: '링크 관리',
    href: '/links',
    icon: 'link',
    permission: 'links.read',
  },
  {
    name: '폴더 관리',
    href: '/folders',
    icon: 'folder',
    permission: 'folders.read',
  },
  {
    name: '신고 관리',
    href: '/reports',
    icon: 'shield',
    permission: 'reports.read',
  },
  {
    name: '결제 관리',
    href: '/payments',
    icon: 'credit-card',
    permission: 'payments.read',
  },
  {
    name: '운영 로그',
    href: '/logs',
    icon: 'document',
    permission: 'logs.read',
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  const checkPermission = (permission: string): boolean => {  
    if (user?.isAdmin) return true;
    
    return permission.endsWith('.read');
  };

  const allowedNavItems = navItems.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  return (
    <>
      <div
        className={`${styles.overlay} ${!sidebarCollapsed ? styles.overlayVisible : ''}`}
        onClick={toggleSidebar}
      />

      <aside
        className={`${styles.sidebar} ${!sidebarCollapsed ? styles.sidebarVisible : ''} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.header}>
          {!sidebarCollapsed && (
            <h2 className={styles.title}>메뉴</h2>
          )}
          <button
            className={`${styles.toggleButton} ${sidebarCollapsed ? styles.toggleButtonCollapsed : ''}`}
            onClick={toggleSidebar}
          >
            <Icon 
              name="chevron-left" 
              size={16} 
              className={`${styles.chevron} ${sidebarCollapsed ? styles.chevronRotated : ''}`}
            />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {allowedNavItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <li key={item.name} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${sidebarCollapsed ? styles.navLinkCollapsed : ''}`}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={`${styles.navIcon} ${!sidebarCollapsed ? styles.navIconWithText : ''}`}
                    />
                    {!sidebarCollapsed && (
                      <span className={styles.navText}>{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!sidebarCollapsed && (
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Link Dropper Admin Console
              <br />
              v1.0.0
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
