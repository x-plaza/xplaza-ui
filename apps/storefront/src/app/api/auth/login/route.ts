import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${API_URL}/customer/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  if (data.data?.mfaRequired) {
    return NextResponse.json({ success: true, data: { mfaRequired: true } });
  }

  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === 'production';

  if (data.data?.accessToken) {
    cookieStore.set('xp-access-token', data.data.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    });
  }

  if (data.data?.refreshToken) {
    cookieStore.set('xp-refresh-token', data.data.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (data.data?.user) {
    cookieStore.set('xp-user-profile', JSON.stringify(data.data.user), {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return NextResponse.json({
    success: true,
    data: { user: data.data?.user },
  });
}
