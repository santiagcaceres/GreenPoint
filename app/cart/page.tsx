"use client"

import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { CartButton } from "@/components/cart-button"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  if (items.length === 0) {
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

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">Agrega algunas genéticas para comenzar tu pedido</p>
            <Button asChild size="lg">
              <Link href="/">Explorar genéticas</Link>
            </Button>
          </div>
        </div>
      </div>
    )
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Tu Carrito</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.geneticId}-${item.modality}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.geneticName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.geneticName}</h3>
                            <p className="text-sm text-muted-foreground capitalize">Modalidad: {item.modality}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.geneticId, item.modality)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.geneticId, item.modality, item.quantity - 1)
                                }
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.geneticId, item.modality, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">${item.unitPrice} c/u</p>
                            <p className="text-lg font-bold">
                              ${(item.unitPrice * item.quantity).toLocaleString("es-UY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Resumen del pedido</h2>

                  <div className="space-y-2 py-4 border-y">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toLocaleString("es-UY")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Envío</span>
                      <span>{getTotalPrice() >= 500 ? "Gratis" : "$50"}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(getTotalPrice() + (getTotalPrice() >= 500 ? 0 : 50)).toLocaleString("es-UY")}</span>
                  </div>

                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceder al pago</Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/">Continuar comprando</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
