"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye } from "lucide-react"

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

type Order = {
  id: string
  status: string
  total: number
  created_at: string
  profiles: {
    email: string
    full_name: string | null
  } | null
  order_items: Array<{
    id: string
    quantity: number
    modality: string
    genetics: {
      name: string
      number: string
    } | null
  }>
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    const supabase = createClient()
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)

    if (error) {
      alert("Error al actualizar: " + error.message)
    } else {
      router.refresh()
    }
    setUpdatingId(null)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{order.profiles?.full_name || "Sin nombre"}</p>
                  <p className="text-xs text-muted-foreground">{order.profiles?.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {order.order_items.map((item) => (
                    <div key={item.id}>
                      {item.genetics?.name} {item.genetics?.number} ({item.modality}) x{item.quantity}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="font-semibold">${Number(order.total).toLocaleString("es-UY")}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  disabled={updatingId === order.id}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("es-UY")}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
