import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { createPreference } from "@/lib/mercadopago"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    // Verificar autenticación
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { items } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 })
    }

    // Crear orden en la base de datos
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity
    }, 0)

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error("[v0] Error creando orden:", orderError)
      return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 })
    }

    // Crear items de la orden
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      genetic_id: item.geneticId,
      quantity: item.quantity,
      unit_price: item.price,
      modality: item.modality,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Error creando items de orden:", itemsError)
      return NextResponse.json({ error: "Error al crear los items de la orden" }, { status: 500 })
    }

    // Obtener información completa de las genéticas
    const geneticIds = items.map((item: any) => item.geneticId)
    const { data: genetics } = await supabase.from("genetics").select("*").in("id", geneticIds)

    // Crear preferencia de Mercado Pago
    const mpItems = items.map((item: any) => {
      const genetic = genetics?.find((g) => g.id === item.geneticId)
      return {
        id: item.geneticId,
        title: `${genetic?.name || "Planta"} - ${item.modality === "pot" ? "En Maceta" : "En Domo"}`,
        description: `${genetic?.name || "Genética"} - Cantidad: ${item.quantity}`,
        picture_url: genetic?.image_url,
        category_id: "plants",
        quantity: 1,
        unit_price: item.price * item.quantity,
      }
    })

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

    const preference = await createPreference({
      items: mpItems,
      back_urls: {
        success: `${baseUrl}/order/success?order_id=${order.id}`,
        failure: `${baseUrl}/order/failure?order_id=${order.id}`,
        pending: `${baseUrl}/order/pending?order_id=${order.id}`,
      },
      auto_return: "approved",
      external_reference: order.id,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    })

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      orderId: order.id,
    })
  } catch (error) {
    console.error("[v0] Error en checkout:", error)
    return NextResponse.json({ error: "Error al procesar el checkout" }, { status: 500 })
  }
}
