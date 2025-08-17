'use client';

import React from 'react';
import LineChart, { LineChartDataset } from './LineChart';
import {Icon} from './Icon';
import styles from './ChartCard.module.css';

export interface ChartMetric {
  id: string;
  label: string;
  value: number;
  growth: number;
  color: string;
}

export interface ChartCardProps {
  title: string;
  description: string;
  metrics: ChartMetric[];
  chartData: number[][];
  chartLabels: string[];
  visibleMetrics: Set<string>;
  onMetricToggle: (metricId: string) => void;
}

export default function ChartCard({
  title,
  description,
  metrics,
  chartData,
  chartLabels,
  visibleMetrics,
  onMetricToggle,
}: ChartCardProps) {
  const datasets: LineChartDataset[] = metrics.map((metric, index) => ({
    id: metric.id,
    label: metric.label,
    data: chartData[index] || [],
    color: metric.color,
    visible: visibleMetrics.has(metric.id),
  }));

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.chartDescription}>{description}</p>
        
        <div className={styles.chartContainer}>
          <div className={styles.chartArea}>
            <LineChart
              datasets={datasets}
              labels={chartLabels}
              height={320}
              showGrid={true}
              showLegend={false}
            />
          </div>
          
          <div className={styles.chartMenu}>
            {metrics.map((metric) => {
              const isVisible = visibleMetrics.has(metric.id);
              return (
                <button
                  key={metric.id}
                  className={`${styles.chartMenuItem} ${
                    isVisible ? styles.chartMenuItemActive : styles.chartMenuItemInactive
                  }`}
                  onClick={() => onMetricToggle(metric.id)}
                  style={{
                    borderColor: isVisible ? metric.color : 'transparent',
                  }}
                >
                  <div className={styles.chartMenuItemHeader}>
                    <div
                      className={styles.chartMenuItemDot}
                      style={{ 
                        backgroundColor: metric.color,
                        opacity: isVisible ? 1 : 0.5 
                      }}
                    />
                    <span className={styles.chartMenuItemLabel}>{metric.label}</span>
                  </div>
                  <div className={styles.chartMenuItemValue}>
                    {metric.value.toLocaleString('ko-KR')}
                  </div>
                  <div className={styles.chartMenuItemGrowth}>
                    <Icon 
                      name={metric.growth > 0 ? 'trending-up' : metric.growth < 0 ? 'trending-down' : 'minus'} 
                      size={10} 
                    />
                    <span>
                      {metric.growth === 0 ? '0' : Math.abs(metric.growth)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
