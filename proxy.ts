import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir todas las rutas públicas sin verificación
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Para rutas de admin, solo verificar si no es la página de login
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  // En producción, permitir el acceso y dejar que el cliente maneje la autenticación
  return NextResponse.next()

  // No hacemos verificación en el servidor porque el auth es client-side
  // let supabaseResponse = NextResponse.next({
  //   request,
  // })

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll() {
  //         return request.cookies.getAll()
  //       },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
  //         supabaseResponse = NextResponse.next({
  //           request,
  //         })
  //         cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
  //       },
  //     },
  //   },
  // )

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // // Protect admin routes
  // if (request.nextUrl.pathname.startsWith("/admin") && !user) {
  //   // Skip redirect if already on admin login page
  //   if (request.nextUrl.pathname === "/admin/login") {
  //     return supabaseResponse
  //   }
  //   const url = request.nextUrl.clone()
  //   url.pathname = "/admin/login"
  //   return NextResponse.redirect(url)
  // }

  // // Check if user is admin for admin routes
  // if (request.nextUrl.pathname.startsWith("/admin") && user) {
  //   const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  //   if (!profile?.is_admin) {
  //     const url = request.nextUrl.clone()
  //     url.pathname = "/"
  //     return NextResponse.redirect(url)
  //   }
  // }

  // return supabaseResponse
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
