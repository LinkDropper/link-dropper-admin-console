export enum SocialPlatform {
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface User extends BaseEntity {
  email?: string;
  profileImage?: string;
  kakaoId?: string;
  googleId?: string;
  mobile?: string;
  name?: string;
  socialPlatform: SocialPlatform;
  lastLoginAt?: Date;
  isAdmin: boolean;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface OAuthCallbackRequest {
  code: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  isAdmin: boolean;
  socialPlatform: SocialPlatform;
  lastLoginAt?: Date;
}
