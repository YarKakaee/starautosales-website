import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return response;
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) =>
					request.cookies.set(name, value)
				);
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options)
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Protect /admin routes - only require authentication, let pages handle authorization
	if (request.nextUrl.pathname.startsWith('/admin')) {
		if (!user) {
			// Redirect to login if not authenticated
			const url = request.nextUrl.clone();
			url.pathname = '/auth/login';
			url.searchParams.set('redirect', request.nextUrl.pathname);
			return NextResponse.redirect(url);
		}
		// Allow authenticated users to access /admin - pages will show unauthorized message if needed
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};

