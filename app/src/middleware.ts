import { type NextRequest, NextResponse } from 'next/server'
import verifyToken from './data/verify-token'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const authentication = token ? await verifyToken(token) : false
    
    if (
        (!authentication && (request.nextUrl.pathname.endsWith('/dashboard') ||
            request.nextUrl.pathname.endsWith('/user') 
        ))
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (
        authentication && (request.nextUrl.pathname.startsWith('/') ||
            request.nextUrl.pathname.startsWith('/create-account') ||
            request.nextUrl.pathname.startsWith('/recover-password')
        )
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}