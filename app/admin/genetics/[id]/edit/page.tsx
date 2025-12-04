"use client"

import { AdminNav } from "@/components/admin-nav"
import { GeneticForm } from "@/components/genetic-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { geneticsStore } from "@/lib/genetics-store"
import { use } from "react"

export default function EditGeneticPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [genetic, setGenetic] = useState<any>(null)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (adminSession !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      const data = geneticsStore.getById(id)
      if (!data) {
        router.push("/admin/genetics")
      } else {
        setGenetic(data)
      }
    }
  }, [router, id])

  if (!isAuthenticated || !genetic) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Editar Genética</h1>
          <p className="text-muted-foreground">Modifica la información de la genética</p>
        </div>

        <GeneticForm genetic={genetic} />
      </main>
    </div>
  )
}
