"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if user has already verified age
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("age-verified", "true")
    setIsOpen(false)
  }

  // Don't render on server or if not open
  if (!isClient || !isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-background border-2 border-primary rounded-xl shadow-2xl max-w-md w-full mx-4 p-8">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-foreground mb-4">Verificación de edad</h2>

          {/* Message */}
          <p className="text-muted-foreground text-lg mb-2 leading-relaxed">
            Este sitio contiene información sobre cannabis y es exclusivo para mayores de 18 años.
          </p>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Al continuar, confirmas que eres mayor de edad según las leyes de tu país.
          </p>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Soy mayor de 18 años
          </button>

          {/* Legal disclaimer */}
          <p className="text-xs text-muted-foreground/60 mt-6">
            Greenpoint cumple con todas las regulaciones locales e internacionales
          </p>
        </div>
      </div>
    </div>
  )
}
