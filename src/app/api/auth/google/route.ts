import { NextRequest, NextResponse } from "next/server";

import { SESSION_TOKEN_KEY, SOCIAL_TYPES } from "@/lib/constants/common";
import { postFetch } from "@/lib/requests/customFetch";
import { GoogleAuthService } from "@/lib/services/auth/googleAuthService";
import getApiBaseUrl from "@/lib/utils/getApiBaseUrl";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectUrl = request.nextUrl.searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(
      new URL("/error?message=인증_코드가_없습니다", request.url)
    );
  }

  try {
    const tokenData = await GoogleAuthService.getToken(code);
    const userData = await GoogleAuthService.getUserData(
      tokenData.access_token
    );

    const { accessToken }: { accessToken: string } = await postFetch({
      url: `${getApiBaseUrl()}/admin/login`,
      body: {
        socialId: userData.id,
        email: userData.email,
        socialPlatform: SOCIAL_TYPES.GOOGLE,
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
    return NextResponse.redirect(
      new URL("/error?message=로그인_처리_중_오류가_발생했습니다", request.url)
    );
  }
}
