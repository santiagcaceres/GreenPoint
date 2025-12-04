"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CreditCard } from "lucide-react"
import { CartButton } from "@/components/cart-button"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)

      const checkoutData = {
        items: items.map((item) => ({
          geneticId: item.geneticId,
          quantity: item.quantity,
          price: item.unitPrice,
          modality: item.modality,
        })),
        customerInfo: {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
        },
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al procesar el pago")
      }

      const { initPoint } = await response.json()

      // Redirigir a Mercado Pago
      window.location.href = initPoint
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const totalPrice = getTotalPrice()
  const shippingCost = totalPrice >= 500 ? 0 : 50
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-primary tracking-tight">
            Greenpoint
          </Link>
          <CartButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Finalizar compra</h1>

          {error && (
            <Card className="mb-6 border-destructive">
              <CardContent className="p-4 text-destructive">{error}</CardContent>
            </Card>
          )}

          <form onSubmit={handleCheckout}>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre completo</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dirección de envío</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" name="address" required />
                    </div>
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" name="city" required />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumen del pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={`${item.geneticId}-${item.modality}`} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.geneticName} x{item.quantity}
                          </span>
                          <span>${(item.unitPrice * item.quantity).toLocaleString("es-UY")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 py-4 border-y">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${totalPrice.toLocaleString("es-UY")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Envío</span>
                        <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${finalTotal.toLocaleString("es-UY")}</span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pagar con Mercado Pago
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Serás redirigido a Mercado Pago para completar el pago de forma segura
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
