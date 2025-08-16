'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface LineChartDataset {
  id: string;
  label: string;
  data: number[];
  color: string;
  visible: boolean;
}

export interface LineChartProps {
  title: string;
  description: string;
  datasets: LineChartDataset[];
  labels: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  enableZoom?: boolean;
  onDatasetToggle?: (datasetId: string) => void;
}

export default function LineChart({
  title,
  description,
  datasets,
  labels,
  height = 300,
  showGrid = true,
  showLegend = false,
  onDatasetToggle,
}: LineChartProps) {
  const chartData = {
    labels,
    datasets: datasets
      .filter(dataset => dataset.visible)
      .map(dataset => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: dataset.color,
        backgroundColor: dataset.color + '1A',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: dataset.color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: showGrid,
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: showGrid,
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return value.toLocaleString('ko-KR');
          }
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    hover: {
      animationDuration: 200,
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
