'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import useAuthStore from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';

import styles from './TopNavigation.module.css';

export const TopNavigation: React.FC = () => {
  const { toggleSidebar, notifications } = useUIStore();
  const { user, setAuth } = useAuthStore();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    setAuth(false, null);
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
        >
          <Icon name="menu" size={20} />
        </button>

        <Link href="/dashboard" className={styles.logo}>
          <Image src="/link_dropper-favicon.png" alt="Link Dropper" width={20} height={20} />

          <span className={styles.logoText}>
            Link Dropper Admin
          </span>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <div style={{ position: 'relative' }}>
          <button
            className={styles.notificationButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Icon name="bell" size={20} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '320px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              marginTop: 'var(--spacing-2)'
            }}>
              <div style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontWeight: '600', margin: 0 }}>알림</h3>
              </div>
              {notifications.length === 0 ? (
                <div style={{ 
                  padding: 'var(--spacing-4)', 
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  새로운 알림이 없습니다
                </div>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      style={{
                        padding: 'var(--spacing-4)',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: 'var(--spacing-1)'
                      }}>
                        <span style={{ fontWeight: '500' }}>
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-color)'
                          }} />
                        )}
                      </div>
                      <p style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        color: 'var(--text-secondary)',
                        margin: '0 0 var(--spacing-2) 0'
                      }}>
                        {notification.message}
                      </p>
                      <span style={{ 
                        fontSize: 'var(--font-size-xs)', 
                        color: 'var(--text-muted)'
                      }}>
                        {new Date(notification.timestamp).toLocaleString('ko-KR')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.avatar}>
              {user?.profileImage ? (
                <Image 
                  src={user.profileImage} 
                  alt={user.name || '사용자'} 
                  width={32}
                  height={32}
                  className={styles.avatarImage}
                />
              ) : (
                <span>
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              )}
            </div>
          </button>
          
          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '224px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              marginTop: 'var(--spacing-2)'
            }}>
              <div style={{ 
                padding: 'var(--spacing-4)', 
                borderBottom: '1px solid var(--border-color)' 
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
                  <p style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    fontWeight: '500', 
                    margin: 0 
                  }}>
                    {user?.name || '관리자'}
                  </p>
                  <p style={{ 
                    fontSize: 'var(--font-size-xs)', 
                    color: 'var(--text-muted)', 
                    margin: 0 
                  }}>
                    {user?.email}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-1)' }}>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      backgroundColor: user?.isAdmin ? 'var(--primary-50)' : 'var(--gray-100)',
                      color: user?.isAdmin ? 'var(--primary-color)' : 'var(--text-secondary)',
                      borderRadius: 'var(--border-radius)',
                      display: 'inline-block',
                      width: 'fit-content'
                    }}>
                      {user?.isAdmin ? '관리자' : '매니저'}
                    </span>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      backgroundColor: user?.socialPlatform === 'KAKAO' ? '#fee500' : '#4285f4',
                      color: user?.socialPlatform === 'KAKAO' ? '#000' : '#fff',
                      borderRadius: 'var(--border-radius)',
                      display: 'inline-block',
                      width: 'fit-content'
                    }}>
                      {user?.socialPlatform === 'KAKAO' ? '카카오' : '구글'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: 'var(--spacing-2)' }}>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    padding: 'var(--spacing-2)',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name="user" size={16} />
                  <span>프로필</span>
                </Link>
                
                <Link
                  href="/settings"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    padding: 'var(--spacing-2)',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name="settings" size={16} />
                  <span>설정</span>
                </Link>
                
                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: 'var(--spacing-2) 0' }} />
                
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    width: '100%',
                    padding: 'var(--spacing-2)',
                    borderRadius: 'var(--border-radius)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger-color)',
                    fontSize: 'var(--font-size-sm)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name="logout" size={16} />
                  <span>로그아웃</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
