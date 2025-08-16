export type UserType = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  version: number;
  kakaoId?: string;
  googleId?: string;
  mobile?: string;
  isAdmin: boolean;
  socialPlatform: 'KAKAO' | 'GOOGLE';
};

export type UserResponseType = {
  user: UserType;
};
