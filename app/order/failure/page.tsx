"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, ShoppingCart, Loader2 } from "lucide-react"

function FailureContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Pago rechazado</h1>
            <p className="text-muted-foreground">
              Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
            </p>
          </div>

          {orderId && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Número de orden</p>
              <p className="font-mono font-bold">{orderId}</p>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Volver al carrito
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">Si el problema persiste, contacta con nuestro soporte</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <FailureContent />
    </Suspense>
  )
}
