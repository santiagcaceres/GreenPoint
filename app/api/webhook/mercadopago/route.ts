import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Webhook de Mercado Pago recibido:", body)

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.warn("MERCADOPAGO_ACCESS_TOKEN no configurado, ignorando webhook")
      return NextResponse.json({ received: true, message: "MP not configured" })
    }

    // Mercado Pago envía notificaciones de tipo "payment"
    if (body.type === "payment") {
      const paymentId = body.data.id

      const { getPaymentInfo } = await import("@/lib/mercadopago")

      // Obtener información completa del pago
      const payment = await getPaymentInfo(paymentId)

      console.log("[v0] Información del pago:", payment)

      const orderId = payment.external_reference
      const status = payment.status

      console.log(`[v0] Orden ${orderId} actualizada a estado: ${status}`)

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
