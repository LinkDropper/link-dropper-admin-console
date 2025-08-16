// Common types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User extends BaseEntity {
  email?: string;
  name?: string;
  profileImage?: string;
  kakaoId?: string;
  googleId?: string;
  mobile?: string;
  socialPlatform: 'KAKAO' | 'GOOGLE';
  lastLoginAt?: string;
  isAdmin: boolean;
}

export interface UserFilters {
  search: string;
  status: string;
  role: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Link types
export interface Link extends BaseEntity {
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  status: 'active' | 'blocked';
  reportCount: number;
  owner: {
    id: string;
    nickname: string;
  };
  folder?: {
    id: string;
    name: string;
  };
}

export interface LinkFilters {
  search: string;
  status: string;
  hasReports: boolean;
  ownerId: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Folder types
export interface Folder extends BaseEntity {
  name: string;
  description?: string;
  isPublic: boolean;
  status: 'active' | 'deleted';
  linkCount: number;
  owner: {
    id: string;
    nickname: string;
  };
}

export interface FolderFilters {
  search: string;
  status: string;
  isPublic: boolean;
  ownerId: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Report types
export interface Report extends BaseEntity {
  type: 'link' | 'folder' | 'user';
  reason: string;
  description?: string;
  status: 'pending' | 'processed' | 'dismissed';
  reporter: {
    id: string;
    nickname: string;
  };
  target: {
    id: string;
    type: 'link' | 'folder' | 'user';
    title?: string;
  };
  processedBy?: {
    id: string;
    name: string;
  };
  processedAt?: string;
  action?: 'warning' | 'block' | 'delete' | 'suspend';
}

export interface ReportFilters {
  status: string;
  type: string;
  reason: string;
  reporterId: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Payment types
export interface Payment extends BaseEntity {
  user: {
    id: string;
    nickname: string;
    email: string;
  };
  product: string;
  amount: number;
  currency: string;
  method: 'card' | 'bank' | 'paypal';
  status: 'completed' | 'failed' | 'refunded' | 'pending';
  transactionId: string;
  refundedAt?: string;
  refundReason?: string;
}

export interface PaymentFilters {
  userId: string;
  status: string;
  method: string;
  amountRange: {
    min: number;
    max: number;
  };
  dateRange: {
    from: string;
    to: string;
  };
}

// Log types
export interface ActivityLog extends BaseEntity {
  action: string;
  targetType: 'user' | 'link' | 'folder' | 'report' | 'payment';
  targetId: string;
  details: Record<string, any>;
  admin: {
    id: string;
    name: string;
  };
  ipAddress: string;
}

export interface LogFilters {
  action: string;
  targetType: string;
  adminId: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Dashboard types
export interface DashboardStats {
  users: {
    total: number;
    active: number;
    new: number;
    growth: number;
  };
  links: {
    total: number;
    new: number;
    growth: number;
  };
  folders: {
    total: number;
    new: number;
    growth: number;
  };
  revenue: {
    daily: number;
    monthly: number;
    growth: number;
  };
  reports: {
    pending: number;
    total: number;
    growth: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

// Auth types  
export interface AdminUser extends User {
  role: 'admin' | 'manager';
  permissions?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export interface OAuthCallbackRequest {
  code: string;
}

// API types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
