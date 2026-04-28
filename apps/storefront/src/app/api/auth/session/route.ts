import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('xp-user-profile')?.value;
  const hasAccessToken = cookieStore.has('xp-access-token');

  if (!hasAccessToken || !userProfile) {
    return NextResponse.json({ success: true, data: null });
  }

  try {
    const user = JSON.parse(userProfile);
    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json({ success: true, data: null });
  }
}
