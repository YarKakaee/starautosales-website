import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const redirectTo = requestUrl.searchParams.get('redirect') || '/admin';

	if (code) {
		const supabase = await createClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	// Use environment variable for production, fallback to request URL for development
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin;
	const redirectUrl = new URL(redirectTo, siteUrl);

	return NextResponse.redirect(redirectUrl);
}
