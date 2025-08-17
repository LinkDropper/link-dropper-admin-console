import { NextRequest, NextResponse } from "next/server";

import { SESSION_TOKEN_KEY, SOCIAL_TYPES } from "@/lib/constants/common";
import { postFetch } from "@/lib/requests/customFetch";
import { KakaoAuthService } from "@/lib/services/auth/kakaoAuthService";
import getApiBaseUrl from "@/lib/utils/getApiBaseUrl";

const kakaoAuthService = new KakaoAuthService();

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectUrl = request.nextUrl.searchParams.get("state");

  if (!code) {
    throw new Error("인증 코드가 없습니다.");
  }

  try {
    const tokenData = await kakaoAuthService.getToken(code);
    const userData = await kakaoAuthService.getUserData(tokenData.access_token);

    const { accessToken }: { accessToken: string } = await postFetch({
      url: `${getApiBaseUrl()}/admin/login`,
      body: {
        socialId: userData.id,
        email: userData.kakao_account.email,
        socialPlatform: SOCIAL_TYPES.KAKAO,
      },
    });

    const response = NextResponse.redirect(
      redirectUrl || new URL("/", request.url)
    );
    response.cookies.set({
      name: SESSION_TOKEN_KEY,
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 90 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("로그인 처리 중 오류가 발생했습니다.");
  }
}
