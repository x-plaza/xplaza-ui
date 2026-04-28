import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('xp-access-token');
  cookieStore.delete('xp-refresh-token');
  cookieStore.delete('xp-user-profile');

  return NextResponse.json({ success: true });
}
