import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

// Función helper para obtener Resend solo cuando se necesita
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY no está configurado, saltando envío de email")
      return NextResponse.json({
        success: true,
        message: "Email sending is not configured",
      })
    }

    const resend = getResendClient()

    const { data, error } = await resend.emails.send({
      from: "Greenpoint <onboarding@resend.dev>", // Change to your verified domain
      to: email,
      subject: "Bienvenido a Greenpoint",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido a Greenpoint</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a4d2e 0%, #2d5f3f 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">GREENPOINT</h1>
              <p style="color: #a8d5ba; margin: 10px 0 0 0; font-size: 14px;">Genéticas de cannabis premium</p>
            </div>
            
            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none;">
              <h2 style="color: #1a4d2e; margin-top: 0;">¡Bienvenido${fullName ? ", " + fullName : ""}!</h2>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Gracias por unirte a <strong>Greenpoint</strong>, tu fuente confiable de genéticas de cannabis de alta calidad.
              </p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                Estamos emocionados de tenerte con nosotros. En Greenpoint encontrarás:
              </p>
              
              <ul style="font-size: 16px; margin-bottom: 25px; padding-left: 20px;">
                <li style="margin-bottom: 10px;">6 genéticas premium cuidadosamente seleccionadas</li>
                <li style="margin-bottom: 10px;">Opciones de compra en maceta o domo</li>
                <li style="margin-bottom: 10px;">Información detallada de THC, CBD y tiempos de floración</li>
                <li style="margin-bottom: 10px;">Seguimiento de tus pedidos en tiempo real</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || "http://localhost:3000"}" 
                   style="display: inline-block; background: #1a4d2e; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Explorar Genéticas
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                Si tienes alguna pregunta, no dudes en contactarnos. ¡Feliz cultivo!
              </p>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Greenpoint. Todos los derechos reservados.</p>
              <p style="margin: 10px 0 0 0;">Este producto es para mayores de 18 años.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in send-welcome-email:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
