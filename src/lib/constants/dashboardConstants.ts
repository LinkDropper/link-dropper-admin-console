/**
 * 대시보드 차트에서 기본적으로 표시할 사용자 활동 메트릭들
 */
export const DEFAULT_VISIBLE_USER_METRICS = new Set([
  'subscribers', 
  'link-views', 
  'folder-creates', 
  'link-creates'
]);

/**
 * 대시보드 차트에서 기본적으로 표시할 링크 상태 메트릭들
 */
export const DEFAULT_VISIBLE_LINK_METRICS = new Set([
  'new-links', 
  'views', 
  'trash', 
  'deleted'
]);
