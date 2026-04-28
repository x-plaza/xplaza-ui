import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('xp-refresh-token')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: { code: 'NO_REFRESH_TOKEN', message: 'No refresh token' } },
      { status: 401 }
    );
  }

  const response = await fetch(`${API_URL}/customer/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Refresh-Token': refreshToken,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Clear cookies on refresh failure
    cookieStore.delete('xp-access-token');
    cookieStore.delete('xp-refresh-token');
    cookieStore.delete('xp-user-profile');
    return NextResponse.json(data, { status: response.status });
  }

  const isProduction = process.env.NODE_ENV === 'production';

  if (data.data?.accessToken) {
    cookieStore.set('xp-access-token', data.data.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });
  }

  if (data.data?.refreshToken) {
    cookieStore.set('xp-refresh-token', data.data.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return NextResponse.json({ success: true });
}
