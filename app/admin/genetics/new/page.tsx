"use client"

import { AdminNav } from "@/components/admin-nav"
import { GeneticForm } from "@/components/genetic-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewGeneticPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Nueva Genética</h1>
          <p className="text-muted-foreground">Agrega una nueva genética al catálogo</p>
        </div>

        <GeneticForm />
      </main>
    </div>
  )
}
