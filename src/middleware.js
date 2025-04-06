import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/sign-up',
  '/products',
  '/categories',
  '/brands',
  '/luxe',
  '/fashion',
  '/cart',
  '/wishlist',
  '/admin',
  // Category routes
  '/lips',
  '/eyes',
  '/face',
  '/skincare',
  '/nails',
  '/fragrance',
  '/accessories',
  '/offers',
  '/fresh-in',
  // Subcategory routes
  '/lips/lipstick',
  '/lips/lip-care',
  '/eyes/eye-makeup',
  '/eyes/eye-care',
  '/face/face-makeup',
  '/face/face-care',
  '/skincare/cleansers',
  '/skincare/moisturizers',
  '/skincare/treatments',
  '/nails/nail-polish',
  '/nails/nail-care',
  '/fragrance/women',
  '/fragrance/men',
  '/accessories/makeup-tools',
  '/accessories/storage',
  '/offers/discounts',
  '/offers/deals',
  '/fresh-in/new-arrivals',
  '/fresh-in/collections'
];

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is in public routes or starts with any public route
  const isPublicRoute = PUBLIC_ROUTES.some(route => path.startsWith(route));

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value;

  // If the route is protected and there's no token, redirect to login
  if (!isPublicRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  // If there's a token and the user is trying to access login/signup, redirect to home
  if (token && (path === '/login' || path === '/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 