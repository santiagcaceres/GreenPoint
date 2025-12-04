"use client"

import { AdminNav } from "@/components/admin-nav"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    {
      title: "Total Pedidos",
      value: "0",
      description: "Pedidos totales",
      icon: ShoppingCart,
    },
    {
      title: "Pedidos Pendientes",
      value: "0",
      description: "Requieren atención",
      icon: TrendingUp,
    },
    {
      title: "Ingresos Totales",
      value: "$0",
      description: "Total de ventas",
      icon: DollarSign,
    },
    {
      title: "Genéticas",
      value: "6",
      description: "Genéticas disponibles",
      icon: Package,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Bienvenido al panel de control de Greenpoint</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de Administración</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gestiona las genéticas y pedidos desde el menú de navegación superior.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
