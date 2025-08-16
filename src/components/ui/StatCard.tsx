import React from 'react';
import { Icon } from './Icon';
import styles from './StatCard.module.css';

export interface StatCardData {
  label: string;
  value: number;
  growth: number;
  icon: string;
}

interface StatCardProps {
  data: StatCardData;
}

export const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const getGrowthType = () => {
    if (data.growth > 0) return 'positive';
    if (data.growth < 0) return 'negative';
    return 'neutral';
  };

  const getGrowthIcon = () => {
    const growthType = getGrowthType();
    switch (growthType) {
      case 'positive': return 'trending-up';
      case 'negative': return 'trending-down';
      default: return 'minus';
    }
  };

  const getGrowthText = () => {
    if (data.growth === 0) return '변화 없음';
    const sign = data.growth > 0 ? '+' : '';
    return `${sign}${data.growth}% 전월 대비`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statIcon}>
              <Icon name={data.icon} size={20} />
            </div>
            <h3 className={styles.statLabel}>{data.label}</h3>
          </div>
          
          <div className={styles.statValue}>
            {data.value.toLocaleString('ko-KR')}
          </div>
          
          <div className={`${styles.statGrowth} ${styles[`statGrowth${getGrowthType().charAt(0).toUpperCase() + getGrowthType().slice(1)}`]}`}>
            <Icon name={getGrowthIcon()} size={16} />
            <span>{getGrowthText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
