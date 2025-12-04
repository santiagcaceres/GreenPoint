"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface PurchaseOptionsProps {
  prices: {
    pot: { single: number; five: number; ten: number }
    dome: { twentyFive: number; fifty: number; hundred: number }
  }
  geneticName: string
  geneticSlug: string
  geneticImage: string
  geneticId: string
}

export function PurchaseOptions({ prices, geneticName, geneticSlug, geneticImage, geneticId }: PurchaseOptionsProps) {
  const [mode, setMode] = useState<"pot" | "dome">("pot")
  const [quantity, setQuantity] = useState<string>("single")
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const getPrice = () => {
    if (mode === "pot") {
      return prices.pot[quantity as keyof typeof prices.pot]
    } else {
      return prices.dome[quantity as keyof typeof prices.dome]
    }
  }

  const getQuantityLabel = () => {
    if (mode === "pot") {
      if (quantity === "single") return "1 planta"
      if (quantity === "five") return "5 plantas"
      if (quantity === "ten") return "10 plantas"
    } else {
      if (quantity === "twentyFive") return "25 plantas"
      if (quantity === "fifty") return "50 plantas"
      if (quantity === "hundred") return "100 plantas"
    }
  }

  const getNumericQuantity = () => {
    const map: Record<string, number> = {
      single: 1,
      five: 5,
      ten: 10,
      twentyFive: 25,
      fifty: 50,
      hundred: 100,
    }
    return map[quantity] || 1
  }

  const handleAddToCart = () => {
    addItem({
      geneticId,
      geneticName,
      geneticSlug,
      modality: mode === "pot" ? "maceta" : "domo",
      quantity: getNumericQuantity(),
      unitPrice: getPrice(),
      imageUrl: geneticImage,
    })

    toast.success("Agregado al carrito", {
      description: `${geneticName} - ${getQuantityLabel()}`,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  return (
    <section className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Opciones de Compra</h2>

      {/* Mode Selection */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setMode("pot")
            setQuantity("single")
          }}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
            mode === "pot"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <div className="text-lg mb-1">En Maceta</div>
          <div className="text-sm opacity-80">Individual</div>
        </button>
        <button
          onClick={() => {
            setMode("dome")
            setQuantity("twentyFive")
          }}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
            mode === "dome"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <div className="text-lg mb-1">En Domo</div>
          <div className="text-sm opacity-80">Mínimo 25 unidades</div>
        </button>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4 mb-8">
        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cantidad</label>

        {mode === "pot" ? (
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "single", label: "1 Planta", price: prices.pot.single },
              { value: "five", label: "5 Plantas", price: prices.pot.five },
              { value: "ten", label: "10 Plantas", price: prices.pot.ten },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setQuantity(option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  quantity === option.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="font-semibold text-foreground mb-1">{option.label}</div>
                <div className="text-sm text-muted-foreground">${option.price}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "twentyFive", label: "25 Plantas", price: prices.dome.twentyFive },
              { value: "fifty", label: "50 Plantas", price: prices.dome.fifty },
              { value: "hundred", label: "100 Plantas", price: prices.dome.hundred },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setQuantity(option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  quantity === option.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="font-semibold text-foreground mb-1">{option.label}</div>
                <div className="text-sm text-muted-foreground">${option.price}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="bg-secondary/30 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Modalidad</div>
            <div className="font-semibold text-foreground">{mode === "pot" ? "En Maceta" : "En Domo"}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Cantidad</div>
            <div className="font-semibold text-foreground">{getQuantityLabel()}</div>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-foreground">Total</div>
            <div className="text-3xl font-bold text-primary">${getPrice()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-secondary text-secondary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors"
        >
          Agregar al carrito
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          Comprar ahora
        </button>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 leading-relaxed">
        Envío gratuito en pedidos superiores a $500. Entrega en 3-5 días hábiles.
      </p>
    </section>
  )
}
