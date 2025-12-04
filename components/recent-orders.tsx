import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  paid: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  processing: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  shipped: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
  delivered: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
}

const statusLabels = {
  pending: "Pendiente",
  paid: "Pagado",
  processing: "Procesando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
}

export async function RecentOrders() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total,
      created_at,
      profiles:user_id (
        email,
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
        <CardDescription>Los últimos 5 pedidos realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{order.profiles?.full_name || order.profiles?.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("es-UY", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                  <p className="text-sm font-semibold">${Number(order.total).toLocaleString("es-UY")}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">No hay pedidos aún</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
