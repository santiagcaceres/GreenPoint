"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart-button"
import { User, Package, Leaf } from "lucide-react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check simple localStorage auth
    const token = localStorage.getItem("simple-auth-token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-primary tracking-tight">
          Greenpoint
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/geneticas"
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
          >
            <Leaf className="h-4 w-4" />
            Genéticas
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/my-orders">
                  <Package className="mr-2 h-4 w-4" />
                  Mis pedidos
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent"
                onClick={() => {
                  localStorage.removeItem("simple-auth-token")
                  setIsLoggedIn(false)
                }}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" className="bg-transparent">
              <Link href="/auth/login">
                <User className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Link>
            </Button>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  )
}
