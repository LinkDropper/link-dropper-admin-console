/**
 * 차트용 랜덤 데이터를 생성합니다.
 */
export const generateRandomData = (baseValue: number, days: number = 30): number[] => {
  const data: number[] = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < days; i++) {
    const variation = (Math.random() - 0.5) * 0.2;
    currentValue = Math.max(0, currentValue * (1 + variation));
    data.push(Math.floor(currentValue));
  }
  
  return data;
};

/**
 * 차트용 날짜 라벨을 생성합니다.
 */
export const generateDateLabels = (days: number = 30): string[] => {
  const labels: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    if (i === 0) {
      labels.push('오늘');
    } else {
      labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }
  }
  
  return labels;
};
