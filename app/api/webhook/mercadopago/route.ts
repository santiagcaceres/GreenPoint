import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getPaymentInfo } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Webhook de Mercado Pago recibido:", body)

    // Mercado Pago envía notificaciones de tipo "payment"
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Obtener información completa del pago
      const payment = await getPaymentInfo(paymentId)

      console.log("[v0] Información del pago:", payment)

      const orderId = payment.external_reference
      const status = payment.status

      // Actualizar estado de la orden en la base de datos
      const supabase = await createServerClient()

      let orderStatus = "pending"
      if (status === "approved") {
        orderStatus = "paid"
      } else if (status === "rejected" || status === "cancelled") {
        orderStatus = "cancelled"
      }

      const { error } = await supabase
        .from("orders")
        .update({
          status: orderStatus,
          payment_id: paymentId,
        })
        .eq("id", orderId)

      if (error) {
        console.error("[v0] Error actualizando orden:", error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Error en webhook:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
