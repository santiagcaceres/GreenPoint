const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

if (!MP_ACCESS_TOKEN) {
  console.warn("MERCADOPAGO_ACCESS_TOKEN no está configurado")
}

export interface MercadoPagoItem {
  id: string
  title: string
  description: string
  picture_url?: string
  category_id: string
  quantity: number
  unit_price: number
}

export interface MercadoPagoPreference {
  items: MercadoPagoItem[]
  back_urls?: {
    success?: string
    failure?: string
    pending?: string
  }
  auto_return?: "approved" | "all"
  external_reference?: string
  notification_url?: string
  metadata?: Record<string, any>
}

export async function createPreference(preference: MercadoPagoPreference) {
  if (!MP_ACCESS_TOKEN) {
    throw new Error("Mercado Pago no está configurado correctamente")
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(preference),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Error al crear preferencia de Mercado Pago: ${error}`)
  }

  return response.json()
}

export async function getPaymentInfo(paymentId: string) {
  if (!MP_ACCESS_TOKEN) {
    throw new Error("Mercado Pago no está configurado correctamente")
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error("Error al obtener información del pago")
  }

  return response.json()
}
