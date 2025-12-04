"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, ShoppingBag } from "lucide-react"
import { CartButton } from "@/components/cart-button"

interface Order {
  id: string
  created_at: string
  total_amount: number
  status: string
  order_items: {
    quantity: number
    unit_price: number
    modality: string
    genetics: {
      name: string
      image_url: string
    }
  }[]
}

export default function MyOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createBrowserClient()

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login?redirect=/my-orders")
        return
      }

      setUser(user)
      loadOrders(user.id)
    }

    checkUser()
  }, [router])

  const loadOrders = async (userId: string) => {
    const supabase = createBrowserClient()

    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        created_at,
        total_amount,
        status,
        order_items (
          quantity,
          unit_price,
          modality,
          genetics (
            name,
            image_url
          )
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error cargando pedidos:", error)
    } else {
      setOrders(data || [])
    }

    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendiente", variant: "secondary" as const },
      paid: { label: "Pagado", variant: "default" as const },
      processing: { label: "Procesando", variant: "default" as const },
      shipped: { label: "Enviado", variant: "default" as const },
      delivered: { label: "Entregado", variant: "default" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "secondary" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/auth/logout">Cerrar sesión</Link>
            </Button>
            <CartButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Mis pedidos</h1>
            <Button asChild>
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Seguir comprando
              </Link>
            </Button>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">No tienes pedidos aún</h2>
                <p className="text-muted-foreground mb-6">Empieza a comprar nuestras genéticas premium</p>
                <Button asChild>
                  <Link href="/">Explorar genéticas</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Pedido #{order.id.slice(0, 8)}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString("es-UY", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.order_items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.genetics.image_url || "/placeholder.svg"}
                              alt={item.genetics.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.genetics.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {item.modality === "pot" ? "En Maceta" : "En Domo"} • Cantidad: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${(item.unit_price * item.quantity).toLocaleString("es-UY")}
                            </p>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t flex items-center justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="text-xl font-bold">${order.total_amount.toLocaleString("es-UY")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
