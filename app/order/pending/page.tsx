"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Package, Loader2 } from "lucide-react"

function PendingContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-orange-500">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Clock className="h-16 w-16 text-orange-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Pago pendiente</h1>
            <p className="text-muted-foreground">Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>
          </div>

          {orderId && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Número de orden</p>
              <p className="font-mono font-bold">{orderId}</p>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/my-orders">
                <Package className="mr-2 h-4 w-4" />
                Ver mis pedidos
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">Recibirás un email cuando se confirme tu pago</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PendingContent />
    </Suspense>
  )
}
